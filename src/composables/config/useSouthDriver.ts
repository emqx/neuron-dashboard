import { querySouthDriverList } from '@/api/config'
import { DriverItem } from '@/types/config'
import { ref, Ref } from 'vue'

export default () => {
  const southDriverList: Ref<Array<DriverItem>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const getSouthDriverList = async () => {
    isListLoading.value = true
    southDriverList.value = await querySouthDriverList()
    isListLoading.value = false
  }

  getSouthDriverList()
  return {
    southDriverList,
    isListLoading,
  }
}
