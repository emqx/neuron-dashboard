// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import EmqxUI from '@emqx/emqx-ui'
import '@emqx/emqx-ui/lib/styles/index.scss'

import { locale } from 'element-plus'
import zhLang from 'element-plus/lib/locale/lang/zh-cn'
import enLang from 'element-plus/lib/locale/lang/en'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/style/theme/element-variables.scss'
import './assets/style/theme/vxe-theme.scss'
import lang from './i18n'
import 'xe-utils'
import VXETable from 'vxe-table'

// vuex
import store from '@/store/index.js'

// 全局注册的组件
// import '@/components'

// 插件
import '@/plugin/register'

// i18n
const i18n = createI18n({
  locale: store.state.base.lang,
  messages: lang,
})
if (store.state.base.lang === 'zh') {
  locale(zhLang)
} else {
  locale(enLang)
}

// Element
// ElDialog.closeOnClickModal.default = false

const app = createApp(App)

app
  .use(EmqxUI)
  .use(store)
  .use(router)
  .use(i18n)
  .use(VXETable)
  .mount('#app')
