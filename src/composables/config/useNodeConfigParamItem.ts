import type { NumberParamInfo, ParamInfo, StringParamInfo } from '@/types/config'
import { ParamRequired, TypeOfPluginParam } from '@/types/enums'
import { createCommonErrorMessage } from '@/utils/utils'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type Props = Readonly<{
  paramKey: string
  paramInfo: ParamInfo
  modelValue?: string | number | boolean | undefined
}>

export default (props: Props) => {
  const { t } = useI18n()
  const rules: Ref<Array<any> | Record<string, any>> = ref([])

  // valid number limit
  const checkNumberParamLimit = (rule: unknown, value: string, callback: any) => {
    const { valid, attribute } = props.paramInfo as NumberParamInfo
    const { max, min } = valid

    if (max === undefined || max === null || min === undefined || min === null) {
      callback()
    }

    const isNumber = Number.isNaN(Number(value)) || Number(value) > valid.max || Number(value) < valid.min
    if (attribute === 'required') {
      if (isNumber) {
        callback(new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`))
      }
    } else if (value !== '' && isNumber) {
      callback(new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`))
    }
    callback()
  }

  // valid string length
  const checkStringParamLength = (rule: unknown, value: string, callback: any) => {
    const { valid } = props.paramInfo as StringParamInfo
    const len = valid?.length

    if (len === undefined || len === null) {
      callback()
    }

    if (value.length > len) {
      callback(new Error(`${t('config.stringLengthErrorPrefix')}1-${len}${t('config.stringLengthErrorSuffix')}`))
    }
    callback()
  }
  // valid string regex
  const checkStringParamRegex = (rule: unknown, value: string, callback: any) => {
    const { valid } = props.paramInfo as StringParamInfo
    if (valid?.regex) {
      const regex = valid.regex.slice(1, valid.regex.length - 1)
      const newRegex = new RegExp(regex)
      if (!newRegex.test(value)) {
        callback(new Error(`${t('config.validHostError')}`))
      }
      callback()
    }
    callback()
  }

  const createNumberParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    { validator: checkNumberParamLimit, trigger: 'blur' },
  ]

  const createStringParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    { validator: checkStringParamLength, trigger: 'blur' },
    { validator: checkStringParamRegex, trigger: 'blur' },
  ]

  const createSelectParamRules = () => ({
    // required: !!props.paramInfo.default,
    required: props.paramInfo.attribute === ParamRequired.True,
    message: createCommonErrorMessage('select', props.paramInfo.name),
  })

  const createFileParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: t('common.fileRequired'),
    },
  ]

  const fillRules = () => {
    const createMap = {
      [TypeOfPluginParam.Int]: createNumberParamRules,
      [TypeOfPluginParam.String]: createStringParamRules,
      [TypeOfPluginParam.Boolean]: createSelectParamRules,
      [TypeOfPluginParam.Enum]: createSelectParamRules,
      [TypeOfPluginParam.Map]: createSelectParamRules,
      [TypeOfPluginParam.File]: createFileParamRules,
    }
    rules.value = createMap[props.paramInfo.type] && createMap[props.paramInfo.type]()
  }

  fillRules()
  return { rules }
}
