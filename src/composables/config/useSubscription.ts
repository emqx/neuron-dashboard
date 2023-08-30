import { addSubscription, addSubscriptions, deleteSubscription, queryGroupList, querySubscription } from '@/api/config'
import type { GroupData, SubscriptionData, SubscriptionsData, SubscriptionDataForm } from '@/types/config'
import type { Ref } from 'vue'
import { ref, computed, nextTick } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useSouthDriver from './useSouthDriver'
import { createCommonErrorMessage, OmitArrayFields } from '@/utils/utils'
import { EN_NUMBER_REGEX } from '@/utils/regexps'
import { useDriverInfo } from '@/composables/config/useDriver'

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
      await MessageBoxConfirm(confirmText)

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
  const { isMQTTPugin, isGewuPugin, isSupportBatchSub } = useDriverInfo()

  const createRawSubscriptionForm = (): SubscriptionDataForm => ({
    app: null,
    driver: '',
    group: '',
    driverGroups: {},
    topic: '',
    productKey: '',
  })

  const formCom = ref()

  const topicWarning = computed(() => {
    let warningContent = ''
    const { topic } = subscriptionForm.value
    if (topic) {
      const isContainWildcard = topic.includes('#') || topic.includes('+')
      warningContent = isContainWildcard ? t('config.topicContainWildcard') : ''
    }
    return warningContent
  })

  const checkDriverGroups = async (rule: unknown, value: string, callback: any) => {
    const keys = Object.keys(value)
    const values = Object.values(value)
    const isAllEmpty = values.every((val) => !val?.length)

    if (!keys.length || isAllEmpty) {
      callback(new Error(t('config.subscribeSouthDriverDataRequired')))
    } else {
      callback()
    }
  }

  const checkProductKey = async (rule: unknown, value: string, callback: any) => {
    if (!EN_NUMBER_REGEX.test(value)) {
      callback(new Error(t('config.enNumberFormatError')))
    } else if (value.length > 16) {
      callback(new Error(t('config.enNumberLengthError', { max: 16 })))
    } else {
      callback()
    }
  }
  const rules = computed(() => {
    return {
      driver: [{ required: true, message: t('config.southDeviceRequired') }],
      group: [{ required: true, message: createCommonErrorMessage('select', t('config.group')) }],
      driverGroups: [
        { required: true, message: createCommonErrorMessage('select', t('config.subscribeSouthDriverData')) },
        { validator: checkDriverGroups, trigger: ['blur'] },
      ],
      topic: [{ required: true, message: createCommonErrorMessage('input', t('config.topic')) }],
      productKey: [
        { required: true, message: createCommonErrorMessage('input', ' productKey') },
        { validator: checkProductKey, trigger: ['blur'] },
      ],
    }
  })

  const subscriptionForm: Ref<SubscriptionDataForm> = ref(createRawSubscriptionForm())
  const isSubmitting = ref(false)
  const { totalSouthDriverList: deviceList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  const selectedNodeChanged = async () => {
    subscriptionForm.value.group = ''
    subscriptionForm.value.topic = ''
    const data = await queryGroupList(subscriptionForm.value.driver as string)
    groupList.value = data
  }

  const setDefaultTopic = () => {
    const nodeName = props.currentNode
    subscriptionForm.value.topic = `/neuron/${nodeName}`
  }

  const initForm = async () => {
    subscriptionForm.value = createRawSubscriptionForm()
    await nextTick()
    formCom.value.$refs.form.clearValidate()

    if (isMQTTPugin.value) {
      setDefaultTopic()
    }
  }

  // MQTT | Gewu | ekuiper | websocket | sparkplugb
  const batchAddSubscriptions = async () => {
    try {
      const data: SubscriptionsData = {
        app: props.currentNode,
        groups: [],
      }

      const { driverGroups = {}, topic, productKey } = subscriptionForm.value
      const nodeGroups = Object.entries(driverGroups)
      nodeGroups.forEach(([key, value]) => {
        const driver = key
        const groupLen = value.length
        if (groupLen) {
          value.forEach((group) => {
            let item: Omit<SubscriptionData, 'app'> = {
              driver,
              group,
            }
            if (isMQTTPugin.value) {
              item = { ...item, params: { topic } }
            }
            if (isGewuPugin.value) {
              item = { ...item, params: { productKey } }
            }

            data.groups.push(item)
          })
        }
      })

      await addSubscriptions(data)
      return Promise.resolve()
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true

      const { driver, group } = subscriptionForm.value
      const data: SubscriptionData = { app: props.currentNode, driver, group }

      if (isSupportBatchSub.value) {
        await batchAddSubscriptions()
      } else {
        await addSubscription(data)
      }

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
    topicWarning,
    subscriptionForm,
    deviceList,
    groupList,
    isSubmitting,

    initForm,
    selectedNodeChanged,
    submitData,
  }
}
