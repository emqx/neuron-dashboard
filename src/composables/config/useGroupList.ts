import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { queryGroupList, deleteGroup, queryTagList, addTag } from '@/api/config'
import type { GroupData } from '@/types/config'
import { OmitArrayFields } from '@/utils/utils'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'
import { useDownload } from '@/composables/useDownload'
import useAddTag from '@/composables/config/useAddTag'
import http from '@/utils/http'
import { groupBy } from 'lodash'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  const { t } = useI18n()
  const route = useRoute()
  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  const { nodePluginInfo } = useAddTag()

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

  // download template file
  const { downloadFile } = useDownload()
  const fileName = 'upload-tag-template.xlsx'
  const downloadTemplate = async () => {
    try {
      const { pathname } = window.location
      const fileURL = `${pathname.slice(-1) === '/' ? pathname.slice(0, -1) : pathname}/template/${fileName}`
      const { data } = await http.get(fileURL, { responseType: 'blob', baseURL: '' })
      downloadFile({ 'content-type': 'application/octet-stream', 'content-disposition': `filename=${fileName}` }, data)
    } catch (error) {
      //
    }
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
    const AllNodeTags: any = []
    Promise.all(requesList).then((res) => {
      for (let i = 0; i < res.length; i += 1) {
        const groupName: string = groupCheckedList.value[i].name
        res[i].forEach((item) => {
          const tag = {
            ...item,
            group: groupName,
          }
          AllNodeTags.push(tag)
        })
      }
      exportTable(AllNodeTags, node.value)
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
  }
}
