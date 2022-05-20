import { loadMicroApp } from 'qiankun'
import store from '@/store/index'

export const handleEKuiper = async () => {
  // handle the situation that link jumps inside eKuiper
  if (store.state.subAppInstances.ekuiper) {
    return
  }
  try {
    store.commit('SET_SUB_APP_LOADING', false)
    await new Promise((resolve) => window.setTimeout(resolve, 100))
    const app = loadMicroApp({
      name: 'ekuiper',
      entry: '//localhost:3002',
      container: '#page-content',
      props: {
        lang: store.state.lang,
        hideTabBarInNodePage: true,
        tabsNeedBeHidden: ['extension.plugins'],
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
