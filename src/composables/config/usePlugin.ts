import { ref, computed, Ref, ComputedRef } from 'vue'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { DriverDirection } from '@/types/enums'
import { queryPluginList } from '@/api/config'
import { CreatedPlugin } from '@/types/config'

export default () => {
  const totalPluginList: Ref<Array<CreatedPlugin>> = ref([])

  const northPluginList: ComputedRef<Array<CreatedPlugin>> = computed(() =>
    totalPluginList.value.filter(({ node_type }) => NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type)),
  )
  const southPluginList: ComputedRef<Array<CreatedPlugin>> = computed(() =>
    totalPluginList.value.filter(({ node_type }) => node_type === DriverDirection.South),
  )

  const getPluginList = async () => {
    const { data } = await queryPluginList()
    totalPluginList.value = data.plugin_libs || []
  }

  getPluginList()

  return {
    northPluginList,
    southPluginList,
  }
}
