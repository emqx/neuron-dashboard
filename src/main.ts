import { createApp } from 'vue'
import EmqxUI from '@emqx/emqx-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import '@emqx/emqx-ui/lib/styles/index.scss'
import '@/styles/emqx-ui-variables.scss'
import '@/styles/base.scss'
import '@/assets/fonts/iconfont.css'

createApp(App).use(EmqxUI).use(store).use(router).mount('#app')
