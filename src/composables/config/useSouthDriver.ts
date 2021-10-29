import { querySouthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { ref, Ref } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'

export default (autoLoad = true) => {
  const fillNodeListStatusData = useFillNodeListStatusData()

  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const getSouthDriverList = async () => {
    isListLoading.value = true
    const driverList = await querySouthDriverList()
    southDriverList.value = await fillNodeListStatusData(driverList)
    isListLoading.value = false
  }

  if (autoLoad) {
    getSouthDriverList()
  }

  return {
    southDriverList,
    isListLoading,
    getSouthDriverList,
  }
}
