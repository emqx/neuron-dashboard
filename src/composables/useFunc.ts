import { readonly } from '@vue/reactivity'

interface FuncModel {
  getObject: 46
  searchObject: 52
  getDrivers: 23
}

type FuncName = 'getObject' | 'searchObject' | 'getDrivers'

export default function useFunc(funcName: FuncName): number {
  const funcMap: FuncModel = readonly({
    getObject: 46,
    searchObject: 52,
    getDrivers: 23,
  })
  return funcMap[funcName]
}
