import type { AxiosError } from 'axios'
import axios from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'
import store from '@/store/index'
import { LOGIN_ROUTE_NAME, CHANGE_PW_ROUTE_NAME } from '@/router/routes'
import { popUpErrorMessage, dataType } from './utils'
import action from './action'

// const baseURL = countBaseURL()
const option = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
  // baseURL= './',
  timeout: 10000,
}

Object.assign(axios.defaults, option)

export const handleBlobError = (data: Blob, statusInfo: { status: number; statusText: string }) => {
  const { statusText, status } = statusInfo
  const statusMsg = statusText || status

  const reader = new FileReader()
  reader.readAsText(data, 'utf-8')
  reader.onload = () => {
    const msg = reader.result || ''

    if (typeof msg === 'string') {
      const reg = /^\{[\s\S]*\}$/
      const isJSON = reg.test(msg)
      if (!isJSON) {
        const newMsg = msg || statusMsg
        EmqxMessage.error(newMsg)
        return
      }

      const jsonText = JSON.parse(reader.result as string)
      const { error: errorNumber } = jsonText
      if (errorNumber) {
        popUpErrorMessage(errorNumber)
      } else {
        EmqxMessage.error(statusMsg)
      }
    }
    // ToDo: arrayBuffer
  }
}

export const handleError = (error: any) => {
  const { response } = error

  if (response?.data?.error) {
    popUpErrorMessage(response.data.error)
  } else if (response?.data) {
    const { statusText, status } = response.data

    const newStatusText = statusText || response?.statusText
    const newStatus = status || response?.status

    if (dataType(response.data) === 'blob') {
      handleBlobError(response.data, { statusText: newStatusText, status: newStatus })
    } else {
      const msg = newStatusText || newStatus
      EmqxMessage.error(msg)
    }
  } else {
    let msg = dataType(error) === 'string' ? error : response?.statusText || response?.status
    msg = msg || 'unknow'
    EmqxMessage.error(msg)
  }
}

axios.interceptors.request.use(
  (config) => {
    const { serviceId } = store.state
    if (store.state.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${store.state.token}`,
      }
    }
    const { url } = config
    if (url?.includes('edgeservice') === false && url?.includes('template') === false) {
      config.url = `/api/edgeservice/proxy/${serviceId}/api/v2${config.url}`
    } else if (url?.includes('template') === true && url?.includes('integration') === false) {
      config.url = `/integration/neuron/v2.4.3${config.url}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => {
    const { status, data } = response
    if (status !== 200) {
      popUpErrorMessage(data.error)
    } else if (data?.error) {
      if (!(response.config as any)._handleCustomError) {
        popUpErrorMessage(data.error)
      }
      return Promise.reject(response)
    }

    return response
  },
  (error) => {
    // when requesting login, the interface will return 401 if the password or username is error, handle it
    const whiteRoutes = [LOGIN_ROUTE_NAME, CHANGE_PW_ROUTE_NAME]

    const currrentRouteName: any = router.currentRoute?.value?.name || ''
    const isInLoginPage = whiteRoutes.includes(currrentRouteName)

    if (error?.response?.status === 401 && !isInLoginPage) {
      action.setGlobalState({
        refreshToken: true,
      })
    } else if (!error.config._handleErrorSelf) {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
