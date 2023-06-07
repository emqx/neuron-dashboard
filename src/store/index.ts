import { createStore } from 'vuex'
import { getToken, setToken, clearLocalStorage } from '@/utils/user'
import { DEFAULT_LANG } from '@/utils/constants'

interface paginationInfo {
  pageNum: number
  pageSize: number
  total: number
}
interface NodeGroup {
  node: string
  groupName: string
}
interface State {
  lang: string
  token: string
  isSubAppLoading: boolean
  subAppInstances: Record<string, any>
  listShowType: string
  paginationData: paginationInfo
  nodeGroupMemory: NodeGroup
  axiosPromiseCancel: Array<any>
}

const checkLanguage = (lang: string) => (['en', 'zh'].includes(lang) ? lang : '')
const getDefaultLanguage = () => {
  const localStorageLanguage = checkLanguage(localStorage.getItem('language') || '')
  return localStorageLanguage || DEFAULT_LANG
}

export default createStore<State>({
  state() {
    return {
      lang: getDefaultLanguage(),
      token: getToken() ?? '',
      isSubAppLoading: false,
      subAppInstances: {
        ekuiper: undefined,
      },
      listShowType: 'card',
      paginationData: {
        pageNum: 1,
        pageSize: 30,
        total: 0,
      },
      nodeGroupMemory: {
        node: '',
        groupName: '',
      },
      axiosPromiseCancel: [],
    }
  },

  mutations: {
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
      clearLocalStorage()
    },
    SET_SUB_APP_INSTANCE(state, payload: { key: string; instance: any }) {
      state.subAppInstances[payload.key] = payload.instance
    },
    SET_SUB_APP_LOADING(state, payload: boolean) {
      state.isSubAppLoading = payload
    },
    SET_LIST_SHOW_TYPE(state, type: string) {
      state.listShowType = type
    },
    SET_PAGINATION(state, data: paginationInfo) {
      state.paginationData = data
    },
    SET_NODE_GROUP(state, data: NodeGroup) {
      state.nodeGroupMemory = data
    },
    ADD_AXIOS_PROMISE_CANCEL(state, data: any) {
      state.axiosPromiseCancel.push(data)
    },
    SET_AXIOS_PROMISE_CANCEL(state, data: Array<any>) {
      state.axiosPromiseCancel = data
    },
  },
})
