import i18n from '@/i18n/index'
import { ERROR_CODE_ARR, SELF_HANDLE_ERROR_CODES } from './constants'
import { utils as XLSXUtils, writeFile } from 'xlsx'
import { EmqxMessage } from '@emqx/emqx-ui'
import { omit, cloneDeep, orderBy } from 'lodash'
import CryptoJS from 'crypto-js'

/**
 * when the value is int, can use this func to create option list
 */
export const createOptionListFromEnum = (e: Record<string, any>) => {
  return Object.keys(e)
    .filter((key) => typeof e[key] === 'number')
    .map((key) => ({
      value: e[key],
      label: key,
    }))
}

const firstLowerCase = ([first, ...rest]: string) => first.toLowerCase() + rest.join('')

export const createCommonErrorMessage = (type: 'input' | 'select', target: string) => {
  const {
    global: { t },
  } = i18n
  const local = i18n.global.locale

  let targetStr = target
  if (local.value === 'en') {
    targetStr = firstLowerCase(targetStr)
  }
  const prefixText: string = type === 'input' ? t('common.inputRequired') : t('common.selectRequired')
  const res = `${prefixText}${targetStr}`
  return res
}

export const paginate = (data: Array<any>, pageSize: number, pageNumber: number) => {
  return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export const createRandomString = (length = 6): string => {
  const libLetters = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const libLettersLength = libLetters.length
  let ret = ''
  for (let i = 0; i < length; i += 1) {
    ret += libLetters.charAt(Math.floor(Math.random() * libLettersLength))
  }
  return ret
}

export const createMapFromArray = (array: Array<Record<any, any>>, mapKey = 'id') =>
  array.reduce((obj, curr) => {
    obj[curr[mapKey]] = curr
    return obj
  }, Object.create(null))

export const matchObjShape = (obj: Record<string, any>, templateObj: Record<string, any>): boolean => {
  const needKeys = Object.keys(templateObj)
  const objKeys = Object.keys(obj)
  return needKeys.every((key) => objKeys.includes(key))
}

export const getErrorMsg = (errorCode: number): string => {
  const hasErrorMsg = ERROR_CODE_ARR.includes(errorCode)
  if (!hasErrorMsg) {
    return 'unknown'
  }

  return i18n.global.t(`error.${errorCode}`)
}

export const exportExcelData = (content: Array<any>, fileName: string) => {
  return new Promise((resolve, reject) => {
    try {
      const ws = XLSXUtils.aoa_to_sheet(content)
      const wb = XLSXUtils.book_new()
      XLSXUtils.book_append_sheet(wb, ws, 'SheetJS')
      /* generate file and send to client */
      writeFile(wb, `${fileName}.xlsx`)
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}

export const jumpToFirstErrorFormItem = (): void => {
  const el = document.querySelector('.el-form-item.is-error')
  if (el) {
    el.scrollIntoView()
    window.scrollBy(0, -100)
  }
}

export const countBaseURL = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/api/v2'
  }
  const { hostname, port, protocol, origin } = window.location
  // const serverURL = port ? `${protocol}//${hostname}:${(Number(port) + 1).toString()}` : origin
  const serverURL = port ? `${protocol}//${hostname}:${Number(port).toString()}` : origin
  return `${serverURL}/api/v2`
}

export interface CompatibleErrorCode {
  compatibleErrorCode: boolean
  name: string
}
export const popUpErrorMessage = (error: number, config?: CompatibleErrorCode) => {
  const { compatibleErrorCode, name = '' } = config || {}

  // 10701 - 10744: used 10701
  const errorCode = error >= 10701 && error <= 10744 ? 10701 : error

  const isHandleErrorCodeSelf = SELF_HANDLE_ERROR_CODES[name]?.includes(errorCode)
  const errorMsg =
    compatibleErrorCode && isHandleErrorCodeSelf
      ? i18n.global.t(`error.${name}${errorCode}`)
      : `Error (code: ${errorCode}): ${getErrorMsg(errorCode)}`

  EmqxMessage({
    message: errorMsg,
    type: 'error',
    dangerouslyUseHTMLString: true,
  })
}

export const OmitArrayFields = (list: any, params: string[]) => {
  const res = list.map((item: any) => omit(item, params))
  return res
}

// show 'G', or 'M'
const handleMemory = (memory: number, type: string): string => {
  let resString = ''
  let isGB = null

  if (type === `byte`) {
    isGB = memory / (1024 * 1024 * 1024) > 1
    const mem = isGB ? memory / (1024 * 1024 * 1024) : memory / (1024 * 1024)
    resString = mem.toFixed(2)
  } else if (type === 'kb') {
    isGB = memory / (1024 * 1024) > 1
    const mem = isGB ? memory / (1024 * 1024) : memory / 1024
    resString = mem.toFixed(2)
  } else if (type === 'mb') {
    isGB = memory / 1024 > 1
    const mem = isGB ? memory / 1024 : memory
    resString = mem.toFixed(2)
  } else if (type === 'gb') {
    resString = memory.toFixed(2)
  } else if (type === 'tb') {
    resString = (memory * 1024).toFixed(2)
  }

  const unit = isGB ? 'G' : 'M'
  return `${resString} ${unit}`
}

export const formatMemory = (memory: number, type?: string): string => {
  if (!memory) return `0 M`

  const ty: string = type?.toLocaleLowerCase() || 'byte'

  const dataMap = new Map([
    ['byte', handleMemory(memory, ty)],
    ['kb', handleMemory(memory, ty)],
    ['mb', handleMemory(memory, ty)],
    ['gb', handleMemory(memory, ty)],
    ['tb', handleMemory(memory, ty)],
  ])
  return dataMap.get(ty) || ''
}

export const listOrderByKey = (list: Array<any>, prop: string, order: 'asc' | 'desc') => {
  if (!list.length) return []

  const data = cloneDeep(list)
  const sortList = orderBy(data, [prop], [order])
  return sortList
}

export const dataType = (value: any) => {
  const valueType = Object.prototype.toString.call(value)
  const mapData = new Map([
    ['[object String]', 'string'],
    ['[object Number]', 'number'],
    ['[object Boolean]', 'boolean'],
    ['[object Undefined]', 'undefined'],
    ['[object Object]', 'object'],
    ['[object Array]', 'array'],
    ['[object Null]', 'null'],
    ['[object RegExp]', 'RegExp'],
    ['[object Symbol]', 'symbol'],
    ['[object JSON]', 'json'],
    ['[object Math]', 'math'],
    ['[object File]', 'file'],
    ['[object Blob]', 'blob'],
    ['[object ArrayBuffer]', 'arrayBuffer'],
    ['default', 'object'],
  ])
  return mapData.get(valueType) || mapData.get('default')
}

export const isTheSameParentRoute = (from: any, to: any) => {
  const { matched: fromMatched } = from
  const { matched: toMatched } = to
  const fromRouteName = fromMatched[0]?.name
  const toRouteName = toMatched[0]?.name
  return fromRouteName === toRouteName
}

export const isJSONData = (data: string) => {
  try {
    JSON.parse(data)
    return Promise.resolve(true)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const spliceKeywords = (objData: Record<string, string>, keywords: Record<string, string>) => {
  let resData = objData

  const keys = Object.keys(keywords)
  if (!keys.length) return resData

  keys.forEach((key) => {
    const value = keywords[key]
    if (value) {
      resData = {
        ...resData,
        [key]: value,
      }
    }
  })
  return resData
}

/**
 * stringLen: the length of string to generate
 */
export const randomString = (stringLen: number): string => {
  // If no parameter, a 1 length string  will be generated by default
  const len = stringLen || 1

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLen = characters.length
  let str = ''

  for (let i = 0; i < len; i += 1) {
    const randomIndex = Math.floor(Math.random() * charactersLen)
    str += characters.charAt(randomIndex)
  }

  return str
}

export const encryptStr = (str: string): string => {
  const utf8Str = CryptoJS.enc.Utf8.parse(str)
  const kStr = '0000neuronex0000'
  const encrypted = CryptoJS.AES.encrypt(utf8Str, kStr, {
    iv: kStr,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}
