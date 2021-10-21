import { ref, Ref, computed, onUnmounted } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { addSubscription, deleteSubscription, queryGroupList, queryNorthDriverList, queryTagList } from '@/api/config'
import { GroupData } from '@/types/config'
import { getMonitoringData } from '@/api/data'
import { useI18n } from 'vue-i18n'
import { TagDataInMonitoring } from '@/types/data'
import { DEFAULT_NODE_NAME } from '@/utils/constants'
import { paginate } from '@/utils/utils'
import { useTagAttributeTypeSelect } from '../config/useAddTag'
import { TagAttrbuteType, TagType } from '@/types/enums'
import useSouthDriver from '@/composables/config/useSouthDriver'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'

export const useSubscribeForGetMonitoringData = () => {
  let defaultDashboardId: undefined | number = undefined
  const getDefaultDashboardId = async () => {
    try {
      const data = await queryNorthDriverList()
      defaultDashboardId = data.find(({ name }) => name === DEFAULT_NODE_NAME)?.id
      if (!defaultDashboardId) {
        throw new Error('Can not find default dashboard')
      }
      return Promise.resolve()
    } catch (error: any) {
      EmqxMessage.error(error.message)
      return Promise.reject()
    }
  }
  const initPromise = getDefaultDashboardId()

  const subscribe = async (nodeID: number, groupName: string) => {
    try {
      await initPromise
      await addSubscription({
        dst_node_id: defaultDashboardId as number,
        src_node_id: nodeID,
        name: groupName,
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  const unsubscribe = async (nodeID: number, groupName: string) => {
    try {
      await initPromise
      await deleteSubscription({
        dst_node_id: defaultDashboardId as number,
        src_node_id: nodeID,
        name: groupName,
      })
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  return {
    subscribe,
    unsubscribe,
  }
}

export interface TagDataInTable extends TagDataInMonitoring {
  attribute: Array<number>
  type: number
  tagName: string
  valueToShow: string
}

export default () => {
  const { t } = useI18n()

  const { subscribe, unsubscribe } = useSubscribeForGetMonitoringData()

  const { southDriverList: nodeList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  let selectedGroup: undefined | { nodeID: number; groupName: string } = undefined
  const currentGroup = ref({
    nodeID: '',
    groupName: '',
  })

  const pageController = ref({
    num: 1,
    size: 100,
    total: 0,
  })
  const totalData: Ref<Array<TagDataInTable>> = ref([])
  const showValueByHexadecimal = ref(false)
  let tagMsgMap: Record<number, any> = {}
  let pollTimer: undefined | number = undefined
  const updated = ref(Date.now())
  const { tagAttrValueMap } = useTagAttributeTypeSelect()
  const { transToHexadecimal } = useWriteDataCheckNParse()

  const tableEmptyText = computed(() =>
    !currentGroup.value.nodeID || !currentGroup.value.groupName ? t('data.selectGroupTip') : t('common.emptyData'),
  )

  const tableData = computed(() => {
    return paginate(totalData.value, pageController.value.size, pageController.value.num)
  })

  const unsubscribeCurrentGroup = () => {
    if (selectedGroup) {
      return unsubscribe(selectedGroup.nodeID, selectedGroup.groupName)
    }
    return Promise.resolve()
  }

  const selectedNodeChanged = async () => {
    currentGroup.value.groupName = ''
    await unsubscribeCurrentGroup()
    selectedGroup = undefined
    const data = await queryGroupList(Number(currentGroup.value.nodeID))
    groupList.value = data
  }

  const getTagDetail = async () => {
    if (!selectedGroup?.nodeID || !selectedGroup.groupName) {
      return {}
    }
    const tags = await queryTagList(selectedGroup?.nodeID, selectedGroup.groupName)
    const tagIdMap: Record<string | number, any> = {}
    tags.forEach(
      ({ id, attribute, type, name }) =>
        (tagIdMap[id] = {
          attribute: tagAttrValueMap[attribute as keyof typeof tagAttrValueMap],
          type,
          tagName: name,
        }),
    )
    return Promise.resolve(tagIdMap)
  }

  const getTableData = async () => {
    const { nodeID, groupName } = currentGroup.value
    if (!nodeID || !groupName) {
      return
    }
    const { data } = await getMonitoringData(Number(currentGroup.value.nodeID), currentGroup.value.groupName)
    updated.value = Date.now()
    totalData.value = (data.tags || []).map((item) => {
      return Object.assign(item, tagMsgMap[item.id])
    })
    handleShowValueByHexadecimalChanged()
    pageController.value.total = totalData.value.length
  }

  const initPageController = () => {
    pageController.value.num = 1
    pageController.value.total = 0
  }

  const startPoll = () => {
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
    pollTimer = window.setInterval(() => {
      getTableData()
    }, 3000)
  }

  const selectedGroupChanged = async () => {
    const { nodeID, groupName } = currentGroup.value
    if (!nodeID || !groupName) {
      return
    }

    await unsubscribeCurrentGroup()
    selectedGroup = { nodeID: Number(nodeID), groupName }
    await subscribe(Number(nodeID), groupName)
    tagMsgMap = await getTagDetail()
    initPageController()
    getTableData()
    startPoll()
  }

  const handleSizeChange = (size: number) => {
    pageController.value.size = size
    pageController.value.num = 1
  }

  const valueToShow = async ({ value, type }: TagDataInTable) => {
    if (
      !showValueByHexadecimal.value ||
      type === TagType.BYTE ||
      type === TagType.BOOL ||
      type === TagType.BIT ||
      type === TagType.CSTRING
    ) {
      return value
    }
    const data = await transToHexadecimal(value.toString())
    return data
  }

  const handleShowValueByHexadecimalChanged = () => {
    totalData.value.forEach(async (item) => {
      item.valueToShow = await valueToShow(item)
      console.log(item.valueToShow)
    })
  }

  const canWrite = (item: TagDataInTable) => {
    return item.attribute && item.attribute.some((item) => item === TagAttrbuteType.Write)
  }

  onUnmounted(() => {
    unsubscribeCurrentGroup()
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
  })

  window.onbeforeunload = function () {
    unsubscribeCurrentGroup()
  }

  return {
    nodeList,
    groupList,
    currentGroup,
    pageController,
    tableData,
    showValueByHexadecimal,
    updated,

    tableEmptyText,

    handleShowValueByHexadecimalChanged,
    canWrite,
    getTableData,
    selectedNodeChanged,
    selectedGroupChanged,
    handleSizeChange,
  }
}
