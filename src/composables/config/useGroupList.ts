import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessageBox, EmqxMessage } from '@emqx/emqx-ui'
import { queryGroupList, deleteGroup, queryTagList } from '@/api/config'
import type { GroupData } from '@/types/config'
import { OmitArrayFields } from '@/utils/utils'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'
import { useDownload } from '@/composables/useDownload'
import http from '@/utils/http'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  const { t } = useI18n()
  const route = useRoute()
  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  const { uploadTag } = useUploadTagList()
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
    await EmqxMessageBox({
      title: t('common.operateConfirm'),
      message: t('common.confirmDelete'),
      confirmButtonText: t('common.confirmButtonText'),
    })
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
    await EmqxMessageBox({
      title: t('common.operateConfirm'),
      message: t('common.confirmDelete'),
      confirmButtonText: t('common.confirmButtonText'),
    })
    delGroupList(groupCheckedList.value)
  }

  const clearGroup = async () => {
    await EmqxMessageBox({
      title: t('common.operateConfirm'),
      message: t('common.confirmClear'),
      confirmButtonText: t('common.confirmButtonText'),
    })
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
  const importTagsByGroups = (file: File) => {
    uploadTag(file, node.value)
      .then(() => {
        getGroupList()
      })
      .catch((error) => {
        // no upload empty content file
        if (error) {
          getGroupList()
        }
      })
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
