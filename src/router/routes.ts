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
      {
        path: '/overview',
        name: 'Overview',
        meta: { requireAuth: true },
        component: () => import('@/views/overview/Index.vue'),
      },
      /* CONFIG */
      {
        path: '/configuration/north-driver',
        name: 'NorthDriver',
        component: () => import('@/views/config/northDriver/Index.vue'),
      },
      {
        path: '/configuration/north-driver/:nodeID',
        name: 'NorthDriverGroup',
        component: () => import('@/views/config/northDriver/Group.vue'),
      },
      {
        path: '/configuration/south-driver',
        name: 'SouthDriver',
        component: () => import('@/views/config/southDriver/Index.vue'),
      },
      {
        path: '/configuration/south-driver/:nodeID',
        name: 'SouthDriverGroup',
        component: () => import('@/views/config/southDriver/Group.vue'),
      },
      {
        path: '/configuration/south-driver/:nodeID/:group',
        name: 'SouthDriverGroupTag',
        component: () => import('@/views/config/southDriver/Tag.vue'),
      },
      {
        path: '/configuration/south-driver/:nodeID/:group/add',
        name: 'SouthDriverGroupAddTag',
        component: () => import('@/views/config/southDriver/AddTag.vue'),
      },
      {
        path: '/configuration/plugin',
        name: 'PluginManagement',
        component: () => import('@/views/config/plugin/Index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

export default routes
