import { createStore } from 'vuex'
import { getToken, setToken, clearLocalStorage, getNodeGroupData, setUserRole, getUserRole } from '@/utils/user'
import { DEFAULT_LANG } from '@/utils/constants'
import { isSubApp } from '@/utils/forToBeSubApp'

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
  username: string
  lang: string
  token: string
  isSubAppLoading: boolean
  subAppInstances: Record<string, any>
  listShowType: string
  paginationData: paginationInfo
  nodeGroupMemory: NodeGroup
  axiosPromiseCancel: Array<any>
  // ECP
  isSubApp: boolean
  tabsNeedBeHidden: boolean
  orgId: string
  projectId: string
  serviceId: string
  version: string
  userRole: number
}

const checkLanguage = (lang: string) => (['en', 'zh'].includes(lang) ? lang : '')
const getDefaultLanguage = () => {
  const localStorageLanguage = checkLanguage(localStorage.getItem('language') || '')
  return localStorageLanguage || DEFAULT_LANG
}

export default createStore<State>({
  state() {
    return {
      username: localStorage.getItem('username') || '',
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
      nodeGroupMemory: getNodeGroupData(),
      axiosPromiseCancel: [],

      // ECP
      isSubApp: isSubApp || false,
      tabsNeedBeHidden: false,
      orgId: '',
      projectId: '',
      serviceId: '',
      version: '',
      userRole: getUserRole() || 0, // 1: admin
    }
  },

  mutations: {
    SET_USERNAME(state: State, name: string) {
      state.username = name
      localStorage.setItem('username', name)
    },
    SET_LANG(state: State, payload: string) {
      state.lang = payload || DEFAULT_LANG
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

    // ECP
    SET_USER_ROLE(state: State, payload: number) {
      state.userRole = payload
      setUserRole(payload)
    },
    SET_HIDDEN_TAB(state: State, payload: boolean) {
      state.tabsNeedBeHidden = payload
    },
    SET_ORG_ID(state: State, payload: string) {
      state.orgId = payload
    },
    SET_PROJECT_ID(state: State, payload: string) {
      state.projectId = payload
    },
    SET_SERVICE_ID(state: State, payload: string) {
      state.serviceId = payload
    },
    SET_VERSION(state: State, payload: string) {
      state.version = payload
    },
  },
})
