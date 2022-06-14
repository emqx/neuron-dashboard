import { queryNodeState, queryNorthDriverList, querySouthDriverList } from '@/api/config'
import { DriverItemInList, RawDriverData } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { createMapFromArray } from '@/utils/utils'
import { ref, Ref } from 'vue'

export const useNodeMsgMap = (direction: DriverDirection, autoInit = true) => {
  const nodeMsgMap: Ref<Record<string, RawDriverData>> = ref({})

  const initMap = async () => {
    try {
      const request = direction === DriverDirection.North ? queryNorthDriverList : querySouthDriverList
      nodeMsgMap.value = createMapFromArray(await request(), 'name')
      return Promise.resolve(nodeMsgMap.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const getNodeMsgById = (node: string) => {
    return nodeMsgMap.value[node] || {}
  }

  if (autoInit) {
    initMap()
  }

  return {
    initMap,
    getNodeMsgById,
  }
}

export const useFillNodeListStatusData = () => {
  const fillNodeListStatusData = async (nodeList: Array<RawDriverData>): Promise<Array<DriverItemInList>> => {
    return Promise.all(
      nodeList.map(async (item) => {
        const { data } = await queryNodeState(item.name)
        return Promise.resolve(Object.assign(item, data))
      }),
    )
  }
  return {
    fillNodeListStatusData,
  }
}

export default () => {
  /**
   * total north driver list & south driver list
   */
  const nodeList: Ref<Array<RawDriverData>> = ref([])

  const getNodeList = async () => {
    const ret = await Promise.all([queryNorthDriverList(), querySouthDriverList()])
    nodeList.value = ret.reduce((pre, curr) => pre.concat(curr), [])
  }

  const getNodeNameById = (node: string) => {
    return nodeList.value.find(({ name }) => name === node)?.name || ''
  }

  getNodeList()

  return {
    nodeList,
    getNodeNameById,
  }
}
