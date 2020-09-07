// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/theme/element-variables.scss'
import './assets/style/fixed/element.scss'
import lang from './i18n'

// vuex
import store from '@/store/index.js'

// 全局注册的组件
import '@/components'

// 插件
import '@/plugin/register'

// i18n
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.base.lang,
  messages: lang,
})

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
      // eslint-disable-next-line no-param-reassign
      options = {
        message: options,
        duration: 6000,
      }
    }
    options.type = type
    return ElementUI.Message(options)
  }
})

Vue.prototype.$openMessage = $message

ElementLocale.i18n((key, value) => i18n.t(key, value))

Vue.use(ElementUI, { ElementLocale })

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV === 'development'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
