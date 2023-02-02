import { queryGroupList, queryTagList } from '@/api/config'
import { getMonitoringData } from '@/api/data'
import useSouthDriver from '@/composables/config/useSouthDriver'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'
import type { GroupData, TagForm, RawDriverData } from '@/types/config'
import type { TagDataInMonitoring } from '@/types/data'
import { TagAttributeType, TagType } from '@/types/enums'
import { paginate } from '@/utils/utils'
import type { Ref } from 'vue'
import { computed, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTagAttributeTypeSelect } from '../config/useAddTag'

export interface TagDataInTable extends TagDataInMonitoring {
  attribute: Array<number>
  type: number
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

  const { totalSouthDriverList: nodeList } = useSouthDriver()
  const groupList: Ref<Array<GroupData>> = ref([])

  let selectedGroup: undefined | { node: string; groupName: string }
  const currentGroup: Ref<{ node: string | string; groupName: string }> = ref({
    node: '',
    groupName: '',
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
  const showValueByHexadecimal = ref(false)
  let tagMsgMap: Record<string, any> = {}
  let pollTimer: undefined | number
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
    const tags = await queryTagList({ node: selectedGroup?.node, group: selectedGroup.groupName })
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
        const tag = data.tags.find((readTagItem) => readTagItem.name === item.tagName)

        // in the tag list，if the 'read' API does not return a tag, set its 'value' to '-'
        const ret = tag ? { ...tag, ...item } : { name: item.tagName, ...item, value: '-' }
        if (!('value' in ret) || ret?.value === undefined) {
          ret.value = ''
        }
        return ret
      })
      handleShowValueByHexadecimalChanged()
      pageController.value.total = totalData.value.length
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

  // change node
  const selectedNodeChanged = async (node: RawDriverData) => {
    if (node?.name) {
      try {
        const { name } = node
        currentGroup.value.node = name
        currentGroup.value.groupName = ''
        selectedGroup = undefined
        totalData.value = []
        const data = await queryGroupList(currentGroup.value.node.toString())
        groupList.value = data
      } catch (error) {
        groupList.value = []
      }
    } else {
      currentGroup.value.groupName = ''
      groupList.value = []
      totalData.value = []
      selectedGroup = undefined
      initPageController()
    }
  }

  const filterSouthNodesByKeyword = (keyword: string, cb: any) => {
    const list = nodeList.value
    const res = keyword ? list.filter((node: RawDriverData) => node.name.includes(keyword)) : list
    cb(res)
  }

  // change group
  const selectedGroupChanged = async () => {
    const { node, groupName } = currentGroup.value
    if (!node || !groupName) {
      return
    }

    selectedGroup = { node, groupName }
    tagMsgMap = await getTagDetail()
    initPageController()
    getTableData()
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

  const handleShowValueByHexadecimalChanged = () => {
    totalData.value.forEach(async (item) => {
      item.valueToShow = await valueToShow(item)
    })
  }

  const canWrite = (item: TagDataInTable) => {
    return item.attribute && item.attribute.some((attr) => attr === TagAttributeType.Write)
  }

  onUnmounted(() => {
    if (pollTimer) {
      window.clearInterval(pollTimer)
    }
  })

  return {
    nodeList,
    groupList,
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
    selectedNodeChanged,
    filterSouthNodesByKeyword,
    selectedGroupChanged,
    handleSizeChange,
  }
}
