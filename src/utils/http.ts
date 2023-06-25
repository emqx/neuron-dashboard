import type { AxiosError } from 'axios'
import axios from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/'
import store from '@/store/index'
import { LOGIN_ROUTE_NAME, CHANGE_PW_ROUTE_NAME } from '@/router/routes'
import { popUpErrorMessage, dataType, isJSONData } from './utils'
import asSubAppAction from './asSubAppAction'
import { IntegratePublicPath, getIntegratedAPI } from '@/utils/forToBeSubApp'

// const baseURL = countBaseURL()
const option = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  },
  // baseURL,
  timeout: 10000,
}

Object.assign(axios.defaults, option)

export const handleBlobError = async (data: Blob, statusInfo: { status: number; statusText: string }) => {
  const { statusText, status } = statusInfo
  const statusMsg = statusText || status

  const reader = new FileReader()
  reader.readAsText(data, 'utf-8')
  reader.onload = () => {
    const msg = reader.result || ''

    if (typeof msg === 'string') {
      isJSONData(msg)
        .then(() => {
          const jsonText = JSON.parse(reader.result as string)
          const { error: errorNumber } = jsonText
          if (errorNumber) {
            popUpErrorMessage(errorNumber)
          } else {
            EmqxMessage.error(statusMsg)
          }
        })
        .catch(() => {
          EmqxMessage.error(statusMsg)
        })
    } else {
      EmqxMessage.error(statusMsg)
    }
  }
}

export const handleError = (error: AxiosError) => {
  const { response, message } = error

  if (response?.data?.error) {
    popUpErrorMessage(response.data.error)
  } else if (response?.data) {
    const { statusText, status } = response.data

    const newStatusText = statusText || response?.statusText || message
    const newStatus = status || response?.status

    if (dataType(response.data) === 'blob') {
      handleBlobError(response.data, { statusText: newStatusText, status: newStatus })
    } else {
      const msg = newStatusText || message || newStatus
      EmqxMessage.error(msg)
    }
  } else {
    // void timeout
    const msg = response?.statusText || message || response?.status || 'unknow'
    EmqxMessage.error(msg)
  }
}

const { CancelToken } = axios
axios.interceptors.request.use(
  (config) => {
    if (store.state.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${store.state.token}`,
      }
    }

    config.cancelToken = new CancelToken((cancel: any) => {
      store.commit('ADD_AXIOS_PROMISE_CANCEL', cancel)
    })

    // For ECP
    const { serviceId } = store.state
    const { url, isStatic } = config as any

    const isIncludesTemplate = url?.includes('template')
    const isIncludesEdgeservice = url?.includes('edgeservice')
    const isIncludesIntegration = url?.includes('integration')
    if (
      (!isIncludesTemplate && !isIncludesEdgeservice) ||
      (isIncludesTemplate && !isStatic && !isIncludesIntegration)
    ) {
      config.url = getIntegratedAPI(serviceId, url)
    } else if (isIncludesTemplate && isStatic && !isIncludesIntegration) {
      // fixed the conflict when `downloading` tempate file in the group and `template` function
      config.url = `${IntegratePublicPath}${config.url}`
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
    const { response, message } = error

    // when requesting login, the interface will return 401 if the password or username is error, handle it
    const whiteRoutes = [LOGIN_ROUTE_NAME, CHANGE_PW_ROUTE_NAME]

    const currrentRouteName: any = router.currentRoute?.value?.name || ''
    const isInLoginPage = whiteRoutes.includes(currrentRouteName)

    if ((error?.response?.status === 401 && !isInLoginPage) || error?.response?.status === 403) {
      asSubAppAction.setGlobalState({
        refreshToken: true,
      })
    } else if (axios.isCancel(error)) {
      // Finalizing the promise chain，will not trigger error messages
      return Promise.resolve()
    } else if (response?.data?.code) {
      // for ecp
      EmqxMessage.error(response?.data?.message || message)
    } else if (!error?.config?._handleErrorSelf) {
      handleError(error)
    }

    return Promise.reject(error)
  },
)

export default axios
