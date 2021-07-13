console.log(process.env.VUE_APP_HOST)
const { VUE_APP_HOST } = process.env
const { protocol, hostname, port } = window.location
const wsProtocol = protocol === 'http:' ? 'ws' : 'wss'
let serverBaseUrl = `${wsProtocol}://${hostname}:${port}/`
if (VUE_APP_HOST) {
  serverBaseUrl = `${wsProtocol}://${VUE_APP_HOST}`
}
console.log(serverBaseUrl)
const config = {
  isDevelopment: false,
  isCROS: false,
  // follow will be enabled when isCROS
  CROS: {
    CSRFTokenRequired: true,
    updateCSRFTokenIn: 5 * 60 * 1000, // ms
  },
  clientBaseUrl: '/',
  clientLoginUrl: null,
}
switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(config, {
      serverBaseUrl,
    })
    break
  case 'development':
    Object.assign(config, {
      isDevelopment: true,
      serverBaseUrl,
    })
    break
}
export default config
