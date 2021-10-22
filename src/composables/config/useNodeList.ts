import { queryNorthDriverList, querySouthDriverList } from '@/api/config'
import { DriverItem } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { createMapFromArray } from '@/utils/utils'
import { ref, Ref } from 'vue'

export const useNodeMsgMap = (direction: DriverDirection) => {
  const nodeMsgMap: Ref<Record<number, DriverItem>> = ref({})

  const initMap = async () => {
    const request = direction === DriverDirection.North ? queryNorthDriverList : querySouthDriverList
    nodeMsgMap.value = createMapFromArray(await request())
  }
  const getNodeMsgById = (nodeID: number) => {
    return nodeMsgMap.value[nodeID] || {}
  }
  initMap()
  return {
    getNodeMsgById,
  }
}

export default () => {
  /**
   * total north driver list & south driver list
   */
  const nodeList: Ref<Array<DriverItem>> = ref([])

  const getNodeList = async () => {
    const ret = await Promise.all([queryNorthDriverList(), querySouthDriverList()])
    nodeList.value = ret.reduce((pre, curr) => pre.concat(curr), [])
  }

  const getNodeNameById = (nodeID: number) => {
    return nodeList.value.find(({ id }) => id === nodeID)?.name || ''
  }

  getNodeList()

  return {
    nodeList,
    getNodeNameById,
  }
}
