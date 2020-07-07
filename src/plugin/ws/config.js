console.log(process.env.VUE_APP_HOST)
window.serverBaseUrl = process.env.VUE_APP_HOST

const config = {
  isDevelopment: false,
  isCROS: false,
  // follow will be enabled when isCROS
  CROS: {
    CSRFTokenRequired: true,
    updateCSRFTokenIn: 5 * 60 * 1000 // ms
  },
  clientBaseUrl: '/',
  clientLoginUrl: null
}
switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(config, {
      serverBaseUrl: window.serverBaseUrl || `ws://${window.location.hostname}:${window.location.port}/`
    })
    break
  case 'development':
    Object.assign(config, {
      isDevelopment: true,
      serverBaseUrl: window.serverBaseUrl || 'ws://192.168.234.176:7000/'
    })
    break
}
export default config
