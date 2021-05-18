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
        path: '/configuration/object_setup',
        name: 'ObjectSetup',
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
