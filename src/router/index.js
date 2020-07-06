import Vue from 'vue'
import Router from 'vue-router'
import invisible from './invisible'

import * as menu from './menu'

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [
    ...menu.router,
    ...invisible
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user && user.name) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next()
  }
})

export default router
