import { TagType } from '@/types/enums'
import {} from 'lodash'

const floatMsgMap = {
  [TagType.FLOAT]: {
    totalLength: 32,
    exponentLength: 8,
  },
  [TagType.DOUBLE]: {
    totalLength: 64,
    exponentLength: 11,
  },
}

const uintLengthMap = {
  [TagType.UINT8]: 8,
  [TagType.UINT16]: 16,
  [TagType.UINT32]: 32,
  [TagType.UINT64]: 64,
}

const chunkStrFromEnd = (str: string, chunkSize: number) => {
  const ret = []
  for (let index = str.length; index > 0; index -= chunkSize) {
    const startIndex = index - chunkSize < 0 ? 0 : index - chunkSize
    ret.push(str.slice(startIndex, index))
  }
  return ret.reverse()
}

const insertString = (str: string, joiner: string, splitLength = 2) => {
  return chunkStrFromEnd(str, splitLength).join(joiner)
}

const addBinary = (str1: string, str2: string) => {
  const arrForRet = []
  let binaryStr1 = str1
  let binaryStr2 = str2

  while (binaryStr1.length < binaryStr2.length) {
    binaryStr1 = '0' + binaryStr1
  }

  while (binaryStr2.length < binaryStr1.length) {
    binaryStr2 = '0' + binaryStr2
  }

  let addOne = 0
  for (let i = binaryStr1.length - 1; i >= 0; i--) {
    const curA = +binaryStr1.charAt(i)
    const curB = +binaryStr2.charAt(i)
    const sum = curA + curB + addOne
    if (sum >= 2) {
      arrForRet[i] = sum - 2
      addOne = 1
    } else {
      arrForRet[i] = sum
      addOne = 0
    }
  }

  if (addOne > 0) {
    arrForRet.unshift(1)
  }
  return arrForRet.join('')
}

const fillString = (str: string, filler: string, length: number, isFillFront: boolean) => {
  if (str == '' || filler.length != 1 || length <= str.length) {
    return str
  }
  let ret = str
  const l = str.length
  for (let i = 0; i < length - l; i++) {
    if (isFillFront) {
      ret = filler + ret
    } else {
      ret += filler
    }
  }
  return ret
}

const getSignBit = (isNegative: boolean) => (isNegative ? 1 : 0)

const checkBinaryStr = (str: string) => /^(0|1)+$/.test(str)

const getComplement = (str: string) => {
  if (!checkBinaryStr(str)) {
    return
  }
  return Array.from(str)
    .map((num) => (num === '1' ? '0' : '1'))
    .join('')
}

const transA4DigitBinaryNumberStrToHexStr = (str: string) => {
  if (!checkBinaryStr(str)) {
    return
  }
  if (str.length !== 4) {
    return
  }
  return Array.from(str)
    .reduce((count, num, index) => {
      return count + parseInt(num) * Math.pow(2, 4 - 1 - index)
    }, 0)
    .toString(16)
}

const transDecimalStrToHexStr = (str: string) => {
  if (!checkBinaryStr(str)) {
    return str
  }
  let decimalStr = str
  if (decimalStr.length % 4 !== 0) {
    decimalStr = fillString(decimalStr, '0', decimalStr.length + (4 - (decimalStr.length % 4)), true)
  }
  const strChunkArr = chunkStrFromEnd(decimalStr, 4)
  return strChunkArr.map((binaryBlock) => transA4DigitBinaryNumberStrToHexStr(binaryBlock)).join('')
}

export const transFloatNumberToHex = (num: number, type: TagType.FLOAT | TagType.DOUBLE): string => {
  if (Number.isNaN(num)) {
    return 'Error'
  }

  const { totalLength, exponentLength } = floatMsgMap[type]
  const mantissaLength = totalLength - exponentLength - 1
  const exponentBaseNum = Math.pow(2, exponentLength - 1) - 1

  if (num === 0) {
    return new Array(totalLength / 4).fill('0').join('')
  }

  let numPart = num
  let flagBit = 0

  let numForAddToExponent = 0

  let exponentPart = ''
  let mantissaPart = ''
  if (num < 0) {
    flagBit = 1
    numPart = -num
  }

  let binaryString = numPart.toString(2)
  if (binaryString >= '1') {
    if (binaryString.indexOf('.') === -1) {
      binaryString = binaryString + '.0'
    }
    numForAddToExponent = binaryString.indexOf('.') - 1
  } else {
    numForAddToExponent = 1 - binaryString.indexOf('1')
  }

  if (numForAddToExponent >= 0) {
    mantissaPart = binaryString.replace('.', '')
  } else {
    mantissaPart = binaryString.substring(binaryString.indexOf('1'))
  }

  if (mantissaPart.length > mantissaLength + 1) {
    mantissaPart = mantissaPart.substring(0, mantissaLength + 1)
  } else {
    mantissaPart = fillString(mantissaPart, '0', mantissaLength + 1, false)
  }
  mantissaPart = mantissaPart.substring(1)
  exponentPart = (exponentBaseNum + numForAddToExponent).toString(2)
  exponentPart = fillString(exponentPart, '0', exponentLength, true)
  let rawStr = transDecimalStrToHexStr(`${flagBit}${exponentPart}${mantissaPart}`)
  rawStr = fillString(rawStr, '0', exponentLength, true)
  return insertString(rawStr, ' ', 2)
}

export const transNegativeNumberToHex = (
  num: number,
  type: TagType.UINT8 | TagType.UINT16 | TagType.UINT32 | TagType.UINT64,
): number | string => {
  const decimalNumWithoutSignBitStr: string = (-num).toString(2)
  const decimalNumFullWithoutSignBitStr = fillString(decimalNumWithoutSignBitStr, '0', uintLengthMap[type] - 1, true)
  const decimalNumComplementStr = getComplement(decimalNumFullWithoutSignBitStr)
  if (!decimalNumComplementStr) {
    return num
  }
  const decimalNumComplementStrAdd1 = addBinary(decimalNumComplementStr, '1')
  if (decimalNumComplementStrAdd1.length > uintLengthMap[type] - 1) {
    return num
  }
  return insertString(transDecimalStrToHexStr(getSignBit(true) + decimalNumComplementStrAdd1), ' ')
}

export const transPositiveIntegerToHex = (value: string) => {
  return Number(value).toString(16)
}
