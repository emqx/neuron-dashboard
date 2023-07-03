import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { queryPluginConfigInfo } from '@/api/config'
import type { PluginInfo } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { useNodeMsgMap } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export const useTemplatePluginInfo = (plugin?: string) => {
  const route = useRoute()

  const templatePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  const pluginName = computed(() => {
    return plugin || route.params?.plugin?.toString() || ''
  })

  // Limit the type of tag
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const getTemplatePluginInfo = async () => {
    try {
      await initMsgIdMap()

      const nodePluginToLower = pluginName.value.toLocaleLowerCase()
      const schemaName = pluginMsgIdMap[pluginName.value]?.schema || nodePluginToLower

      const { data } = await queryPluginConfigInfo(schemaName)
      templatePluginInfo.value = data || {}

      return Promise.resolve(templatePluginInfo.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return {
    templatePluginInfo,
    getTemplatePluginInfo,
  }
}

export const useNodePluginInfo = (plugin?: string) => {
  const route = useRoute()

  const pluginName = computed(() => {
    return plugin || route.params?.plugin?.toString() || ''
  })

  const nodePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  const getNodePluginInfo = async () => {
    try {
      await initMsgIdMap()

      const nodePluginToLower = pluginName.value.toLocaleLowerCase()
      const schemaName = pluginMsgIdMap[pluginName.value]?.schema || nodePluginToLower

      const { data } = await queryPluginConfigInfo(schemaName)
      nodePluginInfo.value = data || {}

      return Promise.resolve(nodePluginInfo.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    nodePluginInfo,
    getNodePluginInfo,
  }
}
