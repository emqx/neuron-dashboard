import { loadMicroApp } from 'qiankun'
import store from '@/store/index'

export const handleEKuiper = async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 100))
  const app = loadMicroApp({
    name: 'ekuiper',
    entry: '//localhost:3002',
    container: '#page-content',
  })
  store.commit('SET_SUB_APP_INSTANCE', { key: 'ekuiper', instance: app })
}

export const destroyEKuiper = () => {
  store.state.subAppInstances.ekuiper?.unmount()
}

export const isKuiperPath = (toPath: string) => {
  return /^\/ekuiper/.test(toPath)
}

export const isExitEKuiper = (fromPath: string, toPath: string) => {
  return isKuiperPath(fromPath) && !isKuiperPath(toPath)
}
