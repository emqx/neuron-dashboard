import { useI18n } from 'vue-i18n'

const ONE_MINUTE_SECONDS = 60
const ONE_HOUR_SECONDS = 60 * ONE_MINUTE_SECONDS

export default () => {
  const { t } = useI18n()
  const timeFormat = (time: number) => {
    const hour = Math.floor(time / ONE_HOUR_SECONDS)
    const minute = Math.floor((time - hour * ONE_HOUR_SECONDS) / ONE_MINUTE_SECONDS)
    return [hour, t('common.hour', hour), minute, t('common.minute', minute)].join('  ')
  }
  return {
    timeFormat,
  }
}
