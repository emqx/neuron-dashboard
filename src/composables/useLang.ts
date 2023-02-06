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

  const currentLang = computed(() => {
    return $store.state.lang
  })

  return {
    currentLang,
  }
}
