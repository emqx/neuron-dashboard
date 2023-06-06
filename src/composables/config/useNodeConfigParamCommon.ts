import type { ParamInfo } from '@/types/config'
import { TypeOfPluginParam, SchameBase } from '@/types/enums'
import { HEXADECIMAL_PREFIX } from '@/utils/constants'
import { transIntHexToDecimalNum, transPositiveIntegerToHex } from '@/composables/data/convert'

export default () => {
  const isParamHexadecimalBase = (param: ParamInfo) => {
    return param.type === TypeOfPluginParam.Int && param?.base === SchameBase.hexadecimal
  }

  const checkHexadecimalValue = (value: string | number) => {
    if (value === undefined || value === null) return false

    const str = value.toString().replace(/\s/g, '')
    const trueVlue =
      str.slice(0, HEXADECIMAL_PREFIX.length).toLowerCase() === HEXADECIMAL_PREFIX ? str : HEXADECIMAL_PREFIX + str
    const isHexadecimalValue = /^0(x|X)[0-9a-f]+$/.test(trueVlue)
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
    checkHexadecimalValue,
    isParamHexadecimalBase,
    transToDecimal,
    transToHexadecimal,
  }
}
