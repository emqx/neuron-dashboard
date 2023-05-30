import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { queryPluginConfigInfo } from '@/api/config'
import type { PluginInfo } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { useNodeMsgMap } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'
import { useTemplateListMap } from '@/composables/config/useTemplateList'

export const useTemplatePluginInfo = (template?: string) => {
  const route = useRoute()

  const { getAllTemplates, templateListMap } = useTemplateListMap()
  const templatePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  const templateName = computed(() => template || route.params.template.toString())

  const templatePlugin = computed(() => {
    const tem = templateListMap.value.find(({ name }) => name === templateName.value)
    return tem?.plugin || ''
  })

  // Limit the type of tag
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const getTemplatePluginInfo = async () => {
    try {
      await getAllTemplates()
      await initMsgIdMap()

      const pluginName = templatePlugin.value
      const nodePluginToLower = pluginName.toLocaleLowerCase()

      const schemaName = pluginMsgIdMap[pluginName]?.schema || nodePluginToLower

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

export const useNodePluginInfo = (node?: string) => {
  const route = useRoute()

  const nodePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)
  const { getNodeMsgById, initMap } = useNodeMsgMap(DriverDirection.South, false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  const nodeName = computed(() => node || route.params.node.toString())
  const getNodePluginInfo = async () => {
    try {
      await initMap()
      await initMsgIdMap()
      const pluginName = getNodeMsgById(nodeName.value).plugin
      const nodePluginToLower = pluginName.toLocaleLowerCase()

      const schemaName = pluginMsgIdMap[pluginName]?.schema || nodePluginToLower

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
