import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { DriverDirection } from '@/types/enums'

export const LOGIN_ROUTE_NAME = 'Login'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/configuration/north-driver',
    component: Home,
    children: [
      // {
      //   path: '/overview',
      //   name: 'Overview',
      //   meta: { requireAuth: true },
      //   component: () => import('@/views/overview/Index.vue'),
      // },
      /* MONITORING */
      {
        path: '/monitoring/data',
        name: 'DataMonitoring',
        component: () => import('@/views/monitoring/DataMonitoring.vue'),
      },
      /* CONFIG */
      {
        path: '/configuration/north-driver',
        name: 'NorthDriver',
        component: () => import('@/views/config/northDriver/Index.vue'),
      },
      {
        path: '/configuration/north-driver/:node',
        name: 'NorthDriverGroup',
        component: () => import('@/views/config/northDriver/Group.vue'),
      },
      {
        path: '/configuration/north-driver/config/:node',
        name: 'NorthDriverConfig',
        component: () => import('@/views/config/NodeConfig.vue'),
        props: {
          direction: DriverDirection.North,
        },
      },
      {
        path: '/configuration/south-driver',
        name: 'SouthDriver',
        component: () => import('@/views/config/southDriver/Index.vue'),
      },
      {
        path: '/configuration/south-driver/:node',
        name: 'SouthDriverGroup',
        component: () => import('@/views/config/southDriver/Group.vue'),
      },
      {
        path: '/configuration/south-driver/config/:node',
        name: 'SouthDriverConfig',
        component: () => import('@/views/config/NodeConfig.vue'),
        props: {
          direction: DriverDirection.South,
        },
      },
      {
        path: '/configuration/south-driver/:node/:group',
        name: 'SouthDriverGroupTag',
        component: () => import('@/views/config/southDriver/Tag.vue'),
      },
      {
        path: '/configuration/south-driver/:node/:group/add',
        name: 'SouthDriverGroupAddTag',
        component: () => import('@/views/config/southDriver/AddTag.vue'),
      },
      {
        path: '/configuration/plugin',
        name: 'PluginManagement',
        component: () => import('@/views/config/plugin/Index.vue'),
      },
      /* ADMIN */
      {
        path: '/admin/account-settings',
        name: 'AccountSettings',
        meta: { requireAuth: true },
        component: () => import('@/views/admin/AccountSetting.vue'),
      },
      {
        path: '/admin/log',
        name: 'Log',
        meta: { requireAuth: true },
        component: () => import('@/views/admin/Log.vue'),
      },
      /* License */
      {
        path: '/license',
        name: 'License',
        meta: { requireAuth: true },
        component: () => import('@/views/about/License.vue'),
      },
      /* About */
      {
        path: '/about',
        name: 'About',
        meta: { requireAuth: true },
        component: () => import('@/views/about/About.vue'),
      },
    ],
  },
  {
    path: '/:ekuiper(.*)*',
    component: Home,
  },
  {
    path: '/login',
    name: LOGIN_ROUTE_NAME,
    component: Login,
  },
]

export default routes
