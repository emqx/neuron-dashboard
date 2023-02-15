import { queryNodeConfig, queryPluginConfigInfo, submitNodeConfig } from '@/api/config'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import type { ParamInfo, PluginInfo } from '@/types/config'
import type { DriverDirection } from '@/types/enums'
import { TypeOfPluginParam } from '@/types/enums'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetPluginMsgIdMap } from './usePlugin'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'

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
  const defaultConfigData: Ref<Record<string, any>> = ref({})
  const configuredData: Ref<Record<string, any>> = ref({})
  const fieldList: Ref<Array<Field>> = ref([])
  const isLoading = ref(false)
  const formCom = ref()
  const isSubmitting = ref(false)

  const node = computed(() => route.params.node.toString())

  // get node config
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

  // init the plugin default data field value
  const createInitValue = (param: ParamInfo) => {
    const defaultValue = param.default
    if (defaultValue !== undefined) {
      let newDefaultValue = defaultValue
      const nodeNameReg = /\$\{node-name\}/
      const clientIdReg = /\{client-id\}/
      /**
       * if the default value contains ${node-name},
       * change the default value of ${node-name} to curent node name
       *  */
      if (typeof defaultValue === 'string') {
        if (nodeNameReg.test(defaultValue)) {
          newDefaultValue = defaultValue.replace(nodeNameReg, node.value)
        } else if (clientIdReg.test(defaultValue)) {
          newDefaultValue = defaultValue.replace(clientIdReg, node.value)
        }
      }
      return newDefaultValue
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

  // init plugin default data
  const initFormFromPluginInfo = (info: PluginInfo) => {
    // TODO: delete params after api changed
    const { tag_type, params, ...fields } = info
    const keys = Object.keys(fields)
    return keys.reduce((obj, currentKey) => {
      obj[currentKey] = createInitValue(info[currentKey])
      return obj
    }, {} as Record<string, any>)
  }

  // render form data: format plugin default data
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

  // get plugin default data
  const getPluginInfo = async () => {
    const nodeInfo = getNodeMsgById(node.value)
    const { plugin: pluginName } = nodeInfo
    const nodePluginToLower = pluginName.toLocaleLowerCase()

    const schemName = pluginMsgIdMap[pluginName]?.schema || nodePluginToLower
    const { data } = await queryPluginConfigInfo(schemName)
    const pluginInfo: PluginInfo = data
    if (!pluginInfo) {
      defaultConfigData.value = {}
      fieldList.value = []
      return
    }
    const pluginInitInfo = initFormFromPluginInfo(pluginInfo)
    defaultConfigData.value = cloneDeep(pluginInitInfo)
    fieldList.value = createFieldListFormPluginInfo(pluginInfo)
  }

  // init data
  const initData = () => {
    const defaultConfigDatakeys = Object.keys(defaultConfigData.value) // according fieldList value
    const defaultConfigDataL = defaultConfigDatakeys.length

    if (!defaultConfigDataL) {
      configForm.value = { ...defaultConfigData.value }
    } else {
      for (let i = 0; i < defaultConfigDataL; i += 1) {
        const key = defaultConfigDatakeys[i]
        const value = configuredData.value[key]
        if (value === '' || value === undefined || value === null) {
          const defaultValue = defaultConfigData.value[key]
          configForm.value[key] = defaultValue
        } else {
          configForm.value[key] = configuredData.value[key]
        }
      }
    }
  }

  const shouldFieldShow = (fieldData: Field) => {
    if (!fieldData.info.condition) {
      return true
    }
    const { field, regex, value } = fieldData.info.condition
    const fieldValue = configForm.value[field]
    if (regex) {
      const regexExpression = new RegExp(regex)
      return regexExpression.test(fieldValue)
    }
    return value !== undefined || value !== null ? fieldValue === value : true
  }

  const cancel = () => {
    router.back()
  }

  const submit = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      // delete `tag_regex`
      const { tag_regex } = configForm.value
      if (tag_regex !== undefined) {
        delete configForm.value.tag_regex
      }

      // if configForm value is '' or 'undefined' or null, change its value to `default` value or delete it.
      const dataKeys = Object.keys(configForm.value)
      dataKeys.forEach((key) => {
        const value = configForm.value[key]
        if (value === '' || value === undefined || value == null) {
          const field = fieldList.value.find((item: { key: string; info: any }) => item.key === key)
          const isOptional = field?.info?.attribute
          const isDefaultValue = field?.info?.default !== undefined
          if (isOptional && isDefaultValue) {
            configForm.value[key] = defaultConfigData.value[key]
          } else {
            delete configForm.value[key]
          }
        }
      })

      await submitNodeConfig(node.value, configForm.value)
      EmqxMessage.success(t('common.submitSuccess'))
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    configForm.value = cloneDeep(defaultConfigData.value)
  }

  onMounted(async () => {
    isLoading.value = true
    await Promise.all([initMap(), initMsgIdMap()])
    await Promise.all([getPluginInfo(), getNodeConfig()])
    initData()
    isLoading.value = false
  })

  return {
    node,
    configForm,
    defaultConfigData,
    fieldList,
    isLoading,
    formCom,
    isSubmitting,
    shouldFieldShow,
    submit,
    cancel,
    reset,
  }
}
