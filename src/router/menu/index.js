import Setup from './_Configuration'
import Status from './_Status'
import user from './_Administration'

// 菜单
export const menu = [
  Status, Setup, user
]

// 路由
export const router = [
  {
    path: '/',
    name: 'index',
    meta: {
      requiresAuth: true
    },
    redirect: {
      name: 'Status-dataMonitoring'
    }
  },
  Status,
  Setup,
  user,
  {
    path: '*',
    redirect: {
      name: 'index'
    }
  }
]
