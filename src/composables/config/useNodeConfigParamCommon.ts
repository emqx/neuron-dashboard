import type { ParamInfo } from '@/types/config'
import { dataType } from '@/utils/utils'
import { TypeOfPluginParam, SchameBase } from '@/types/enums'
import useLang from '@/composables/useLang'
import { HEXADECIMAL_PREFIX } from '@/utils/constants'
import { HEXADECIMAL_REGEX, LOWERCASE_INITIAL_REGEX } from '@/utils/regexps'
import { transIntHexToDecimalNum, transPositiveIntegerToHex } from '@/composables/data/convert'

export default () => {
  const { i18nContent } = useLang()

  interface Field {
    key: string
    info: ParamInfo
  }
  const shouldFieldShow = (fieldData: Field, formData: Record<string, any>) => {
    const { key } = fieldData

    const whiteList = ['tag_regex', 'group_interval']
    if (whiteList.includes(key)) return false

    if (!fieldData?.info?.condition) {
      return true
    }

    const { field, regex, value, values = [] } = fieldData.info.condition
    const fieldValue = formData[field]

    if (regex) {
      const regexExpression = new RegExp(regex)
      return regexExpression.test(fieldValue)
    }

    let res = true
    const emptyEnums = ['undefined', 'null']
    const emptyValue = emptyEnums.includes(String(dataType(value)))
    const emptyValues = emptyEnums.includes(String(dataType(values)))
    if (!emptyValue) {
      res = fieldValue === value
    } else if (!emptyValues) {
      res = values.includes(fieldValue)
    }
    return res
  }

  const initParamDefaultValueByType = (type: TypeOfPluginParam) => {
    const initValueMap = {
      [TypeOfPluginParam.Int]: null,
      [TypeOfPluginParam.String]: '',
      [TypeOfPluginParam.Boolean]: null,
      [TypeOfPluginParam.Enum]: '',
      [TypeOfPluginParam.Map]: '',
      [TypeOfPluginParam.Array]: [],
      [TypeOfPluginParam.File]: '',
    }
    return initValueMap[type] === undefined ? '' : initValueMap[type]
  }

  const upperFirstLetter = (str: string) => {
    if (LOWERCASE_INITIAL_REGEX.test(str)) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    return str
  }

  const showLabel = (field: ParamInfo) => {
    const label = i18nContent(field, 'name')
    return upperFirstLetter(label)
  }

  const isParamHexadecimalBase = (param: ParamInfo) => {
    return param.type === TypeOfPluginParam.Int && param?.base === SchameBase.hexadecimal
  }

  const checkHexadecimalValue = (value: string | number) => {
    if (value === undefined || value === null) return false

    const str = value.toString().replace(/\s/g, '')
    const trueVlue =
      str.slice(0, HEXADECIMAL_PREFIX.length).toLowerCase() === HEXADECIMAL_PREFIX ? str : HEXADECIMAL_PREFIX + str
    const isHexadecimalValue = HEXADECIMAL_REGEX.test(trueVlue)
    return isHexadecimalValue
  }

  const transToHexadecimal = (value: string) => {
    return `${HEXADECIMAL_PREFIX}${transPositiveIntegerToHex(value)}`
  }

  // transe to Decimal
  const transToDecimal = (value: string) => {
    const str =
      value.slice(0, HEXADECIMAL_PREFIX.length).toLowerCase() === HEXADECIMAL_PREFIX
        ? value
        : HEXADECIMAL_PREFIX + value

    if (!checkHexadecimalValue(str)) return value

    const hexStr = str.slice(HEXADECIMAL_PREFIX.length)
    return transIntHexToDecimalNum(hexStr)
  }

  return {
    shouldFieldShow,
    initParamDefaultValueByType,
    upperFirstLetter,
    showLabel,

    checkHexadecimalValue,
    isParamHexadecimalBase,
    transToDecimal,
    transToHexadecimal,
  }
}
