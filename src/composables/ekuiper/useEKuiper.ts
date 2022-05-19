import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default () => {
  const route = useRoute()
  const { t } = useI18n()
  const pageTitle = computed(() => {
    if (route.path.indexOf('rule') > -1) {
      return t('ekuiper.rule')
    }
    return t('ekuiper.extension')
  })

  return {
    pageTitle,
  }
}
