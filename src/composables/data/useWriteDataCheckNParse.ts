/*
BYTE	    2   Hexadecimal string

INT8	    3   -128 to 127
INT16	    4   -32,768 to 32,767
INT32	    5   -2,147,483,648 to 2,147,483,647
INT64	    6   -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

UINT8	    7   0 to 255
UINT16	  8   0 to 65,535
UINT32	  9   0 to 4,294,967,295
UINT64	  10  0 to 18,446,744,073,709,551,615

FLOAT	    11  -1.175494351 E - 38	3.402823466 E + 38 TODO:
DOUBLE	  12  2.2250738585072014 E - 308	1.7976931348623158 E + 308 TODO:

BOOL	    13  true false
BIT	      14  Binary number
STRING    15  string
*/

import { TagType } from '@/types/enums'
import { HEXADECIMAL_PREFIX } from '@/utils/constants'
import {
  transFloatNumberToHex,
  transNegativeNumberToHex,
  transPositiveIntegerToHex,
  transFloatHexToDecimalNum,
  transUintHexToDecimalNum,
  transIntHexToDecimalNum,
} from './convert'
import type { TagDataInTable } from './useDataMonitoring'

export enum WriteDataErrorCode {
  FormattingError = 1,
  LessThanMinimum,
  GreaterThanMaximum,
  LessThanMinSafeInteger,
  GreaterThanMaxSafeInteger,
}

interface RangeObj {
  MIN: number
  MAX: number
}

