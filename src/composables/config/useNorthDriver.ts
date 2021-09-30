import { queryNorthDriverList } from '@/api/config'
import { DriverItem } from '@/types/config'
import { ref, Ref } from 'vue'

export default (autoLoad = true) => {
  const northDriverList: Ref<Array<DriverItem>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const getNorthDriverList = async () => {
    isListLoading.value = true
    northDriverList.value = await queryNorthDriverList()
    isListLoading.value = false
  }

  if (autoLoad) {
    getNorthDriverList()
  }

  return {
    northDriverList,
    isListLoading,
    getNorthDriverList,
  }
}
