import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/data',
    component: Home,
    children: [
      { path: '/data', name: 'Data', meta: { requireAuth: true }, component: () => import('@/views/data/Index.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

export default routes
