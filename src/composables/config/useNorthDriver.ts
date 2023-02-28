import { useRouter } from 'vue-router'
import { queryNorthDriverList } from '@/api/config'
import type { DriverItemInList } from '@/types/config'
import type { PluginKind } from '@/types/enums'
import type { Ref } from 'vue'
import { ref, onUnmounted, computed } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'
import { debounce } from 'lodash'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useNodeDebugLogLevel } from '@/composables/config/useDriver'

export default (autoLoad = true, needRefreshStatus = false) => {
  const router = useRouter()

  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const { fillNodeListStatusData } = useFillNodeListStatusData()
  const { deleteDriverByNode } = useDeleteDriver()
  const { modifyNodeLogLevelToDebug } = useNodeDebugLogLevel()

  const northDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  let refreshStatusTimer: undefined | number

  const nodePlugin = computed(
    () => (nodeName: string) => northDriverList.value.find((item: DriverItemInList) => item.name === nodeName)?.plugin,
  )
  const isMQTTPugin = computed(() => (plugin: string | undefined) => plugin && plugin.toLocaleLowerCase() === 'mqtt')

  const getNorthDriverList = async () => {
    try {
      isListLoading.value = true
      const [northDriverListData] = await Promise.all([await queryNorthDriverList(), initMsgIdMap()])
      northDriverList.value = await fillNodeListStatusData(
        northDriverListData.map((item) =>
          Object.assign(item, {
            pluginKind: pluginMsgIdMap[item.plugin]?.kind as PluginKind,
          }),
        ),
      )
      isListLoading.value = false
      return Promise.resolve(northDriverList.value)
    } catch (error) {
      return Promise.reject()
    }
  }
  // debounce
  const dbGetNorthDriverList = debounce(() => {
    getNorthDriverList()
  }, 500)

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      northDriverList.value = await fillNodeListStatusData(northDriverList.value)
    }, 15 * 1000)
  }

  const goGroupPage = (node: DriverItemInList) => {
    router.push({
      name: 'NorthDriverGroup',
      params: {
        node: node.name,
      },
    })
  }

  const goNodeConfig = (node: DriverItemInList) =>
    router.push({ name: 'NorthDriverConfig', params: { node: node.name } })

  const deleteDriver = async (node: DriverItemInList) => {
    await deleteDriverByNode('app', node)
    dbGetNorthDriverList()
  }

  const modifyNodeLogLevel = async (node: DriverItemInList) => {
    await modifyNodeLogLevelToDebug(node.name)
    dbGetNorthDriverList()
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
    dbGetNorthDriverList,
    isMQTTPugin,
    nodePlugin,
    goGroupPage,
    goNodeConfig,
    modifyNodeLogLevel,
    deleteDriver,
  }
}
