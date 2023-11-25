import { queryNodeConfig, queryPluginConfigInfo, submitNodeConfig } from '@/api/config'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import useNodeConfigParamCommon from '@/composables/config/useNodeConfigParamCommon'
import type { ParamInfo, PluginInfo } from '@/types/config'
import type { DriverDirection } from '@/types/enums'
import type { Ref } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGetPluginMsgIdMap } from './usePlugin'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'
import { randomString } from '@/utils/utils'

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
  const { initParamDefaultValueByType, isParamHexadecimalBase, transToHexadecimal, transToDecimal } =
    useNodeConfigParamCommon()

  const configForm: Ref<Record<string, any>> = ref({})
  const defaultConfigData: Ref<Record<string, any>> = ref({})
  const configuredData: Ref<Record<string, any>> = ref({})
  const fieldList: Ref<Array<Field>> = ref([])
  const isLoading = ref(false)
  const formCom = ref()
  const formComParmasRef: any = ref([])
  const isSubmitting = ref(false)
  const pluginName = ref('')

  const setParamRef = (el: any) => {
    formComParmasRef.value.push(el)
  }

  const node = computed(() => route.params.node.toString())

  /**
   * Handle Hexadecimal
   * Transfer int number to hexadecimal, when type = init & base = 16
   *  */
  const transValueToHexadecimal = (data: Record<any, any>) => {
    const objData = data
    const keys = Object.keys(objData)
    keys.forEach((key) => {
      const value = objData[key]
      const field = fieldList.value.find(({ key: fieldKey }) => fieldKey === key)
      if (field?.info && isParamHexadecimalBase(field.info)) {
        objData[key] = transToHexadecimal(String(value))
      }
    })
    return objData
  }
  // get node config
  const getNodeConfig = async () => {
    try {
      const { data } = await queryNodeConfig(node.value)

      if (data && data?.params && typeof data.params === 'object') {
        configuredData.value = transValueToHexadecimal(data.params)
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
      const randomStringReg = /\$\{random_str\}/

      /**
       * if the default value contains ${node-name}, {client-id}, {random_str}
       * change the default value of ${node-name} to curent node name
       *  */
      if (typeof defaultValue === 'string') {
        if (nodeNameReg.test(defaultValue)) {
          newDefaultValue = defaultValue.replace(nodeNameReg, node.value)
        }
        if (clientIdReg.test(defaultValue)) {
          newDefaultValue = defaultValue.replace(clientIdReg, node.value)
        }
        if (randomStringReg.test(defaultValue)) {
          const randomStr = randomString(6)
          newDefaultValue = defaultValue.replace(randomStringReg, randomStr)
        }
      }

      /**
       * Handle Hexadecimal
       * Transfer int number to hexadecimal, when type = init & base = 16
       *  */
      if (isParamHexadecimalBase(param)) {
        newDefaultValue = transToHexadecimal(String(param.default))
      }

      return newDefaultValue
    }

    return initParamDefaultValueByType(param.type)
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
    const { plugin } = nodeInfo
    pluginName.value = plugin

    const nodePluginToLower = pluginName.value.toLocaleLowerCase()

    const schemName = pluginMsgIdMap[pluginName.value]?.schema || nodePluginToLower
    const { data } = await queryPluginConfigInfo(schemName)
    if (schemName === 'gewu' && data.operator && data.operator.valid) {
      const validData: Array<any> = [
        { key: '$config.gewuOperator1', value: 0 },
        { key: '$config.gewuOperator2', value: 1 },
        { key: '$config.gewuOperator3', value: 2 },
        { key: '$config.gewuOperator4', value: 3 },
        { key: '$config.gewuOperator5', value: 4 },
      ]
      data.operator.valid = { map: validData }
    }
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
  const initData = async () => {
    const defaultConfigDatakeys = Object.keys(defaultConfigData.value) // according fieldList value
    const defaultConfigDataL = defaultConfigDatakeys.length

    if (!defaultConfigDataL) {
      configForm.value = { ...defaultConfigData.value }
    } else {
      // set default value when value is not set
      for (let i = 0; i < defaultConfigDataL; i += 1) {
        const key = defaultConfigDatakeys[i]
        const value = configuredData.value[key]
        if (value === '' || value === undefined || value === null) {
          const defaultValue = defaultConfigData.value[key]
          configForm.value[key] = defaultValue
        } else {
          configForm.value[key] = value
        }
      }
    }
  }

  const cancel = () => {
    router.back()
  }

  const validateFileds = async (fields: Array<string>) => {
    const { form } = formCom.value
    await form.validateField(fields)
  }

  const validateAll = async () => {
    const validateList = [formCom.value.validate()]

    // counts array parmas
    formComParmasRef.value.forEach((item: { arrayRef: any; validateArrayParam: any }) => {
      const { arrayRef, validateArrayParam } = item || {}
      if (arrayRef && validateArrayParam) {
        validateList.push(validateArrayParam())
      }
    })

    const valids = await Promise.allSettled(validateList)
    const valid = valids.every((item: any) => item?.value || false)
    return Promise.resolve(valid)
  }

  const submit = async () => {
    try {
      isSubmitting.value = true
      const valid = await validateAll()

      if (valid) {
        const bodyData = cloneDeep(configForm.value)
        // delete `tag_regex`
        const { tag_regex } = bodyData
        if (tag_regex !== undefined) {
          delete bodyData.tag_regex
        }

        const dataKeys = Object.keys(bodyData)
        dataKeys.forEach((key) => {
          const value = bodyData[key]
          const field = fieldList.value.find((item: { key: string; info: any }) => item.key === key)

          // if configForm value is '' or 'undefined' or null, change its value to `default` value or delete it.
          if (value === '' || value === undefined || value == null) {
            const isOptional = field?.info?.attribute
            const isDefaultValue = field?.info?.default !== undefined
            if (isOptional && isDefaultValue) {
              bodyData[key] = defaultConfigData.value[key]
            } else {
              delete bodyData[key]
            }
          }

          // if base = 16, transefer value to 10
          if (field && field.info && isParamHexadecimalBase(field.info)) {
            bodyData[key] = transToDecimal(value)
          }
        })

        await submitNodeConfig(node.value, bodyData)
        EmqxMessage.success(t('common.submitSuccess'))
        router.back()
      }
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
    await initData()
    isLoading.value = false
    formCom.value.form.clearValidate()
  })

  return {
    node,
    configForm,
    defaultConfigData,
    fieldList,
    isLoading,
    formCom,
    setParamRef,
    isSubmitting,
    submit,
    cancel,
    reset,
    validateFileds,
  }
}
