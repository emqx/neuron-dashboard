import type { Ref } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RawTemplateDate } from '@/types/config'
import { queryTemplateList, deleteTemplate } from '@/api/template'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'

export default () => {
  const { t } = useI18n()

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

  const goGroupPage = (rowData: RawTemplateDate) => {
    console.log('row', rowData)
  }
  const editTemplate = (rowData: RawTemplateDate) => {
    console.log('row', rowData)
  }
  const removeTemplate = async (rowData: RawTemplateDate) => {
    try {
      await MessageBoxConfirm() // Phase 2 support: t('template.deleteTemplateTip')
      const { name } = rowData
      await deleteTemplate(name)
      EmqxMessage.success(t('common.operateSuccessfully'))
      getTemplateList()
    } catch (error) {
      console.error(error)
    }
  }

  getTemplateList()
  return {
    templateList,
    isListLoading,
    getTemplateList,
    goGroupPage,
    removeTemplate,
    editTemplate,
  }
}
