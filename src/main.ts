import { createApp } from 'vue'
import EmqxUI from '@emqx/emqx-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import websocket from './plugins/ws/index'
import VXETable from './plugins/vxeTable'

import '@emqx/emqx-ui/lib/styles/index.scss'
import '@/styles/emqx-ui-variables.scss'
import '@/styles/base.scss'
import '@/styles/reset.scss'
import '@/styles/colors.scss'
import '@/assets/fonts/iconfont.css'
import '@/styles/vxe-theme.scss'

createApp(App).use(i18n).use(websocket).use(EmqxUI).use(store).use(router).use(VXETable).mount('#app')
