import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import store from '@/store/index'
import { loadMicroApp } from 'qiankun'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

const handleEKuiper = async () => {
  await new Promise((resolve) => window.setTimeout(resolve, 100))
  loadMicroApp({
    name: 'ekuiper',
    entry: '//localhost:3002',
    container: '#page-content',
  })
}

router.beforeEach((to, from, next) => {
  if (!store.state.token && to.name !== 'Login') {
    next({ name: 'Login' })
  } else if (store.state.token && to.name === 'Login') {
    next('/')
  } else if (/^\/ekuiper/.test(to.path)) {
    next()
    handleEKuiper()
  } else {
    next()
  }
  window.scroll(0, 0)
})

export default router
