import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  window.scroll(0, 0)
  if (to.meta.requireAuth) {
    const userString = sessionStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      if (user.name) {
        next()
      } else {
        next({
          name: 'Login',
        })
      }
    } else {
      next({
        name: 'Login',
      })
    }
  } else {
    next()
  }
})

export default router
