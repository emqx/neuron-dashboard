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

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV === 'development'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
