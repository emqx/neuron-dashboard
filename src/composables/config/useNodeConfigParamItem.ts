import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NumberParamInfo, ParamInfo, StringParamInfo, ArrayParamInfo } from '@/types/config'
import { ParamRequired, TypeOfPluginParam, SchameBase } from '@/types/enums'
import { createCommonErrorMessage, dataType } from '@/utils/utils'
import useNodeConfigParamCommon from '@/composables/config/useNodeConfigParamCommon'

type Props = Readonly<{
  paramKey: string
  paramInfo: ParamInfo
  modelValue?: string | number | boolean | undefined
}>

export default (props: Props) => {
  const { t } = useI18n()

  enum RangeErrorEnums {
    All = 'all',
    Max = 'max',
    Min = 'min',
    Default = '',
  }

  const comparisonRange = (
    val: number,
    range: { min: number; max: number },
  ): { errorMsgType: string; inRange: boolean } => {
    const value = Number(val)
    const { min, max } = range
    const emptyNumbers = ['undefined', 'null']
    const minNumberType = String(dataType(min))
    const maxNumberType = String(dataType(max))
    const isMinEmpty = emptyNumbers.includes(minNumberType)
    const isMaxEmpty = emptyNumbers.includes(maxNumberType)

    let inRange = true // default with all undefined ro all null
    let errorMsgType = RangeErrorEnums.Default

    if (!isMinEmpty && !isMaxEmpty) {
      // all not undefined or all not null
      errorMsgType = RangeErrorEnums.All
      inRange = value >= min && value <= max
    }
    if (!isMinEmpty && isMaxEmpty) {
      errorMsgType = RangeErrorEnums.Min
      inRange = value >= min
    }
    if (isMinEmpty && !isMaxEmpty) {
      errorMsgType = RangeErrorEnums.Max
      inRange = value >= 0 && value <= max
    }
    return {
      errorMsgType,
      inRange,
    }
  }

  const { isParamHexadecimalBase, checkHexadecimalValue, transToDecimal } = useNodeConfigParamCommon()
  // valid number limit
  const checkNumberParamLimit = async (rule: unknown, value: string, callback: any) => {
    const trueValue = isParamHexadecimalBase(props.paramInfo) ? transToDecimal(value) : value

    const { valid, attribute } = props.paramInfo as NumberParamInfo
    const { max, min } = valid

    const isInRange = comparisonRange(Number(trueValue), { min, max })

    const { inRange, errorMsgType } = isInRange

    const errorMsgMap = new Map([
      [String(RangeErrorEnums.All), t('config.numberRangeErrorMsg', { min, max })],
      [String(RangeErrorEnums.Min), t('config.numberMinimumErrorMsg', { min })],
      [String(RangeErrorEnums.Max), t('config.numberMaximumErrorMsg', { max })],
      [String(RangeErrorEnums.Default), ''],
    ])

    if (attribute === 'required') {
      if (!inRange) {
        const errorMsg = errorMsgMap.get(errorMsgType)
        callback(new Error(errorMsg))
      } else {
        callback()
      }
    } else if (trueValue !== '' && !inRange) {
      const errorMsg = errorMsgMap.get(errorMsgType)
      callback(new Error(errorMsg))
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

  const checkArrayParamLength = (rule: unknown, value: string, callback: any) => {
    const { valid } = props.paramInfo as ArrayParamInfo
    const { min_length, max_length } = valid

    const isInRange = comparisonRange(value.length, { min: min_length, max: max_length })
    const { inRange, errorMsgType } = isInRange

    const errorMsgMap = new Map([
      [String(RangeErrorEnums.All), t('config.lengthRangeErrorMsg', { min: min_length, max: max_length })],
      [String(RangeErrorEnums.Min), t('config.lengthMinimumErrorMsg', { min: min_length })],
      [String(RangeErrorEnums.Max), t('config.lengthMaximumErrorMsg', { max: max_length })],
      [String(RangeErrorEnums.Default), ''],
    ])

    if (!inRange) {
      const errorMsg = errorMsgMap.get(errorMsgType)
      callback(new Error(errorMsg))
    } else {
      callback()
    }
  }

  const createNumberParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
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
      type: 'string',
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

  const createArrayParamRules = () => [
    {
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    { validator: checkArrayParamLength, trigger: ['blur', 'change'] },
  ]

  const rules = computed(() => {
    const createMap = {
      [TypeOfPluginParam.Int]: createNumberParamRules,
      [TypeOfPluginParam.String]: createStringParamRules,
      [TypeOfPluginParam.Boolean]: createSelectParamRules,
      [TypeOfPluginParam.Enum]: createSelectParamRules,
      [TypeOfPluginParam.Map]: createSelectParamRules,
      [TypeOfPluginParam.File]: createFileParamRules,
      [TypeOfPluginParam.Array]: createArrayParamRules,
    }
    return (createMap[props.paramInfo.type] && createMap[props.paramInfo.type]()) || []
  })
  return {
    rules,
  }
}
