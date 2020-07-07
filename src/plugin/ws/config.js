let customServerBaseUrl
window.serverBaseUrl = 'ws://52.53.170.189:7000/'
try {
  customServerBaseUrl = window.serverBaseUrl
} catch (e) {}

const config = {
  isDevelopment: false,
  isCROS: false,
  // follow will be enabled when isCROS
  CROS: {
    CSRFTokenRequired: true,
    updateCSRFTokenIn: 5 * 60 * 1000 // ms
  },
  //
  clientBaseUrl: '/',
  // serverBaseUrl: customServerBaseUrl || '',
  clientLoginUrl: null
}
switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(config, {
      serverBaseUrl: customServerBaseUrl || `ws://${window.location.hostname}:${window.location.port}/`
    })
    break
  case 'development':
    Object.assign(config, {
      isDevelopment: true,
      serverBaseUrl: window.serverBaseUrl || 'ws://192.168.234.176:7681/'
    })
    break
}
export default config
