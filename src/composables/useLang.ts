import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {
  const $store = useStore()

  const currentLang = computed(() => {
    return $store.state.lang
  })

  return {
    currentLang,
  }
}
