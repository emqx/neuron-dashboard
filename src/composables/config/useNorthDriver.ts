import { queryNorthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { PluginKind } from '@/types/enums'
import { ref, Ref, onUnmounted } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export default (autoLoad = true, needRefreshStatus = false) => {
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const { fillNodeListStatusData } = useFillNodeListStatusData()

  const northDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  let refreshStatusTimer: undefined | number = undefined

  const getNorthDriverList = async () => {
    try {
      isListLoading.value = true
      const [northDriverListData, msgIdMap] = await Promise.all([await queryNorthDriverList(), initMsgIdMap()])
      northDriverList.value = await fillNodeListStatusData(
        northDriverListData.map((item) =>
          Object.assign(item, {
            pluginKind: pluginMsgIdMap[item.plugin_id]?.kind as PluginKind,
            plugin: pluginMsgIdMap[item.plugin_id]?.name,
          }),
        ),
      )
      isListLoading.value = false
      return Promise.resolve(northDriverList.value)
    } catch (error) {
      return Promise.reject()
    }
  }

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      const driverListAddStatus = await fillNodeListStatusData(northDriverList.value)
      northDriverList.value = driverListAddStatus.map((item) => {
        return {
          ...item,
          plugin: pluginMsgIdMap[item.plugin_id].name,
        }
      })
    }, 15 * 1000)
  }

  if (autoLoad) {
    getNorthDriverList()
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
    northDriverList,
    isListLoading,
    getNorthDriverList,
  }
}
