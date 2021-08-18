import invisible from './invisible'
import { createRouter, createWebHistory } from 'vue-router'

import * as menu from './menu'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [...menu.router, ...invisible],
})

export default router
