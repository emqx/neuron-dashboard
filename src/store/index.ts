import { Status, ObjdModel, ChnlModel } from '@/types/neuron'
import { createStore } from 'vuex'
import { getToken, setToken, clearToken } from '@/utils/user'

interface State {
  status: Status | null
  objd: Array<ObjdModel>
  chnl: Array<ChnlModel>
  lang: string
  token: string
  isSubAppLoading: boolean
  subAppInstances: Record<string, any>
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
      token: getToken() ?? '',
      isSubAppLoading: false,
      subAppInstances: {
        ekuiper: undefined,
      },
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
    SET_TOKEN(state: State, payload: string) {
      state.token = payload
      setToken(payload)
    },
    LOGOUT(state) {
      state.token = ''
      clearToken()
    },
    SET_SUB_APP_INSTANCE(state, payload: { key: string; instance: any }) {
      state.subAppInstances[payload.key] = payload.instance
    },
    SET_SUB_APP_LOADING(state, payload: boolean) {
      state.isSubAppLoading = payload
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
