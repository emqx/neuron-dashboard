import { queryNodeConfig, queryPluginConfigInfo, submitNodeConfig } from '@/api/config'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import { ParamInfo, PluginInfo } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { computed, onBeforeMount, ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetPluginMsgIdMap } from './usePlugin'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'

interface Field {
  key: string
  info: ParamInfo
}

type Props = Readonly<{
  direction: DriverDirection
}>

export default (props: Props) => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const { initMap, getNodeMsgById } = useNodeMsgMap(props.direction, false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const configForm: Ref<Record<string, any>> = ref({})
  const fieldList: Ref<Array<Field>> = ref([])
  const isLoading = ref(false)
  const formCom = ref()
  const isSubmitting = ref(false)

  const nodeID = computed(() => Number(route.params.nodeID))

  const nodeName = computed(() => getNodeMsgById(nodeID.value)?.name)

  const getNodeConfig = async () => {
    const { data } = await queryNodeConfig(nodeID.value)
  }

  const initFormFromPluginInfo = (info: PluginInfo) => {
    return info.params.reduce((obj, currentKey) => {
      obj[currentKey] = info[currentKey].default
      return obj
    }, {} as Record<string, any>)
  }

  const createFieldListFormPluginInfo = (info: PluginInfo) => {
    const { params, tag_type, ...fields } = info
    return Object.keys(fields).map((key) => {
      return {
        key,
        info: fields[key],
      }
    })
  }

  const getPluginInfo = async () => {
    const { data } = await queryPluginConfigInfo()
    const pluginInfo: PluginInfo = data[pluginMsgIdMap[getNodeMsgById(nodeID.value).plugin_id].name]
    if (!pluginInfo) {
      return
    }
    configForm.value = initFormFromPluginInfo(pluginInfo)
    fieldList.value = createFieldListFormPluginInfo(pluginInfo)
  }

  const cancel = () => {
    router.back()
  }

  const submit = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await submitNodeConfig(nodeID.value, configForm.value)
      EmqxMessage.success(t('common.submitSuccess'))
      router.back()
    } catch (error) {
      //
    } finally {
      isSubmitting.value = false
    }
  }

  onBeforeMount(async () => {
    isLoading.value = true
    await Promise.all([initMap(), initMsgIdMap()])
    getPluginInfo()
    isLoading.value = false
  })

  return {
    nodeName,
    configForm,
    fieldList,
    isLoading,
    formCom,
    isSubmitting,

    submit,
    cancel,
  }
}
