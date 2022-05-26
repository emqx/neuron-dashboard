import { queryNodeState, queryNorthDriverList, querySouthDriverList } from '@/api/config'
import { DriverItemInList, RawDriverData } from '@/types/config'
import { ref, Ref } from 'vue'

export const useFillNodeListStatusData = () => {
  const fillNodeListStatusData = async (nodeList: Array<RawDriverData>): Promise<Array<DriverItemInList>> => {
    return Promise.all(
      nodeList.map(async (item) => {
        const { data } = await queryNodeState(item.id)
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

  const getNodeNameById = (nodeID: number) => {
    return nodeList.value.find(({ id }) => id === nodeID)?.name || ''
  }

  getNodeList()

  return {
    nodeList,
    getNodeNameById,
  }
}
