import { queryNorthDriverList } from '@/api/config'
import { DriverItem } from '@/types/config'
import { ref, Ref } from 'vue'

export default () => {
  const northDriverList: Ref<Array<DriverItem>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const getNorthDriverList = async () => {
    isListLoading.value = true
    northDriverList.value = await queryNorthDriverList()
    isListLoading.value = false
  }

  getNorthDriverList()
  return {
    northDriverList,
    isListLoading,
  }
}
