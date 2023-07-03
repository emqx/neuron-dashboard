import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { queryGroupList, deleteGroup, addGroup, queryTagList, addTag } from '@/api/template'
import type { GroupData } from '@/types/config'
import { OmitArrayFields } from '@/utils/utils'
import useGroupCommon from '@/composables/config/useGroupCommon'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'
import useTemplateAddTag from '@/composables/config/useTemplateAddTag'
import { groupBy } from 'lodash'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  // for upload tags
  const { pluginInfo } = useTemplateAddTag()

  // download | import | export
  const { downloadTemplate, getTagsByGroups } = useGroupCommon()
  const { readTagListFile, handleTagListInTableFile, batchAddTags } = useUploadTagList(pluginInfo.value)
  const { isExporting, exportTable } = useExportTagTable()

  const template = computed(() => route.params.template.toString())

  // selected all groups
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

  // selected groups
  const groupCheckedList = computed(() => {
    const checkedList: Array<GroupDataInTable> = groupList.value.filter(({ checked }) => checked)
    const newCheckedList: Array<GroupData> = checkedList.length ? OmitArrayFields(checkedList, ['checked']) : []
    return newCheckedList
  })

  /**
   * Get group list
   */
  const getGroupList = async () => {
    try {
      isListLoading.value = true
      const data = await queryGroupList(template.value)
      groupList.value = data.map((item) => Object.assign(item, { checked: false }))
    } catch (error) {
      console.error(error)
    } finally {
      isListLoading.value = false
    }
  }

  /** Remove Group */
  const delGroup = async ({ name }: GroupDataInTable) => {
    await MessageBoxConfirm()

    await deleteGroup(template.value, name)
    EmqxMessage.success(t('common.operateSuccessfully'))
    getGroupList()
  }

  const delGroupList = async (list: Array<GroupData>) => {
    await Promise.all(list.map(({ name }) => deleteGroup(template.value, name)))
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

  /**
   * Import Groups
   */
  const importTagsByGroups = async (file: File) => {
    try {
      const tagList = await readTagListFile(file)

      const tagsByGroupName = groupBy(tagList, (item) => item.group)
      const groupNames = Object.keys(tagsByGroupName)
      const requestList = groupNames.map(async (groupName: string) => {
        // if the group doesn't exist, create the group first. and default interval is 3000
        const group = groupList.value.find(({ name }) => name === groupName)
        if (!group) {
          await addGroup({ group: groupName, template: template.value, interval: 3000 })
        }

        const groupTags: any = tagsByGroupName[groupName]
        let rqs = null
        return handleTagListInTableFile(groupTags).then((tags) => {
          rqs = addTag({ tags, template: template.value, group: groupName })
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

  /**
   * Export Groups
   */
  const ExportTagsByGroups = async () => {
    const requesList = groupCheckedList.value.map((group: GroupData) =>
      queryTagList({ template: template.value, group: group.name }),
    )

    const tags = await getTagsByGroups(requesList, groupCheckedList.value)

    exportTable(tags, template.value)
  }

  const goTagPage = ({ name }: GroupData) => {
    router.push({
      name: 'TemplateGroupTag',
      params: { group: name },
    })
  }

  getGroupList()

  return {
    template,
    isListLoading,
    groupList,
    groupCheckedList,
    allChecked,
    getGroupList,

    delGroup,
    batchDeleteGroup,
    clearGroup,

    downloadTemplate,
    importTagsByGroups,
    isExporting,
    ExportTagsByGroups,

    goTagPage,
  }
}
