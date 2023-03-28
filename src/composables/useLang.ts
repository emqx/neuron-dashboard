import { computed } from 'vue'
import { useStore } from 'vuex'
import locale from 'element-plus/lib/locale'
import zhLang from 'element-plus/lib/locale/lang/zh-cn'
import enLang from 'element-plus/lib/locale/lang/en'
import store from '@/store'

export const setLang = () => {
  const initLang = () => {
    if (store.state.lang === 'zh') {
      locale.use(zhLang)
    } else {
      locale.use(enLang)
    }
  }
  return {
    initLang,
  }
}
export default () => {
  const $store = useStore()

  const langList = [
    {
      label: '中文',
      value: 'zh',
    },
    {
      label: 'English',
      value: 'en',
    },
  ]

  const currentLang = computed(() => {
    return $store.state.lang
  })

  const i18nContent = <T extends Record<string, any>, K extends keyof T>(obj: T, field: K): string => {
    if (field in obj && currentLang.value === 'zh') {
      const k = `${field.toString()}_zh`
      return k in obj ? obj[k] : obj[field]
    }
    return obj[field] || ''
  }

  return {
    langList,
    currentLang,
    i18nContent,
  }
}