export default () => {
  const createIntTypeRange = (bitsNum: number): RangeObj => {
    return {
      MIN: -(2 ** (bitsNum - 1)),
      MAX: 2 ** (bitsNum - 1) - 1,
    }
  }
  const createUIntTypeRange = (bitsNum: number): RangeObj => {
    return {
      MIN: 0,
      MAX: 2 ** bitsNum - 1,
    }
  }

  const INT8_RANGE = createIntTypeRange(8)
  const INT16_RANGE = createIntTypeRange(16)
  const INT32_RANGE = createIntTypeRange(32)
  const INT64_RANGE = createIntTypeRange(64)

  const UINT8_RANGE = createUIntTypeRange(8)
  const UINT16_RANGE = createUIntTypeRange(16)
  const UINT32_RANGE = createUIntTypeRange(32)
  const UINT64_RANGE = createUIntTypeRange(64)

  const checkByte = (value: string): Promise<boolean | Error> =>
    /^0(x|X)[0-9a-f]+$/.test(value.replace(/\s/g, ''))
      ? Promise.resolve(true)
      : Promise.reject(new Error(WriteDataErrorCode.FormattingError.toString()))

  const checkBit = (value: string): Promise<boolean | Error> =>
    /^[0-9a-f]+$/.test(value)
      ? Promise.resolve(true)
      : Promise.reject(new Error(WriteDataErrorCode.FormattingError.toString()))

  const checkIsInt = (value: string): boolean => /^-?\d+$/.test(value)
  const checkLessThanMinimumSafeNumber = (value: string) => Number(value) < Number.MIN_SAFE_INTEGER
  const checkGreaterThanMaximumSafeNumber = (value: string): boolean => Number(value) > Number.MAX_SAFE_INTEGER
  const checkInt = (rangeObj: RangeObj, value: string): Promise<Error | boolean> => {
    let errorCode: undefined | WriteDataErrorCode
    if (!checkIsInt(value)) {
      errorCode = WriteDataErrorCode.FormattingError
    } else if (checkLessThanMinimumSafeNumber(value)) {
      /**
       * Because when the data is large Number.MAX_SAFE_INTEGER,
       * passing parameters to the interface will hava the data error,
       * so limit the maximum value of the input
       */
      errorCode = WriteDataErrorCode.LessThanMinSafeInteger
    } else if (checkGreaterThanMaximumSafeNumber(value)) {
      errorCode = WriteDataErrorCode.GreaterThanMaxSafeInteger
    } else if (Number(value) < rangeObj.MIN) {
      errorCode = WriteDataErrorCode.LessThanMinimum
    } else if (Number(value) > rangeObj.MAX) {
      errorCode = WriteDataErrorCode.GreaterThanMaximum
    }
    if (errorCode) {
      return Promise.reject(new Error(errorCode.toString()))
    }
    return Promise.resolve(true)
  }

  // Support scientific notation
  const checkIsFloat = (value: string): boolean => /^-?\d*\.?\d+(e-?\d+)?$/.test(value)
  // const checkIsFloat = (value: string): boolean => /^-?\d*(\.[1-9]\d*)$/.test(value)
  const checkFloat = (value: string): Promise<Error | boolean> => {
    if (!checkIsFloat(value)) {
      return Promise.reject(new Error(WriteDataErrorCode.FormattingError.toString()))
    }
    return Promise.resolve(true)
  }

  const checkStrNBool = () => Promise.resolve(true)

  const check = (type: TagType, value: string) => {
    const checkMap = {
      [TagType.BYTE]: checkByte.bind(null, value),
      [TagType.INT8]: checkInt.bind(null, INT8_RANGE, value),
      [TagType.INT16]: checkInt.bind(null, INT16_RANGE, value),
      [TagType.INT32]: checkInt.bind(null, INT32_RANGE, value),
      [TagType.INT64]: checkInt.bind(null, INT64_RANGE, value),
      [TagType.UINT8]: checkInt.bind(null, UINT8_RANGE, value),
      [TagType.UINT16]: checkInt.bind(null, UINT16_RANGE, value),
      [TagType.UINT32]: checkInt.bind(null, UINT32_RANGE, value),
      [TagType.UINT64]: checkInt.bind(null, UINT64_RANGE, value),
      [TagType.FLOAT]: checkFloat.bind(null, value),
      [TagType.DOUBLE]: checkFloat.bind(null, value),
      [TagType.BOOL]: checkStrNBool.bind(null),
      [TagType.BIT]: checkBit.bind(null, value),
      [TagType.STRING]: checkStrNBool.bind(null),
      [TagType.NEU_TYPE_WORD]: checkInt.bind(null, INT16_RANGE, value),
      [TagType.NEU_TYPE_DWORD]: checkInt.bind(null, INT16_RANGE, value),
      [TagType.NEU_TYPE_LWORD]: checkInt.bind(null, INT16_RANGE, value),
    }
    return checkMap[type]()
  }

  const parseWriteData = (type: TagType, value: string) => {
    if (type === TagType.BYTE || type === TagType.STRING || type === TagType.BOOL) {
      return value
    }
    return Number(value)
  }
  const checkWriteData = async (type: number, value: string): Promise<boolean | Error> => {
    return check(type, value)
  }

  const checkHexadecimal = (value: string) => {
    const str =
      value.slice(0, HEXADECIMAL_PREFIX.length).toLowerCase() === HEXADECIMAL_PREFIX
        ? value
        : HEXADECIMAL_PREFIX + value
    return checkByte(str)
  }
  const transToDecimal = async (tagData: TagDataInTable) => {
    const { value, type } = tagData
    const str =
      value.slice(0, HEXADECIMAL_PREFIX.length).toLowerCase() === HEXADECIMAL_PREFIX
        ? value
        : HEXADECIMAL_PREFIX + value
    try {
      await checkByte(str)
      const hexStr = str.slice(HEXADECIMAL_PREFIX.length)
      if (type === TagType.FLOAT || type === TagType.DOUBLE) {
        return transFloatHexToDecimalNum(hexStr, type)
      }
      if (type === TagType.UINT8 || type === TagType.UINT16 || type === TagType.UINT32 || type === TagType.UINT64) {
        return transUintHexToDecimalNum(hexStr, type)
      }
      return transIntHexToDecimalNum(hexStr)
    } catch (error) {
      return value
    }
  }
  const transToHexadecimal = async (tagData: TagDataInTable) => {
    const { value, type } = tagData
    try {
      await checkFloat(value.toString())
      if (type === TagType.FLOAT || type === TagType.DOUBLE) {
        return HEXADECIMAL_PREFIX + transFloatNumberToHex(value, type)
      }
      if (
        value < 0 &&
        (type === TagType.UINT8 || type === TagType.UINT16 || type === TagType.UINT32 || type === TagType.UINT64)
      ) {
        return HEXADECIMAL_PREFIX + transNegativeNumberToHex(value, type)
      }
      return HEXADECIMAL_PREFIX + transPositiveIntegerToHex(value)
    } catch (error) {
      return value
    }
  }
  return {
    checkFloat,
    checkHexadecimal,
    checkWriteData,
    parseWriteData,
    transToDecimal,
    transToHexadecimal,
  }
}
