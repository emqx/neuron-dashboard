import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { LOGIN_ROUTE_NAME } from './routes'
import store from '@/store/index'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // cancel all requests， when leaving the router
  const axiosCancels = store.state.axiosPromiseCancel

  if (to.path === from.path || from.name === LOGIN_ROUTE_NAME) {
    store.commit('SET_AXIOS_PROMISE_CANCEL', [])
  } else if (axiosCancels.length) {
    axiosCancels.forEach(async (e) => e && e())
    store.commit('SET_AXIOS_PROMISE_CANCEL', [])
  }

  if (!store.state.token && to.name !== 'Login') {
    next({ name: 'Login' })
  } else if (store.state.token && to.name === 'Login') {
    next('/')
  } else {
    next()
  }
  window.scroll(0, 0)
})

export default router
