import './public-path.js'
import { createApp } from 'vue'
import EmqxUI from '@emqx/emqx-ui'
import mainApp from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isShowEkuiper } from '@/config/index'
import { isSubApp, replacePath } from '@/utils/forToBeSubApp'
import routes, { ekuiperRoute } from './router/routes'
import action from '@/utils/action'

import '@emqx/emqx-ui/lib/styles/index.scss'
import '@/styles/emqx-ui-variables.scss'
import '@/styles/base.scss'
import '@/styles/reset.scss'
import '@/styles/colors.scss'
import '@/styles/common.scss'
import '@/assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont'
import '@/styles/kuiper.scss'

let instance: any = null
const neuronRoutes = isShowEkuiper ? routes.concat(ekuiperRoute) : routes
let routerForConfig: any = router
const containerID = '#neuron-dashboard'
let appContainer: any = containerID

const render = () => {
  instance = createApp(mainApp)
  instance.use(i18n).use(EmqxUI).use(store).use(routerForConfig).mount(appContainer)
}

if (!isSubApp) {
  render()
}

function setSomeDataAndRender(props: any) {
  const {
    container: containerCustom,
    lang,
    orgId,
    projectId,
    serviceId,
    version,
    token,
    tabsNeedBeHidden,
    isAdmin,
    actions,
  } = props
  action.setActions(actions)

  // 处理path
  const preUrl = `/neuronsub/${version}/edge/${orgId}/${projectId}/${serviceId}`
  neuronRoutes.forEach((item) => {
    if (!item.path.startsWith('/neuronsub')) {
      item.path = preUrl + item.path
      if (item.redirect) {
        item.redirect = preUrl + item.redirect
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach((children) => {
          if (children.path !== '') {
            children.path = children.path.startsWith('/')
              ? `${preUrl}${children.path}`
              : `${item.path}/${children.path}`
          } else {
            children.path = item.path
          }
        })
      }
    } else if (item.path.startsWith('/neuronsub')) {
      item.path = replacePath(item.path, version, orgId, projectId, serviceId)
      if (item.redirect) {
        item.redirect = replacePath(item.redirect.toString(), version, orgId, projectId, serviceId)
      }
      if (item.children && item.children.length > 0) {
        item.children.forEach((children) => {
          if (children.path !== '') {
            children.path = replacePath(children.path, version, orgId, projectId, serviceId)
          } else {
            children.path = item.path
          }
        })
      }
    }
  })
  if (containerCustom) {
    appContainer = containerCustom.querySelector(containerID)
  }
  if (lang) {
    i18n.global.locale.value = lang
    store.commit('SET_LANG', lang)
  }
  if (tabsNeedBeHidden) {
    store.commit('SET_HIDDEN_TAB', tabsNeedBeHidden)
  }
  if (orgId) {
    store.commit('SET_ORG_ID', orgId)
  }
  if (projectId) {
    store.commit('SET_PROJECT_ID', projectId)
  }
  if (serviceId) {
    store.commit('SET_SERVICE_ID', serviceId)
  }
  if (version) {
    store.commit('SET_VERSION', version)
  }
  if (token) {
    store.commit('SET_TOKEN', token)
  }
  if (isAdmin) {
    store.commit('SET_IS_ADMIN', isAdmin)
  }
  routerForConfig = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: neuronRoutes,
  })
  // eslint-disable-next-line consistent-return
  routerForConfig.beforeEach((to: any, from: any, next: () => void) => {
    if (window.__POWERED_BY_QIANKUN__) {
      next()
    }
  })
  render()
}

export async function bootstrap() {
  //
}

export async function mount(props: any) {
  setSomeDataAndRender(props)
}

export async function unmount() {
  instance.unmount()
  instance._container.innerHTML = ''
  instance = null
  routerForConfig = null
  appContainer = null
}
