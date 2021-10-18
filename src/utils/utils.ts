import i18n from '@/i18n/index'

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
    global: { tc },
  } = i18n
  const local = i18n.global.locale
  let targetStr = target
  if (local === 'en') {
    targetStr = firstLowerCase(targetStr)
  }
  if (type === 'input') {
    return tc('common.inputRequired') + targetStr
  }
  return tc('common.selectRequired') + targetStr
}

export const paginate = (data: Array<any>, pageSize: number, pageNumber: number) => {
  return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}
