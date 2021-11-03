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
  const nodeID = computed(() => parseInt(route.params.nodeID as string))

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
    const list = await querySubscription(nodeID.value)
    subscriptionList.value = list.map((item) => {
      return Object.assign(item, { checked: false })
    })
    isListLoading.value = false
  }

  const getGroupDataExpectChecked = ({ checked, ...groupData }: SubscriptionDataInTable) => groupData

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
      //
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
    nodeID,
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
  currentNodeId: number
}>

export const useAddSubscription = (props: AddSubscriptionProps) => {
  const { t } = useI18n()

  const createRawSubscriptionForm = (): SubscriptionDataForm => ({
    dst_node_id: null,
    src_node_id: null,
    name: '',
  })

  const formCom = ref()
  const rules = {
    src_node_id: [{ required: true, message: t('config.southDeviceRequired') }],
    name: [{ required: true, message: createCommonErrorMessage('select', ' group') }],
  }
  const subscriptionForm: Ref<SubscriptionDataForm> = ref(createRawSubscriptionForm())
  const isSubmitting = ref(false)
  const { southDriverList: deviceList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  const selectedNodeChanged = async () => {
    subscriptionForm.value.name = ''
    const data = await queryGroupList(Number(subscriptionForm.value.src_node_id))
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
      const data = { ...subscriptionForm.value, dst_node_id: props.currentNodeId }
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
