import { loadMicroApp } from 'qiankun'
import store from '@/store/index'

const productionEntry = `${window.location.origin}/ekuiper/`
const kuiperEntry: Record<string, string> = {
  development: '//localhost:3002/ekuiper/',
  production: productionEntry,
}
const defaultEnv = 'production'

export const handleEKuiper = async () => {
  if (store.state.subAppInstances.ekuiper) {
    return
  }
  try {
    store.commit('SET_SUB_APP_LOADING', false)
    await new Promise((resolve) => window.setTimeout(resolve, 100))
    const env = process.env.NODE_ENV || defaultEnv
    const app = loadMicroApp({
      name: 'ekuiper',
      entry: kuiperEntry[env] || productionEntry,
      container: '#page-content',
      props: {
        lang: store.state.lang,
        hideTabBarInNodePage: true,
        token: store.state.token,
      },
    })
    store.commit('SET_SUB_APP_INSTANCE', { key: 'ekuiper', instance: app })
    await app.loadPromise
  } catch (error) {
    //
  } finally {
    store.commit('SET_SUB_APP_LOADING', false)
  }
}

export const destroyEKuiper = () => {
  store.state.subAppInstances.ekuiper?.unmount()
  store.commit('SET_SUB_APP_INSTANCE', { key: 'ekuiper', instance: null })
}

export const isKuiperPath = (toPath: string) => {
  return /^\/ekuiper/.test(toPath)
}

export const isExitEKuiper = (fromPath: string, toPath: string) => {
  return isKuiperPath(fromPath) && !isKuiperPath(toPath)
}
