import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { queryLicense } from '@/api/admin'

export default () => {
  const { t } = useI18n()

  const checkLicense = async () => {
    try {
      const { data } = await queryLicense()
      const { error, ...license } = data
      const { valid_until } = license
      let message = ''
      if (new Date(valid_until).getTime() < Date.now()) {
        message = t('admin.licenseExpired')
      } else if (new Date(valid_until).getTime() - 1000 * 60 * 60 * 24 * 5 < Date.now()) {
        message = t('admin.licenseExpiredSoon')
      }
      message ? EmqxMessage({ type: 'warning', message, duration: 20 * 1000 }) : void 0
    } catch (error) {
      console.error(error)
    }
  }

  return {
    checkLicense,
  }
}
