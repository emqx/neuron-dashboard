import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { queryGroupList, deleteGroup, queryTagList, addTag } from '@/api/config'
import type { GroupData } from '@/types/config'
import { OmitArrayFields } from '@/utils/utils'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'
import useAddTag from '@/composables/config/useAddTag'
import useGroupCommon from '@/composables/config/useGroupCommon'
import { groupBy } from 'lodash'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  // for upload tags
  const { nodePluginInfo } = useAddTag()

  // download | import | export
  const { downloadTemplate, getTagsByGroups } = useGroupCommon()
  const { readTagListFile, handleTagListInTableFile, batchAddTags } = useUploadTagList(nodePluginInfo.value)
  const { isExporting, exportTable } = useExportTagTable()

  const node = computed(() => route.params.node.toString())
  const allChecked = computed({
    get() {
      if (groupList.value.length === 0) {
        return false
      }
      return groupList.value.every(({ checked }) => checked)
    },
    set(val: boolean) {
      groupList.value.forEach((item) => {
        item.checked = val
      })
    },
  })

  const groupCheckedList = computed(() => {
    const checkedList: Array<GroupDataInTable> = groupList.value.filter(({ checked }) => checked)
    const newCheckedList: Array<GroupData> = OmitArrayFields(checkedList, ['checked'])
    return newCheckedList
  })

  const getGroupList = async () => {
    isListLoading.value = true
    const data = await queryGroupList(node.value)
    groupList.value = data.map((item) => Object.assign(item, { checked: false }))
    isListLoading.value = false
  }

  const delGroup = async ({ name }: GroupDataInTable) => {
    await MessageBoxConfirm()

    await deleteGroup(node.value, name)
    EmqxMessage.success(t('common.operateSuccessfully'))
    getGroupList()
  }

  const delGroupList = async (list: Array<GroupData>) => {
    await Promise.all(list.map(({ name }) => deleteGroup(node.value, name)))
    EmqxMessage.success(t('common.operateSuccessfully'))
    getGroupList()
  }

  const batchDeleteGroup = async () => {
    await MessageBoxConfirm()

    delGroupList(groupCheckedList.value)
  }

  const clearGroup = async () => {
    await MessageBoxConfirm(t('common.confirmClear'))

    delGroupList(groupList.value)
  }

  // import file
  const importTagsByGroups = async (file: File) => {
    try {
      const tagList = await readTagListFile(file)

      const tagsByGroupName = groupBy(tagList, (item) => item.group)
      const groupNames = Object.keys(tagsByGroupName)
      const requestList = groupNames.map((groupName: string) => {
        const groupTags: any = tagsByGroupName[groupName]
        let rqs = null
        return handleTagListInTableFile(groupTags).then((tags) => {
          rqs = addTag({ tags, node: node.value, group: groupName })
          return rqs
        })
      })

      await batchAddTags(requestList)
      getGroupList()
    } catch (error) {
      // no upload empty content file
      if (error) {
        getGroupList()
      }
    }

    return Promise.reject()
  }

  // export file
  const ExportTagsByGroups = async () => {
    const requesList = groupCheckedList.value.map((group: GroupData) =>
      queryTagList({ node: node.value, group: group.name }),
    )

    const tags = await getTagsByGroups(requesList, groupCheckedList.value)

    exportTable(tags, node.value)
  }

  // go to monitoring
  const goMonitoringPage = ({ name }: GroupData) => {
    const data = {
      node: node.value,
      groupName: name,
    }
    store.commit('SET_NODE_GROUP', data)

    router.push({
      name: 'DataMonitoring',
    })
  }

  getGroupList()

  return {
    node,
    groupList,
    groupCheckedList,
    isListLoading,
    allChecked,
    clearGroup,
    batchDeleteGroup,
    getGroupList,
    delGroup,
    isExporting,
    importTagsByGroups,
    downloadTemplate,
    ExportTagsByGroups,
    goMonitoringPage,
  }
}
