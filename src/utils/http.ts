import axios, { AxiosError } from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'
import store from '@/store/index'
import i18n from '@/i18n/index'
import { ERROR_CODE_ARR } from './constants'
import { LOGIN_ROUTE_NAME } from '@/router/routes'

const { host, protocol } = window.location
const serverAddress = host.split(':').length > 1 ? `${host.split(':')[0]}:7001` : host
const { NODE_ENV } = process.env
const baseURL = `${protocol}//${NODE_ENV === 'development' ? 'localhost:3003' : serverAddress}/api/v2`
const option = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
  baseURL,
  timeout: 10000,
}

Object.assign(axios.defaults, option)

export const handleError = (error: AxiosError) => {
  const { response } = error
  if (response?.data?.error) {
    const hasErrorMsg = ERROR_CODE_ARR.includes(response?.data?.error)
    EmqxMessage.error(
      `Error (code: ${response.data.error}): ${
        hasErrorMsg ? i18n.global.t(`error.${response.data.error}`) : 'unknown'
      }`,
    )
  } else if (response?.data) {
    EmqxMessage.error(`${JSON.stringify(response.data)}`)
  } else {
    EmqxMessage.error(error.toString())
  }
}

axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${store.state.token}`,
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // when requesting login, the interface will return 401 if the password or username is error, handle it
    const isInLoginPage = router.currentRoute?.value?.name === LOGIN_ROUTE_NAME
    if ((error.response.status === 401 && !isInLoginPage) || error.response.status === 403) {
      store.commit('LOGOUT')
      router.push({ name: 'Login' })
    } else {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
