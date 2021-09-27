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
      /* CONFIG */
      {
        path: '/configuration',
        name: 'Configuration',
        meta: { requireAuth: true },
        component: () => import('@/views/config/Index.vue'),
      },
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
        path: '/configuration/object_setup',
        name: 'ObjectSetup',
        meta: { requireAuth: true },
        component: () => import('@/views/config/ObjectSetup.vue'),
      },
      {
        path: 'configuration/object_setup/edit',
        name: 'EditObjectSetup',
        meta: { requireAuth: true },
        component: () => import('@/views/config/ObjectSetup.vue'),
      },
      {
        path: '/configuration/attr_setup',
        name: 'AttrSetup',
        meta: { requireAuth: true },
        component: () => import('@/views/config/AttrSetup.vue'),
      },
      /* LOG */
      {
        path: '/logs',
        name: 'Logs',
        meta: { requireAuth: true },
        component: () => import('@/views/logs/LogData.vue'),
      },
      {
        path: '/logs_switch',
        name: 'LogsSwitch',
        meta: { requireAuth: true },
        component: () => import('@/views/logs/LogSwitch.vue'),
      },
      /* AGENT */
      {
        path: '/agent_group',
        name: 'AgentGroup',
        meta: { requireAuth: true },
        component: () => import('@/views/agentGroup/AgentGroup.vue'),
      },
      {
        path: '/current_alarms',
        name: 'CurrentAlarms',
        meta: { requireAuth: true },
        component: () => import('@/views/alarms/CurrentAlarms.vue'),
      },
      {
        path: '/historical_alarms',
        name: 'HistoricalAlarms',
        meta: { requireAuth: true },
        component: () => import('@/views/alarms/HistoricalAlarms.vue'),
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
