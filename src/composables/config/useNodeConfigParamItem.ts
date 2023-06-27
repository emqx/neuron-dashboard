import type { NumberParamInfo, ParamInfo, StringParamInfo } from '@/types/config'
import { ParamRequired, TypeOfPluginParam, SchameBase } from '@/types/enums'
import { createCommonErrorMessage } from '@/utils/utils'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import useNodeConfigParamCommon from '@/composables/config/useNodeConfigParamCommon'
import useLang from '@/composables/useLang'

type Props = Readonly<{
  paramKey: string
  paramInfo: ParamInfo
  modelValue?: string | number | boolean | undefined
}>

export default (props: Props) => {
  const { t } = useI18n()
  const { i18nContent } = useLang()

  const { isParamHexadecimalBase, checkHexadecimalValue, transToDecimal } = useNodeConfigParamCommon()

  // valid number limit
  const checkNumberParamLimit = async (rule: unknown, value: string, callback: any) => {
    const trueValue = isParamHexadecimalBase(props.paramInfo) ? transToDecimal(value) : value
    const { valid, attribute } = props.paramInfo as NumberParamInfo
    const { max, min } = valid

    if (max === undefined || max === null || min === undefined || min === null) {
      callback()
    }

    const isNumber = Number.isNaN(Number(trueValue)) || Number(trueValue) > valid.max || Number(trueValue) < valid.min
    if (attribute === 'required') {
      if (isNumber) {
        callback(new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`))
      }
    } else if (trueValue !== '' && isNumber) {
      callback(new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`))
    }
    callback()
  }

  // check number hexadecimal | decimal
  const checkNumberParamHexadecimal = async (rule: unknown, value: string, callback: any) => {
    const { base } = props.paramInfo as NumberParamInfo

    const trueVlue = String(value).replace(/\s/g, '')
    if (base === SchameBase.hexadecimal) {
      if (!checkHexadecimalValue(trueVlue)) {
        callback(new Error(t('config.hexadecimalFormatError')))
      } else {
        callback()
      }
    } else {
      const isDecimalValue = /^[0-9]\d*$/.test(trueVlue)
      if (!isDecimalValue) {
        callback(new Error(t('config.decimalFormatError')))
      } else {
        callback()
      }
    }
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
      message: createCommonErrorMessage('input', i18nContent(props.paramInfo, 'name')),
    },
    {
      type: isParamHexadecimalBase(props.paramInfo) ? 'string' : 'number',
      message: isParamHexadecimalBase(props.paramInfo)
        ? t('config.hexadecimalFormatError')
        : t('config.numberFormatError'),
    },
    { validator: checkNumberParamHexadecimal, trigger: 'blur' },
    { validator: checkNumberParamLimit, trigger: 'blur' },
  ]

  const createStringParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', i18nContent(props.paramInfo, 'name')),
    },
    { validator: checkStringParamLength, trigger: 'blur' },
    { validator: checkStringParamRegex, trigger: 'blur' },
  ]

  const createSelectParamRules = () => ({
    // required: !!props.paramInfo.default,
    required: props.paramInfo.attribute === ParamRequired.True,
    message: createCommonErrorMessage('select', i18nContent(props.paramInfo, 'name')),
  })

  const createFileParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: t('common.fileRequired'),
    },
  ]

  const rules = computed(() => {
    const createMap = {
      [TypeOfPluginParam.Int]: createNumberParamRules,
      [TypeOfPluginParam.String]: createStringParamRules,
      [TypeOfPluginParam.Boolean]: createSelectParamRules,
      [TypeOfPluginParam.Enum]: createSelectParamRules,
      [TypeOfPluginParam.Map]: createSelectParamRules,
      [TypeOfPluginParam.File]: createFileParamRules,
    }
    return (createMap[props.paramInfo.type] && createMap[props.paramInfo.type]()) || []
  })

  return { rules }
}
