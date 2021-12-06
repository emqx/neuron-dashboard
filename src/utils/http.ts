import axios, { AxiosError } from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'
import { ERROR_CODE_MSG_MAP } from './constants'
import store from '@/store/index'

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
    EmqxMessage.error(`Error (code: ${response.data.error}): ${ERROR_CODE_MSG_MAP[response.data.error] || 'unknown'}`)
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
        Authorization: 'Bearer ' + store.state.token,
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      store.commit('LOGOUT')
      router.push({ name: 'Login' })
    } else {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
