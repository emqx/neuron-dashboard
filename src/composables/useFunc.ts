import { readonly } from '@vue/reactivity'

interface FuncModel {
  getObject: 46
  searchObject: 52
  getDrivers: 23
  readLogs: 83
}

type FuncName = 'getObject' | 'searchObject' | 'getDrivers' | 'readLogs'

export default function useFunc(funcName: FuncName): number {
  const funcMap: FuncModel = readonly({
    getObject: 46,
    searchObject: 52,
    getDrivers: 23,
    readLogs: 83,
  })
  return funcMap[funcName]
}
