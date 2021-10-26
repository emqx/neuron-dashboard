import { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { DriverDirection } from '@/types/enums'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/overview',
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
        path: '/configuration/north-driver/config/:nodeID',
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
        path: '/configuration/south-driver/:nodeID',
        name: 'SouthDriverGroup',
        component: () => import('@/views/config/southDriver/Group.vue'),
      },
      {
        path: '/configuration/south-driver/config/:nodeID',
        name: 'SouthDriverConfig',
        component: () => import('@/views/config/NodeConfig.vue'),
        props: {
          direction: DriverDirection.South,
        },
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
      /* ADMIN */
      {
        path: '/admin/account-settings',
        name: 'AccountSettings',
        meta: { requireAuth: true },
        component: () => import('@/views/admin/AccountSetting.vue'),
      },
      /* MONITORING */
      {
        path: '/monitoring/data',
        name: 'DataMonitoring',
        component: () => import('@/views/monitoring/DataMonitoring.vue'),
      },
      {
        path: '/monitoring/log',
        name: 'Log',
        component: () => import('@/views/monitoring/Log.vue'),
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
