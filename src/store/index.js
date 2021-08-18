import { createStore } from 'vuex'

import menu from './modules/menu'
import base from './modules/base'
import Device from './modules/Device'
import SetUpData from './modules/SetUpData'
import Status from './modules/Status'

export default createStore({
  modules: {
    menu,
    base,
    Device,
    SetUpData,
    Status,
  },
})
