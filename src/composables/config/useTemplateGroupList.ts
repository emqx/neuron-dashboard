import type { Ref } from 'vue'
import { ref, computed } from 'vue'
// import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { queryGroupList } from '@/api/template'
import type { GroupData } from '@/types/config'
import { OmitArrayFields } from '@/utils/utils'
// import useUploadTagList from '@/composables/config/useUploadTagList'
// import useExportTagTable from '@/composables/config/useExportTagTable'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  // const { t } = useI18n()
  const route = useRoute()
  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  // const { uploadTag } = useUploadTagList()
  // const { isExporting, exportTable } = useExportTagTable()

  const template = computed(() => route.params.template.toString())
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
    const data = await queryGroupList(template.value)
    groupList.value = data.map((item) => Object.assign(item, { checked: false }))
    isListLoading.value = false
  }

  const delGroup = async ({ name }: GroupDataInTable) => {
    // TODO
    console.log('del', name)
  }

  const batchDeleteGroup = () => {
    // TODO
  }

  const clearGroup = () => {
    // TODO
  }

  const downloadTemplate = () => {
    // TODO
  }
  const importTagsByGroups = () => {
    // TODO
  }

  const ExportTagsByGroups = () => {
    // TODO
  }

  const goTagPage = ({ name }: GroupData) => {
    // TODO
    console.log('go to tag', name)
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
    ExportTagsByGroups,

    goTagPage,
  }
}
