import { queryNorthDriverList, querySouthDriverList } from '@/api/config'
import { DriverItem } from '@/types/config'
import { ref, Ref } from 'vue'

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
