import { addSubscription, queryGroupList, querySubscription } from '@/api/config'
import { GroupData, SubscriptionData, SubscriptionDataForm } from '@/types/config'
import { ref, computed, Ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useSouthDriver from './useSouthDriver'
import { EmqxMessage } from '@emqx/emqx-ui'
import { createCommonErrorMessage } from '@/utils/utils'

export const useSubscriptionList = () => {
  const route = useRoute()

  const subscriptionList = ref([])
  const nodeID = computed(() => parseInt(route.params.nodeID as string))

  const getSubscriptionList = async () => {
    const { data } = await querySubscription(nodeID.value)
  }

  getSubscriptionList()

  return {
    subscriptionList,
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
