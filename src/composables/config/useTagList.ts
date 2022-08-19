import { deleteTag, queryTagList } from '@/api/config'
import type { TagData, TagForm } from '@/types/config'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessage, EmqxMessageBox } from '@emqx/emqx-ui'
import usePaging from '@/composables/usePaging'

interface TagDataInTable extends TagData {
  checked: boolean
}

export default () => {
  const route = useRoute()
  const { t } = useI18n()

  const tagList: Ref<Array<TagDataInTable>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  const pageController = ref({
    pageNum: 1,
    pageSize: 50,
    total: 0,
  })

  const node = computed(() => route.params.node.toString())
  const groupName = computed(() => route.params.group as string)

  const allChecked = computed({
    get() {
      if (tagList.value.length === 0) {
        return false
      }
      return tagList.value.every(({ checked }) => checked)
    },
    set(val: boolean) {
      tagList.value.forEach((item) => {
        item.checked = val
      })
    },
  })

  const tagCheckedList = computed(() => {
    const checked_list = tagList.value.filter(({ checked }) => checked)
    return checked_list
  })

  const currentTag: Ref<TagForm> = ref({} as TagForm)
  const showEditDialog = ref(false)

  const { totalData, setTotalData, getAPageData } = usePaging()

  const getAPageTagData = () => {
    const { data, meta } = getAPageData(pageController.value)
    tagList.value = data
    pageController.value.total = meta.total
  }

  const getTagList = async () => {
    isListLoading.value = true
    const data = await queryTagList(node.value, groupName.value)
    setTotalData(data.map((item) => Object.assign(item, { checked: false })))
    getAPageTagData()
    isListLoading.value = false
  }

  const refreshTable = () => {
    pageController.value.pageNum = 1
    getTagList()
  }

  const handleSizeChange = (size: number) => {
    pageController.value.pageSize = size
    pageController.value.pageNum = 1
    getAPageTagData()
  }

  const deleteTagList = async (list: Array<TagDataInTable>) => {
    await deleteTag({
      node: node.value,
      group: groupName.value,
      tags: list.map(({ name }) => name),
    })
    EmqxMessage.success(t('common.operateSuccessfully'))
    refreshTable()
  }

  const delTag = async (item: TagDataInTable) => {
    await EmqxMessageBox.confirm(t('common.confirmDelete'), t('common.operateConfirm'))
    deleteTagList([item])
  }

  const editTag = (tag: TagForm) => {
    currentTag.value = tag
    showEditDialog.value = true
  }

  const batchDeleteTag = async () => {
    await EmqxMessageBox.confirm(t('common.confirmDelete'), t('common.operateConfirm'))
    deleteTagList(totalData.value.filter(({ checked }) => checked))
  }

  const clearTag = async () => {
    await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmClear') })
    deleteTagList(totalData.value)
  }

  getTagList()

  return {
    node,
    groupName,
    tagList,
    tagCheckedList,
    totalData,
    pageController,
    isListLoading,
    allChecked,
    currentTag,
    showEditDialog,
    getAPageTagData,
    handleSizeChange,
    refreshTable,
    getTagList,
    editTag,
    delTag,
    clearTag,
    batchDeleteTag,
  }
}
