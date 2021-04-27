console.log(process.env.VUE_APP_HOST)
const serverBaseUrl = process.env.VUE_APP_HOST

const config = {
  isDevelopment: false,
  isCROS: false,
  CROS: {
    CSRFTokenRequired: true,
    updateCSRFTokenIn: 5 * 60 * 1000, // ms
  },
  clientBaseUrl: '/',
  clientLoginUrl: null,
  serverBaseUrl: '',
}
switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(config, {
      serverBaseUrl: serverBaseUrl || `ws://${window.location.hostname}:${window.location.port}/`,
    })
    break
  case 'development':
    Object.assign(config, {
      isDevelopment: true,
      serverBaseUrl: serverBaseUrl,
    })
    break
}
export default config
