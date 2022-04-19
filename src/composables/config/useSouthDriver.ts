import { querySouthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { onUnmounted, ref, Ref } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export default (autoLoad = true, needRefreshStatus = false) => {
  const { fillNodeListStatusData } = useFillNodeListStatusData()

  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  let refreshStatusTimer: undefined | number = undefined

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

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      const driverListAddStatus = await fillNodeListStatusData(southDriverList.value)
      southDriverList.value = driverListAddStatus.map((item) => {
        return {
          ...item,
          plugin: pluginMsgIdMap[item.plugin_id].name,
        }
      })
    }, 15 * 1000)
  }

  if (autoLoad) {
    getSouthDriverList()
  }

  if (needRefreshStatus) {
    startTimer()
  }

  onUnmounted(() => {
    if (refreshStatusTimer) {
      window.clearInterval(refreshStatusTimer)
    }
  })

  return {
    southDriverList,
    isListLoading,
    getSouthDriverList,
  }
}
