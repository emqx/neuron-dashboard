import axios, { AxiosError } from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'
import store from '@/store/index'
import { LOGIN_ROUTE_NAME } from '@/router/routes'
import { countBaseURL, popUpErrorMessage } from './utils'

const baseURL = countBaseURL()
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
    popUpErrorMessage(response.data.error)
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
  (response) => {
    if (response.status !== 200) {
      popUpErrorMessage(response.data.error)
    } else if (response.data?.error) {
      if (!(response.config as any)._handleCustomError) {
        popUpErrorMessage(response.data.error)
      }
      return Promise.reject(response)
    }
    return response
  },
  (error) => {
    // when requesting login, the interface will return 401 if the password or username is error, handle it
    const isInLoginPage = router.currentRoute?.value?.name === LOGIN_ROUTE_NAME
    if ((error.response.status === 401 && !isInLoginPage) || error.response.status === 403) {
      store.commit('LOGOUT')
      router.push({ name: 'Login' })
    } else if (!error.config._handleErrorSelf) {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
