import { queryNodeConfig, queryPluginConfigInfo, submitNodeConfig } from '@/api/config'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import { ParamInfo, PluginInfo } from '@/types/config'
import { DriverDirection, TypeOfPluginParam } from '@/types/enums'
import { computed, onMounted, ref, Ref } from 'vue'
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
  const configuredData: Ref<undefined | Record<string, any>> = ref(undefined)
  const fieldList: Ref<Array<Field>> = ref([])
  const isLoading = ref(false)
  const formCom = ref()
  const isSubmitting = ref(false)

  const node = computed(() => route.params.node.toString())

  const nodeName = computed(() => getNodeMsgById(node.value)?.name)

  const getNodeConfig = async () => {
    try {
      const { data } = await queryNodeConfig(node.value)
      if (data && data?.params && typeof data.params === 'object') {
        configuredData.value = data.params
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const createInitValue = (param: ParamInfo) => {
    if (param.default !== undefined) {
      return param.default
    }
    const initValueMap = {
      [TypeOfPluginParam.Int]: null,
      [TypeOfPluginParam.String]: '',
      [TypeOfPluginParam.Boolean]: null,
      [TypeOfPluginParam.Enum]: '',
      [TypeOfPluginParam.Map]: '',
      [TypeOfPluginParam.File]: '',
    }
    return initValueMap[param.type as TypeOfPluginParam] || ''
  }

  const initFormFromPluginInfo = (info: PluginInfo) => {
    // TODO: delete params after api changed
    const { tag_type, params, ...fields } = info
    const keys = Object.keys(fields)
    return keys.reduce((obj, currentKey) => {
      obj[currentKey] = createInitValue(info[currentKey])
      return obj
    }, {} as Record<string, any>)
  }

  const createFieldListFormPluginInfo = (info: PluginInfo) => {
    // TODO: delete params after api changed
    const { params, tag_type, ...fields } = info
    return Object.keys(fields).map((key) => {
      return {
        key,
        info: fields[key],
      }
    })
  }

  const getPluginInfo = async () => {
    const { data } = await queryPluginConfigInfo(pluginMsgIdMap[getNodeMsgById(node.value).plugin_id].name)
    const pluginInfo: PluginInfo = data
    if (!pluginInfo) {
      return
    }
    configForm.value = initFormFromPluginInfo(pluginInfo)
    fieldList.value = createFieldListFormPluginInfo(pluginInfo)
  }

  const keysToString = (obj: Record<string, any> | undefined) => {
    return Object.keys(obj ?? {})
      .sort()
      .join(',')
  }

  const fillOutTheFormFromConfiguredData = () => {
    const configFormKeysString = keysToString(configForm.value)
    const configuredDataKeyString = keysToString(configuredData.value)
    if (configuredData.value && configFormKeysString === configuredDataKeyString) {
      configForm.value = { ...configuredData.value }
    }
  }

  const shouldFieldShow = (fieldData: Field) => {
    if (!fieldData.info.condition) {
      return true
    }
    const { field, value } = fieldData.info.condition
    return configForm.value[field] === value
  }

  const cancel = () => {
    router.back()
  }

  const submit = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await submitNodeConfig(node.value, configForm.value)
      EmqxMessage.success(t('common.submitSuccess'))
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }

  onMounted(async () => {
    isLoading.value = true
    await Promise.all([initMap(), initMsgIdMap()])
    await Promise.all([getPluginInfo(), getNodeConfig()])
    fillOutTheFormFromConfiguredData()
    isLoading.value = false
  })

  return {
    nodeName,
    configForm,
    fieldList,
    isLoading,
    formCom,
    isSubmitting,
    shouldFieldShow,
    submit,
    cancel,
  }
}
