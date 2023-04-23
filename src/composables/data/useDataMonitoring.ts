import { queryGroupList, queryTagList } from '@/api/config'
import { getMonitoringData } from '@/api/data'
import useSouthDriver from '@/composables/config/useSouthDriver'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'
import type { GroupData, TagForm } from '@/types/config'
import type { TagDataInMonitoring } from '@/types/data'
import { TagAttributeType, TagType } from '@/types/enums'
import { paginate, listOrderByKey } from '@/utils/utils'
import type { Ref } from 'vue'
import { computed, onUnmounted, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { useTagAttributeTypeSelect, useTagTypeSelect } from '../config/useAddTag'
import { debounce, cloneDeep } from 'lodash'

export interface TagDataInTable extends TagDataInMonitoring {
  attribute: Array<number>
  type: number
  typeLabel: string
  tagName: string
  valueToShow: string
  address: string
  error: number
  description: string
  decimal?: number
  precision?: number
}
export default () => {
  const { t } = useI18n()
  const store = useStore()

  const { totalSouthDriverList: nodeList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()

  let selectedGroup: undefined | { node: string; groupName: string; name: string }

  const currentGroup = computed({
    get: () => store.state.nodeGroupMemory,
    set: (val) => {
      const { node, groupName } = val
      store.commit('SET_NODE_GROUP', { node, groupName })
    },
  })
  const keywordSearch = ref('')

  const sortBy = ref({
    prop: '',
    order: '',
  })
  const currentNodeName = computed(() => {
    if (!currentGroup.value.node) {
      return ''
    }
    const node = nodeList.value.find(({ name }) => name === currentGroup.value.node)
    return node ? node.name : ''
  })

  const pageController = ref({
    num: 1,
    size: 100,
    total: 0,
  })
  const totalData: Ref<Array<TagDataInTable>> = ref([])
  const totalDataBackup: Ref<Array<TagDataInTable>> = ref([])
  const showValueByHexadecimal = ref(false)
  let tagMsgMap: Record<string, any> = {}
  let pollTimer: undefined | number
  let wittenTagTimer: undefined | number
  const updated = ref(Date.now())
  const { tagAttrValueMap } = useTagAttributeTypeSelect()
  const { transToHexadecimal } = useWriteDataCheckNParse()

  const reSubCount: { groupName: undefined | string; lastTimestamp: number; count: number } = {
    groupName: undefined,
    lastTimestamp: 0,
    count: 0,
  }

  const tableEmptyText = computed(() =>
    !currentGroup.value.node || !currentGroup.value.groupName ? t('data.selectGroupTip') : t('common.emptyData'),
  )

  const tableData = computed(() => {
    return paginate(totalData.value, pageController.value.size, pageController.value.num)
  })

  const sortDataByKey = (data: { prop: string | null; order: string | null }) => {
    const { prop, order } = data

    if (order && prop) {
      const sortByOrder = order.includes('asc') ? 'asc' : 'desc'
      sortBy.value.order = sortByOrder
      sortBy.value.prop = prop
      totalData.value = listOrderByKey(totalData.value, prop, sortByOrder)
    } else {
      sortBy.value = {
        order: '',
        prop: '',
      }
      totalData.value = cloneDeep(totalDataBackup.value)
    }
  }

  const reSubAfterReturnError = async () => {
    const { groupName, lastTimestamp, count } = reSubCount
    const { node, groupName: currentGroupName } = currentGroup.value
    let canReSubAndRequest = false
    if (Date.now() - lastTimestamp < 500 && groupName === currentGroupName && count < 3) {
      canReSubAndRequest = true
    } else if (Date.now() - lastTimestamp > 500 || groupName !== currentGroupName) {
      reSubCount.count = 0
      reSubCount.groupName = currentGroupName
      canReSubAndRequest = true
    }
    if (canReSubAndRequest) {
      reSubCount.count += 1
      reSubCount.lastTimestamp = Date.now()
      getTableData()
    }
  }

  const getTagDetail = async () => {
    if (!selectedGroup?.node || !selectedGroup.groupName) {
      return {}
    }
    const params = {
      node: selectedGroup?.node,
      group: selectedGroup.groupName,
      name: selectedGroup.name,
    }
    const tags = await queryTagList(params)
    const tagNameMap: any[] = tags.map((item: TagForm) => {
      const { attribute, name, ...restData } = item
      return {
        tagName: name,
        attribute: tagAttrValueMap[attribute as keyof typeof tagAttrValueMap],
        ...restData,
      }
    })
    return Promise.resolve(tagNameMap)
  }

  const getTableData = async () => {
    const { node, groupName } = currentGroup.value
    if (!node || !groupName || !currentNodeName.value) {
      return
    }
    try {
      const { data } = await getMonitoringData(currentNodeName.value, currentGroup.value.groupName)

      updated.value = Date.now()
      totalData.value = (tagMsgMap || []).map((item: any) => {
        item.typeLabel = findTagTypeLabelByValue(item.type)

        const tag = data.tags.find((readTagItem) => readTagItem.name === item.tagName)
        // in the tag list，if the 'read' API does not return a tag, set its 'value' to '-'
        const ret = tag ? { ...item, ...tag } : { name: item.tagName, ...item, value: '-' }

        if (!('value' in ret) || ret?.value === undefined) {
          ret.value = ''
        }
        return ret
      })

      pageController.value.total = totalData.value.length
      await handleShowValueByHexadecimalChanged()

      totalDataBackup.value = cloneDeep(totalData.value)
      sortDataByKey(sortBy.value)

      startPoll()
    } catch (error: any) {
      if (error?.response?.data?.error === 2014) {
        reSubAfterReturnError()
      }
    }
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

  const getTagList = async () => {
    try {
      const { node, groupName } = currentGroup.value
      if (!node || !groupName) {
        return
      }

      selectedGroup = { node, groupName, name: keywordSearch.value }
      tagMsgMap = await getTagDetail()
      initPageController()
      getTableData()

      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // debounce
  const dbGetTagList = debounce(() => {
    getTagList()
  }, 500)

  const writtenTag = () => {
    if (wittenTagTimer) {
      window.clearTimeout(wittenTagTimer)
    }
    wittenTagTimer = window.setTimeout(() => {
      getTableData()
    }, 900)
  }

  const resetKeywordSearch = () => {
    keywordSearch.value = ''
  }

  // change node
  const selectedNodeChanged = async (nodeName: string) => {
    if (nodeName) {
      try {
        currentGroup.value.node = nodeName
        selectedGroup = undefined
        totalData.value = []

        const data = await queryGroupList(currentGroup.value.node.toString())
        const isExistGroup = data.find((group) => group.name === currentGroup.value.groupName)
        currentGroup.value.groupName = isExistGroup?.name || ''

        groupList.value = data
      } catch (error) {
        groupList.value = []
      }
    } else {
      currentGroup.value.groupName = ''
      resetKeywordSearch()
      groupList.value = []
      totalData.value = []
      selectedGroup = undefined
      initPageController()
    }
  }

  // change group
  const selectedGroupChanged = async (groupName: string) => {
    resetKeywordSearch()

    if (groupName) {
      await getTagList()
    } else {
      totalData.value = []
      initPageController()
    }
  }

  const handleSizeChange = (size: number) => {
    pageController.value.size = size
    pageController.value.num = 1
  }

  const valueToShow = async (tagData: TagDataInTable) => {
    const { type, value, error } = tagData
    if (error) {
      return error
    }
    if (!showValueByHexadecimal.value) {
      if ((type === TagType.DOUBLE || type === TagType.FLOAT) && value === 0) {
        return '0.0'
      }
      return value
    }
    if (type === TagType.BYTE || type === TagType.BOOL || type === TagType.BIT || type === TagType.STRING) {
      return value
    }
    const data = await transToHexadecimal(tagData)
    return data
  }

  const handleShowValueByHexadecimalChanged = async () => {
    try {
      totalData.value.forEach(async (item) => {
        item.valueToShow = await valueToShow(item)
      })
      return Promise.resolve(totalData.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const canWrite = (item: TagDataInTable) => {
    return item.attribute && item.attribute.some((attr) => attr === TagAttributeType.Write)
  }

  const initTagList = async () => {
    const { node, groupName } = currentGroup.value
    if (node) {
      await selectedNodeChanged(node)
    }
    if (node && groupName) {
      await getTagList()
    }
  }

  onMounted(() => {
    initTagList()
  })

  onUnmounted(() => {
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
    if (wittenTagTimer) {
      window.clearTimeout(wittenTagTimer)
    }
  })

  return {
    nodeList,
    groupList,
    keywordSearch,
    currentGroup,
    currentNodeName,
    pageController,
    tableData,
    showValueByHexadecimal,
    updated,

    tableEmptyText,

    handleShowValueByHexadecimalChanged,
    canWrite,
    getTableData,
    dbGetTagList,
    selectedNodeChanged,
    selectedGroupChanged,
    handleSizeChange,
    sortDataByKey,
    writtenTag,
  }
}
