import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { queryPluginConfigInfo } from '@/api/config'
import { useGetPluginMsgIdMap } from './usePlugin'
import type { PluginInfo } from '@/types/config'
import { useTemplateListMap } from '@/composables/config/useTemplateList'

export default () => {
  const route = useRoute()

  const { getAllTemplates, templateListMap } = useTemplateListMap()

  // Limit the type of tag
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const pluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  // get template& its plugin
  const template = computed(() => route.params.template.toString())
  const templatePlugin = computed(() => {
    const tem = templateListMap.value.find(({ name }) => name === template.value)
    return tem?.plugin || ''
  })
  const getTemplatePluginInfo = async () => {
    await getAllTemplates()
    await initMsgIdMap()

    const pluginName = templatePlugin.value
    const nodePluginToLower = pluginName.toLocaleLowerCase()

    const schemaName = pluginMsgIdMap[pluginName]?.schema || nodePluginToLower

    if (schemaName) {
      const { data } = await queryPluginConfigInfo(schemaName)
      const plugin: PluginInfo = data
      if (plugin) {
        pluginInfo.value = plugin
      }
    }
  }

  getTemplatePluginInfo()
  return {
    pluginInfo,
  }
}
