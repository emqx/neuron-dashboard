import invisible from './invisible'
import { createRouter, createWebHashHistory } from 'vue-router'
import * as menu from './menu'

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes: [...menu.router, ...invisible],
})

export default router
