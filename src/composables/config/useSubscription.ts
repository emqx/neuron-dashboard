import { addSubscription, deleteSubscription, queryGroupList, querySubscription } from '@/api/config'
import type { GroupData, SubscriptionData, SubscriptionDataForm, RawDriverData } from '@/types/config'
import type { Ref } from 'vue'
import { ref, computed, nextTick } from 'vue'
import { EmqxMessageBox, EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useSouthDriver from './useSouthDriver'
import { createCommonErrorMessage, OmitArrayFields } from '@/utils/utils'

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

  const subCheckedList = computed(() => {
    const checkedList: Array<SubscriptionDataInTable> = subscriptionList.value.filter((item) => item.checked)
    const newCheckedList: Array<SubscriptionData> = OmitArrayFields(checkedList, ['checked'])
    return newCheckedList
  })

  const getSubscriptionList = async () => {
    isListLoading.value = true
    const list = await querySubscription(node.value)
    subscriptionList.value = list.map((item) => {
      return Object.assign(item, { checked: false })
    })
    isListLoading.value = false
  }

  const unsubscribe = async (confirmText: string, data: SubscriptionData | Array<SubscriptionData>) => {
    try {
      await EmqxMessageBox.confirm(confirmText, t('common.operateConfirm'), {
        confirmButtonText: t('common.confirmButtonText'),
        cancelButtonText: t('common.cancelButtonText'),
      })
      if (Array.isArray(data)) {
        const requestList = data.map((groupItem: SubscriptionData) => deleteSubscription(groupItem))
        await Promise.all(requestList)
      } else {
        await deleteSubscription(data)
      }
      EmqxMessage.success(t('common.operateSuccessfully'))
      getSubscriptionList()
    } catch (error) {
      console.error(error)
    }
  }

  const unsubscribeGroup = async (group: SubscriptionDataInTable) =>
    unsubscribe(t('config.unsubscribeGroupConfirm'), OmitArrayFields([group], ['checked']))

  const clearSubscription = () =>
    unsubscribe(t('config.clearSubscriptionConfirm'), OmitArrayFields(subscriptionList.value, ['checked']))

  const batchUnsubscribeGroups = () => unsubscribe(t('config.unsubscribeInBulkConfirm'), subCheckedList.value)

  getSubscriptionList()

  return {
    node,
    subscriptionList,
    subCheckedList,
    isListLoading,
    allChecked,

    getSubscriptionList,
    unsubscribeGroup,
    clearSubscription,
    batchUnsubscribeGroups,
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
    driver: '',
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

  const filterSouthNodesByKeyword = (keyword: string, cb: any) => {
    const list = deviceList.value
    const res = keyword ? list.filter((node: RawDriverData) => node.name.includes(keyword)) : list
    cb(res)
  }

  const autoSelectedNodeChanged = async (node: RawDriverData) => {
    if (node?.name) {
      // selected device
      try {
        const { name } = node
        subscriptionForm.value.driver = name
        subscriptionForm.value.group = ''
        groupList.value = await queryGroupList(subscriptionForm.value.driver as string)
      } catch (error) {
        groupList.value = []
      }
    } else {
      // enter node name or clear
      subscriptionForm.value.group = ''
      groupList.value = []
    }
  }
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
    filterSouthNodesByKeyword,
    groupList,
    isSubmitting,

    initForm,
    selectedNodeChanged,
    autoSelectedNodeChanged,
    submitData,
  }
}
