import { formatName } from '@/utils'

const meta = {
  requiresAuth: true,
}

const moduleName = 'Administration'

const maker = (path, hide) => {
  return {
    path,
    name: `${moduleName}-${path}`,
    meta: {
      ...meta,
      hide,
    },
    title: formatName(path),
    component: () => import(`@/pages/menus/${moduleName}/${path}.vue`),
  }
}

export default {
  title: formatName(moduleName),
  path: `/:serviceId/${moduleName}`,
  name: moduleName,
  component: () => import('@/components/core/MainLayout/index.vue'),
  meta,
  redirect: {
    name: `${moduleName}-userAdministration`,
  },
  children: [maker('agentGroup')],
}
