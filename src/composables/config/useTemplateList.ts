import type { Ref } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RawTemplateData } from '@/types/config'
import { queryTemplateList, deleteTemplate, getTemplateDetailByName } from '@/api/template'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { useDownload } from '@/composables/useDownload'

export default () => {
  const { t } = useI18n()

  const templateList: Ref<Array<RawTemplateData>> = ref([])
  const isListLoading = ref(false)

  const getTemplateList = async () => {
    try {
      isListLoading.value = true
      templateList.value = await queryTemplateList()
    } finally {
      isListLoading.value = false
    }
  }

  const goGroupPage = (rowData: RawTemplateData) => {
    console.log('row', rowData)
  }
  const editTemplate = (rowData: RawTemplateData) => {
    console.log('row', rowData)
  }
  const removeTemplate = async (rowData: RawTemplateData) => {
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

  const { downloadFile } = useDownload()
  const exportTemplate = async (rowData: RawTemplateData) => {
    try {
      const { name } = rowData
      const { data } = await getTemplateDetailByName(name)
      const dataJSON = JSON.stringify(data, null, 2)
      const blobData = new Blob([dataJSON])
      downloadFile({ 'content-type': 'application/octet-stream', 'content-disposition': `filename=${name}` }, blobData)
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
    exportTemplate,
  }
}
