import { TagType } from '@/types/enums'

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

/**
 * binary length
 */
const uintLengthMap = {
  [TagType.UINT8]: 8,
  [TagType.UINT16]: 16,
  [TagType.UINT32]: 32,
  [TagType.UINT64]: 64,
}

/**
 * '101110111011' -> ['1011', '1011', '1011']
 */
const chunkStrFromEnd = (str: string, chunkSize: number) => {
  const ret = []
  for (let index = str.length; index > 0; index -= chunkSize) {
    const startIndex = index - chunkSize < 0 ? 0 : index - chunkSize
    ret.push(str.slice(startIndex, index))
  }
  return ret.reverse()
}

/**
 * aabbccdd => aa bb cc dd
 */
const insertString = (str: string, joiner: string, splitLength = 2) => {
  return chunkStrFromEnd(str, splitLength).join(joiner)
}

/**
 * count: 01 + 10 = 11
 */
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

/**
 * 101 -> 0101 or 101 -> 1010
 */
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

/**
 * https://en.wikipedia.org/wiki/Two%27s_complement
 * 0101 -> 1010
 */
const getComplement = (str: string) => {
  if (!checkBinaryStr(str)) {
    return
  }
  return Array.from(str)
    .map((num) => (num === '1' ? '0' : '1'))
    .join('')
}

/**
 * because toString(2) has the problem of loss of precision when the number is too large
 */
const transHexStrToBinaryStr = (str: string) =>
  Array.from(str)
    .map((item) => fillString(parseInt(item, 16).toString(2), '0', 4, true))
    .join('')

/**
 * '1010' => 'a5'
 */
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

/**
 * 1010 0101 -> a5
 */
const transBinaryStrToHexStr = (str: string) => {
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

/**
 * like this: https://gregstoll.com/~gregstoll/floattohex/
 * Use binary as an intermediary
 */
export const transFloatNumberToHex = (num: number | string, type: TagType.FLOAT | TagType.DOUBLE): string => {
  const inputNum = typeof num === 'number' ? num : parseFloat(num)
  if (Number.isNaN(inputNum)) {
    return 'Error'
  }

  const { totalLength, exponentLength } = floatMsgMap[type]
  const mantissaLength = totalLength - exponentLength - 1
  const exponentBaseNum = Math.pow(2, exponentLength - 1) - 1

  if (inputNum === 0) {
    return new Array(totalLength / 4).fill('0').join('')
  }

  let numPart = inputNum
  let flagBit = 0

  let numForAddToExponent = 0

  let exponentPart = ''
  let mantissaPart = ''
  if (inputNum < 0) {
    flagBit = 1
    numPart = -inputNum
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
  let rawStr = transBinaryStrToHexStr(`${flagBit}${exponentPart}${mantissaPart}`)
  rawStr = fillString(rawStr, '0', exponentLength, true)
  return insertString(rawStr, ' ', 2)
}

/**
 * desc: http://blog.sina.com.cn/s/blog_a4acf5ea0102z2r7.html
 */
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
  return insertString(transBinaryStrToHexStr(getSignBit(true) + decimalNumComplementStrAdd1), ' ')
}

/**
 * common base conversion
 */
export const transPositiveIntegerToHex = (value: string) => {
  return Number(value).toString(16)
}

/**
 * For float & double
 */
export const transFloatHexToDecimalNum = (hexStr: string, type: TagType.FLOAT | TagType.DOUBLE) => {
  let hex = hexStr.replace(/\s+/g, '')
  if (hex === '') {
    return ''
  }

  if (/^0+$/.test(hex)) {
    return '0'
  }

  const { totalLength, exponentLength } = floatMsgMap[type]
  const hexStrLength = totalLength / 4
  const exponentBaseNum = Math.pow(2, exponentLength - 1) - 1

  if (hex.length > hexStrLength || isNaN(parseInt(hex, 16))) {
    return new Error('hex error')
  }

  if (hex.length < hexStrLength) {
    hex = fillString(hex, '0', hexStrLength, true)
  }

  let binaryStr = transHexStrToBinaryStr(hex)
  binaryStr = fillString(binaryStr, '0', totalLength, true)

  const flagBit = Number(binaryStr.substring(0, 1))
  const exponentPartBinaryStr = binaryStr.substring(1, exponentLength + 1)
  const numExponentPartNeedToSub = parseInt(exponentPartBinaryStr, 2) - exponentBaseNum
  let mantissaPartBinaryStr = binaryStr.substring(exponentLength + 1)
  mantissaPartBinaryStr = '1' + mantissaPartBinaryStr
  let totalBinaryStrWithPoint = ''
  if (numExponentPartNeedToSub >= 0) {
    // the number bigger than 1
    totalBinaryStrWithPoint =
      mantissaPartBinaryStr.substring(0, numExponentPartNeedToSub + 1) +
      '.' +
      mantissaPartBinaryStr.substring(numExponentPartNeedToSub + 1)
  } else {
    totalBinaryStrWithPoint =
      '0.' + fillString(mantissaPartBinaryStr, '0', mantissaPartBinaryStr.length - numExponentPartNeedToSub - 1, true)
  }

  if (totalBinaryStrWithPoint.indexOf('.') == -1) {
    totalBinaryStrWithPoint = totalBinaryStrWithPoint + '.0'
  }
  const [exponentPart, mantissaPart] = totalBinaryStrWithPoint.split('.')
  const exponentPartNum = parseInt(exponentPart, 2)
  let mantissaPartNum = 0
  for (let i = 0; i < mantissaPart.length; i++) {
    mantissaPartNum += parseFloat(mantissaPart.charAt(i)) * Math.pow(2, -(i + 1))
  }
  let totalNumPart = exponentPartNum + mantissaPartNum
  if (flagBit === 1) {
    totalNumPart = 0 - totalNumPart
  }
  return totalNumPart
}

/**
 * For uint
 * desc: http://blog.sina.com.cn/s/blog_a4acf5ea0102z2r7.html reverse process
 */
export const transUintHexToDecimalNum = (
  unitHex: string,
  type: TagType.UINT8 | TagType.UINT16 | TagType.UINT32 | TagType.UINT64,
) => {
  let hexStr = unitHex
  const binaryLength = uintLengthMap[type]
  const hexStrLength = binaryLength / 4
  if (unitHex.length < hexStrLength) {
    hexStr = fillString(hexStr, '0', hexStrLength, true)
  }

  let binaryStr = transHexStrToBinaryStr(hexStr)
  binaryStr = fillString(binaryStr, '0', binaryLength, true)
  const flagBit = Number(binaryStr.substring(0, 1))
  if (flagBit === 1) {
    binaryStr =
      getComplement(fillString((parseInt(binaryStr.substring(1), 2) - 1).toString(2), '0', binaryLength, true)) || ''
    return -parseInt(binaryStr.substring(1), 2)
  }
  return parseInt(binaryStr, 2)
}

/**
 * For int
 */
export const transIntHexToDecimalNum = (intHex: string) => {
  return parseInt(intHex, 16)
}
