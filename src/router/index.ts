import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '@/store/index'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
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
