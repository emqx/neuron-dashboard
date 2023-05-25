import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { ekuiperRoute } from './routes'
import store from '@/store/index'
import { handleEKuiper, isKuiperPath, isExitEKuiper, handleExitEKuiper } from '@/utils/forEKuiper'
import { isShowEkuiper } from '@/config/index'

const routers = isShowEkuiper ? routes.concat(ekuiperRoute) : routes

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: routers,
})

router.beforeEach((to, from, next) => {
  // cancel all requests， when leaving the router
  const axiosCancels = store.state.axiosPromiseCancel
  if (axiosCancels.length) {
    axiosCancels.forEach(async (e) => e && e())
    store.commit('SET_AXIOS_PROMISE_CANCEL', [])
  }

  if (!store.state.token && to.name !== 'Login') {
    next({ name: 'Login' })
  } else if (store.state.token && to.name === 'Login') {
    next('/')
  } else if (isKuiperPath(to.path)) {
    // TODO: why trigger twice there, find the reason
    if (to.path === from.path) {
      return
    }
    next()
    handleEKuiper()
  } else if (isExitEKuiper(from.path, to.path)) {
    handleExitEKuiper()
    next()
  } else {
    next()
  }
  window.scroll(0, 0)
})

export default router
