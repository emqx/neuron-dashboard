import type { Ref } from 'vue'
import { ref } from 'vue'
import type { RawTemplateDate } from '@/types/config'
import { queryTemplateList } from '@/api/template'

export default () => {
  const templateList: Ref<Array<RawTemplateDate>> = ref([])
  const isListLoading = ref(false)

  const getTemplateList = async () => {
    try {
      isListLoading.value = true
      templateList.value = await queryTemplateList()
    } finally {
      isListLoading.value = false
    }
  }

  const goGroupPage = (row: RawTemplateDate) => {
    console.log('row', row)
  }
  const editTemplate = (row: RawTemplateDate) => {
    console.log('row', row)
  }
  const deleteTemplate = (row: RawTemplateDate) => {
    console.log('row', row)
  }

  getTemplateList()
  return {
    templateList,
    isListLoading,
    getTemplateList,
    goGroupPage,
    deleteTemplate,
    editTemplate,
  }
}
