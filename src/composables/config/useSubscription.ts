import { addSubscription, deleteSubscription, queryGroupList, querySubscription } from '@/api/config'
import type { GroupData, SubscriptionData, SubscriptionDataForm } from '@/types/config'
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
  const nodePlugin = computed(() => route.params.plugin.toString())

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

  const isShowTopic = computed(() => {
    const lowerCasePlugin = nodePlugin.value.toLocaleLowerCase()
    const ignorePlugin = ['ekuiper', 'websocket', 'sparkplugb']
    const noShowTopic = ignorePlugin.includes(lowerCasePlugin)
    return !noShowTopic
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
    isShowTopic,

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
      topic: [{ required: true, message: createCommonErrorMessage('input', t('config.topic')) }],
      productKey: [
        { required: true, message: createCommonErrorMessage('input', t('config.productKey')) },
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
  const changeGroup = (val: string) => {
    const nodeName = props.currentNode
    const groupName = val
    const driverName = subscriptionForm.value.driver
    subscriptionForm.value.topic = val && nodeName ? `/neuron/${nodeName}/${driverName}/${groupName}` : ''
  }
  const initForm = async () => {
    subscriptionForm.value = createRawSubscriptionForm()
    await nextTick()
    formCom.value.$refs.form.clearValidate()
  }

  const { isMQTTPugin, isGewuPugin } = useDriverInfo()

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      const { topic, ...baseSubscriptionForm } = subscriptionForm.value
      let data: SubscriptionData = { ...baseSubscriptionForm, app: props.currentNode }

      if (isMQTTPugin.value && topic) {
        data = {
          ...data,
          params: {
            topic,
          },
        }
      }

      if (!isGewuPugin.value) {
        data.productKey = undefined
      }

      await addSubscription(data)
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
    changeGroup,
    submitData,
  }
}
