import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { debounce } from 'lodash'
import { EmqxMessage } from '@emqx/emqx-ui'
import { deleteTag, queryTagList } from '@/api/template'
import type { TagData, TagForm } from '@/types/config'
import usePaging from '@/composables/usePaging'
import { MessageBoxConfirm } from '@/utils/element'
import { OmitArrayFields } from '@/utils/utils'

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

  const queryKeyword = ref({
    name: '',
  })

  const template = computed(() => route.params.template.toString())
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
    const checkedList: Array<TagDataInTable> = tagList.value.filter(({ checked }) => checked)
    const newCheckedList: Array<TagData> = OmitArrayFields(checkedList, ['checked'])
    return newCheckedList
  })

  const currentTag: Ref<TagForm> = ref({} as TagForm)

  const { totalData, setTotalData, getAPageData } = usePaging()

  const getAPageTagData = () => {
    const { data, meta } = getAPageData(pageController.value)
    tagList.value = data
    pageController.value.total = meta.total
  }

  const getTagList = async () => {
    isListLoading.value = true
    const params = {
      template: template.value,
      group: groupName.value,
      ...queryKeyword.value,
    }
    const data = await queryTagList(params)
    setTotalData(data.map((item) => Object.assign(item, { checked: false })))
    getAPageTagData()
    isListLoading.value = false
  }

  // debounce
  const dbGetTagList = debounce(() => {
    getTagList()
  }, 500)

  const refreshTable = () => {
    pageController.value.pageNum = 1
    getTagList()
  }

  const handleSizeChange = (size: number) => {
    pageController.value.pageSize = size
    pageController.value.pageNum = 1
    getAPageTagData()
  }

  // Delele tags
  const deleteTagList = async (list: Array<TagData>) => {
    const params = {
      template: template.value,
      group: groupName.value,
      tags: list.map(({ name }) => name),
    }
    await deleteTag(params)
    EmqxMessage.success(t('common.operateSuccessfully'))
    refreshTable()
  }

  const delTag = async (item: TagDataInTable) => {
    await MessageBoxConfirm()

    const delList = OmitArrayFields([item], ['checked'])
    deleteTagList(delList)
  }

  const batchDeleteTag = async () => {
    await MessageBoxConfirm()

    deleteTagList(tagCheckedList.value)
  }

  const clearTag = async () => {
    await MessageBoxConfirm(t('common.confirmClear'))
    deleteTagList(totalData.value)
  }

  const goCreatePage = () => {
    // TODO
  }

  // TODO: Edit tag
  const editTag = (tag: TagDataInTable) => {
    console.log('edit tag', tag)
  }

  getTagList()

  return {
    template,
    groupName,

    isListLoading,
    tagList,
    totalData,
    tagCheckedList,
    allChecked,

    queryKeyword,

    pageController,
    getAPageTagData,
    handleSizeChange,

    getTagList,
    dbGetTagList,
    refreshTable,

    delTag,
    clearTag,
    batchDeleteTag,

    goCreatePage,
    currentTag,
    editTag,
  }
}
