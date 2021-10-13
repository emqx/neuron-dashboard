import { Status, ObjdModel, ChnlModel } from '@/types/neuron'
import { createStore } from 'vuex'

interface State {
  status: Status | null
  objd: Array<ObjdModel>
  chnl: Array<ChnlModel>
  lang: string
}

const checkLanguage = (lang: string) => (['en', 'zh'].includes(lang) ? lang : '')
const getDefaultLanguage = () => {
  const browserLanguage = checkLanguage(navigator.language.substr(0, 2))
  const localStorageLanguage = checkLanguage(localStorage.getItem('language') || '')
  return localStorageLanguage || browserLanguage || 'zh'
}

export default createStore<State>({
  state() {
    return {
      status: null,
      objd: [],
      chnl: [],
      lang: getDefaultLanguage(),
    }
  },
  mutations: {
    SET_STATUS(state: State, payload: Status) {
      state.status = payload
    },
    SET_OBJD(state: State, payload: ObjdModel[]) {
      state.objd = payload
    },
    SET_DRIVER_DATA(state: State, payload: ChnlModel[]) {
      state.chnl = payload
    },
    SET_LANG(state: State, payload: string) {
      state.lang = payload
      localStorage.setItem('language', payload)
    },
  },
  getters: {
    deviceObj: (state) => {
      const { chnl } = state
      if (chnl.length && chnl[0]) {
        return state.chnl[0].chdv
      }
      return ''
    },
  },
})
