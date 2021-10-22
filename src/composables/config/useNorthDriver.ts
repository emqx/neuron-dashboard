import { queryNorthDriverList } from '@/api/config'
import { DirverItemWithPluginKind } from '@/types/config'
import { PluginKind } from '@/types/enums'
import { ref, Ref } from 'vue'
import { useGetPluginMsgIdMap } from './usePlugin'

export default (autoLoad = true) => {
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  const northDriverList: Ref<Array<DirverItemWithPluginKind>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const getNorthDriverList = async () => {
    try {
      isListLoading.value = true
      const [northDriverListData, msgIdMap] = await Promise.all([await queryNorthDriverList(), initMsgIdMap()])
      northDriverList.value = northDriverListData.map((item) => {
        return Object.assign(item, { pluginKind: pluginMsgIdMap[item.plugin_id].kind as PluginKind })
      })
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
