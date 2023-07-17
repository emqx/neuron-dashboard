import { computed } from 'vue'
import { useStore } from 'vuex'
import { isSubApp } from '@/utils/forToBeSubApp'

export default () => {
  const $store = useStore()

  const isAdminUser = computed(() => {
    return isSubApp && Number($store.state.userRole) === 1
  })

  return {
    isAdminUser,
  }
}
