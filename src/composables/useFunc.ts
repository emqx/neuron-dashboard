import { readonly } from '@vue/reactivity'

interface FuncModel {
  getObject: 46
  setObject: 41
  searchObject: 52
  getDrivers: 23
  readLogs: 83
  getDeviceList: 26
  getDriverParams: 24
  switchLogs: 84
  instanceInformation: 73
}

type FuncName = keyof FuncModel

export default function useFunc(funcName: FuncName): number {
  const funcMap: FuncModel = readonly({
    getObject: 46,
    setObject: 41,
    searchObject: 52,
    getDrivers: 23,
    readLogs: 83,
    getDeviceList: 26,
    getDriverParams: 24,
    switchLogs: 84,
    instanceInformation: 73,
  })
  return funcMap[funcName]
}