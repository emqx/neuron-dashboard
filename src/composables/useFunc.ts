import { readonly } from '@vue/reactivity'

interface FuncModel {
  getObject: 46
}

type FuncName = 'getObject'

export default function useFunc(funcName: FuncName): number {
  const funcMap: FuncModel = readonly({
    getObject: 46,
  })
  return funcMap[funcName]
}
