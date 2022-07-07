import { loadMicroApp } from 'qiankun'
import store from '@/store/index'

// ❗️If you are developing and debugging ekuiper, please replace this with the address of ekuiper
const kuiperEntry = `${window.location.origin}/ekuiper/`
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
      entry: kuiperEntry,
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

const removeAllIViewEle = () => {
  const elements = Array.from(document.querySelectorAll('body > [class^="ivu"]'))
  elements.forEach((item) => {
    item.remove()
  })
}

export const handleExitEKuiper = async () => {
  destroyEKuiper()
  removeAllIViewEle()
}

export const destroyEKuiper = () => {
  store.state.subAppInstances.ekuiper?.unmount()
  store.commit('SET_SUB_APP_INSTANCE', { key: 'ekuiper', instance: null })
}

export const isKuiperPath = (toPath: string) => /^\/ekuiper/.test(toPath)

export const isExitEKuiper = (fromPath: string, toPath: string) => isKuiperPath(fromPath) && !isKuiperPath(toPath)
