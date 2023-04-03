import { loadMicroApp } from 'qiankun'
import store from '@/store/index'

// ❗️If you are developing and debugging ekuiper, please replace this with the address of ekuiper
const { origin, pathname } = window.location
const kuiperEntry = pathname === '/' ? `${origin}/ekuiper/` : `${origin}${pathname}/ekuiper/` // production
// const kuiperEntry = pathname === '/' ? `http://localhost:3002/ekuiper/` : `http://localhost:3002${pathname}ekuiper/` // dev

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
export const destroyEKuiper = () => {
  // eslint-disable-next-line no-unused-expressions
  store.state.subAppInstances.ekuiper?.unmount()
  store.commit('SET_SUB_APP_INSTANCE', { key: 'ekuiper', instance: null })
}

export const handleExitEKuiper = async () => {
  destroyEKuiper()
  removeAllIViewEle()
}

export const isKuiperPath = (toPath: string) => {
  return /^\/ekuiper/.test(toPath)
}

export const isExitEKuiper = (fromPath: string, toPath: string) => {
  return isKuiperPath(fromPath) && !isKuiperPath(toPath)
}
