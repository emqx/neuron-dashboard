import { querySouthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { ref, Ref } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export default (autoLoad = true) => {
  const fillNodeListStatusData = useFillNodeListStatusData()

  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  const getSouthDriverList = async () => {
    isListLoading.value = true
    await initMsgIdMap()
    const driverList = await querySouthDriverList()
    const driverListAddStatus = await fillNodeListStatusData(driverList)
    southDriverList.value = driverListAddStatus.map((item) => {
      return {
        ...item,
        plugin: pluginMsgIdMap[item.plugin_id].name,
      }
    })
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
