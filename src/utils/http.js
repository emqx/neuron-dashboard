import axios from 'axios'
import { EmqxMessage } from '@emqx/emqx-ui'
import router from '@/router/index.js'

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
    // TODO: add i18n
    'Content-Language': 'zh_CN',
  },
  baseURL: '/device-manager-services/v0',
  timeout: 100000,
}

Object.assign(axios.defaults, options)

const handleError = async error => {
  const { response } = error
  if (response.data) {
    EmqxMessage.error(`${response.data}`)
  } else {
    EmqxMessage.error(error.toString())
  }
  return Promise.reject(error)
}

const handleCustomError = data => {
  // if (data.code === 16001) {
  //   router.push({ name: 'login' })
  //   return
  // }
  EmqxMessage.error(`${data.message}`)
}

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error),
)

axios.interceptors.response.use(
  response => {
    if (response.request.responseType === 'blob') {
      return response
    }
    // for neuron & kuiper
    if (response.config.url && response.config.url.indexOf('/neuron') > -1) {
      if (response.data.code === 16001) {
        handleCustomError(response.data)
      }
      return response
    }
    if (response.data.code !== 0) {
      handleCustomError(response.data)
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      router.push({ name: 'login' })
    } else {
      handleError(error)
    }
    return Promise.reject(error)
  },
)

export default axios
