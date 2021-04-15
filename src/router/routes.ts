import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/data',
    component: Home,
    children: [{ path: '/data', name: 'Data', component: () => import('@/views/data/Index.vue') }],
  },
]

export default routes
