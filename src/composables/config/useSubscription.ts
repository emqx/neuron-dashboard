import { addSubscription, deleteSubscription, queryGroupList, querySubscription } from '@/api/config'
import { GroupData, SubscriptionData, SubscriptionDataForm } from '@/types/config'
import { ref, computed, Ref, nextTick } from 'vue'
import { EmqxMessageBox } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useSouthDriver from './useSouthDriver'
import { EmqxMessage } from '@emqx/emqx-ui'
import { createCommonErrorMessage } from '@/utils/utils'

interface SubscriptionDataInTable extends SubscriptionData {
  checked: boolean
}

export const useSubscriptionList = () => {
  const route = useRoute()
  const { t } = useI18n()

  const isListLoading = ref(false)
  const subscriptionList: Ref<Array<SubscriptionDataInTable>> = ref([])
  const node = computed(() => route.params.node.toString())

  const allChecked = computed({
    get() {
      if (subscriptionList.value.length === 0) {
        return false
      }
      return subscriptionList.value.every(({ checked }) => checked)
    },
    set(val: boolean) {
      subscriptionList.value.forEach((item) => {
        item.checked = val
      })
    },
  })

  const getSubscriptionList = async () => {
    isListLoading.value = true
    const list = await querySubscription(node.value)
    subscriptionList.value = list.map((item) => {
      return Object.assign(item, { checked: false })
    })
    isListLoading.value = false
  }

  const getGroupDataExpectChecked = ({ checked, ...groupData }: SubscriptionDataInTable) => {
    return { ...groupData, node }
  }

  const unsubscribe = async (confirmText: string, data: SubscriptionDataInTable | Array<SubscriptionDataInTable>) => {
    try {
      await EmqxMessageBox.confirm(confirmText, t('common.operateConfirm'))
      if (Array.isArray(data)) {
        await Promise.all(data.map((groupItem) => deleteSubscription(getGroupDataExpectChecked(groupItem))))
      } else {
        await deleteSubscription(getGroupDataExpectChecked(data))
      }
      EmqxMessage.success(t('common.operateSuccessfully'))
      getSubscriptionList()
    } catch (error) {
      console.error(error)
    }
  }

  const unsubscribeGroup = async (group: SubscriptionDataInTable) =>
    unsubscribe(t('config.unsubscribeGroupConfirm'), group)

  const clearSubscription = () => unsubscribe(t('config.clearSubscriptionConfirm'), subscriptionList.value)

  const unsubscribeInBulk = () =>
    unsubscribe(
      t('config.unsubscribeInBulkConfirm'),
      subscriptionList.value.filter((item) => item.checked),
    )

  getSubscriptionList()

  return {
    node,
    subscriptionList,
    isListLoading,
    allChecked,

    getSubscriptionList,
    unsubscribeGroup,
    clearSubscription,
    unsubscribeInBulk,
  }
}

type AddSubscriptionProps = Readonly<{
  modelValue: boolean
  currentNode: string
}>

export const useAddSubscription = (props: AddSubscriptionProps) => {
  const { t } = useI18n()

  const createRawSubscriptionForm = (): SubscriptionDataForm => ({
    app: null,
    driver: null,
    group: '',
  })

  const formCom = ref()
  const rules = {
    driver: [{ required: true, message: t('config.southDeviceRequired') }],
    name: [{ required: true, message: createCommonErrorMessage('select', ' group') }],
  }
  const subscriptionForm: Ref<SubscriptionDataForm> = ref(createRawSubscriptionForm())
  const isSubmitting = ref(false)
  const { totalSouthDriverList: deviceList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  const selectedNodeChanged = async () => {
    subscriptionForm.value.group = ''
    const data = await queryGroupList(subscriptionForm.value.driver as string)
    groupList.value = data
  }

  const initForm = async () => {
    subscriptionForm.value = createRawSubscriptionForm()
    await nextTick()
    formCom.value.$refs.form.clearValidate()
  }

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      const data = { ...subscriptionForm.value, app: props.currentNode }
      await addSubscription(data as SubscriptionData)
      EmqxMessage.success(t('common.submitSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    formCom,
    rules,
    subscriptionForm,
    deviceList,
    groupList,
    isSubmitting,

    initForm,
    selectedNodeChanged,
    submitData,
  }
}
