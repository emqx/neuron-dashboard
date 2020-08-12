// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/theme/element-variables.scss'
import './assets/style/fixed/element.scss'

// vuex
import store from '@/store/index.js'

// 全局注册的组件
import '@/components'

// 插件
import '@/plugin/register'

// Element
ElementUI.Dialog.props.closeOnClickModal.default = false
const $message = (options) => {
  return ElementUI.Message({
    ...options,
    duration: 6000,
  })
}
;['success', 'warning', 'info', 'error'].forEach((type) => {
  $message[type] = (options) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        duration: 6000,
      }
    }
    options.type = type
    return ElementUI.Message(options)
  }
})
Vue.use(ElementUI, { locale })
Vue.prototype.$openMessage = $message

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV === 'development'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
