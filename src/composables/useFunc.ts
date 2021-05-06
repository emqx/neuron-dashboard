import { readonly } from '@vue/reactivity'

interface FuncModel {
  getObject: 46
  searchObject: 52
}

type FuncName = 'getObject' | 'searchObject'

export default function useFunc(funcName: FuncName): number {
  const funcMap: FuncModel = readonly({
    getObject: 46,
    searchObject: 52,
  })
  return funcMap[funcName]
}
