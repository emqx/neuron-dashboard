import { queryNorthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { PluginKind } from '@/types/enums'
import { ref, Ref } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export default (autoLoad = true) => {
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const { fillNodeListStatusData } = useFillNodeListStatusData()

  const northDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
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

  if (autoLoad) {
    getNorthDriverList()
  }

  return {
    northDriverList,
    isListLoading,
    getNorthDriverList,
  }
}
