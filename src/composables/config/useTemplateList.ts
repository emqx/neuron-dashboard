import { ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { RawTemplateData, TemplateFormData } from '@/types/config'
import { queryTemplateList, deleteTemplate, getTemplateDetailByName } from '@/api/template'
import { EmqxMessage } from '@emqx/emqx-ui'
import { MessageBoxConfirm } from '@/utils/element'
import { useTemplateForm } from '@/composables/config/useTemplateDialog'
import { useDownload } from '@/composables/useDownload'
import { dataType, isJSONData } from '@/utils/utils'

export const useTemplateListMap = () => {
  const templateListMap: Ref<Array<RawTemplateData>> = ref([])

  const getAllTemplates = async () => {
    try {
      templateListMap.value = await queryTemplateList()
      return Promise.resolve(templateListMap.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return {
    templateListMap,
    getAllTemplates,
  }
}

export default () => {
  const router = useRouter()
  const { t } = useI18n()
  const { createTemplateForm } = useTemplateForm()

  const templateList: Ref<Array<RawTemplateData>> = ref([])
  const isListLoading = ref(false)
  const templateDialogVisible = ref(false)
  const isEditTemplate = ref(false)
  const isImportTemplate = ref(false)
  const editTemplateData: Ref<TemplateFormData> = ref(createTemplateForm())

  const { getAllTemplates } = useTemplateListMap()
  const getTemplateList = async () => {
    try {
      isListLoading.value = true
      templateList.value = await getAllTemplates()
    } finally {
      isListLoading.value = false
    }
  }

  const showTemplateDialog = () => {
    templateDialogVisible.value = true
  }

  const goGroupPage = (rowData: RawTemplateData) => {
    const { name, plugin } = rowData
    router.push({
      name: 'TemplateGroup',
      params: {
        template: name,
        plugin,
      },
    })
  }
  const editTemplate = (rowData: RawTemplateData) => {
    // TODO
    isEditTemplate.value = true
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

  const { downloadFile, readTextFile } = useDownload()
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

  // import file
  const importFile = async (file: File) => {
    if (dataType(file) !== 'file') {
      EmqxMessage.error(t('common.notJSONData'))
    }

    isImportTemplate.value = true
    const fileData: unknown = await readTextFile(file)

    try {
      await isJSONData(String(fileData))
      const jsonData = JSON.parse(String(fileData)) || createTemplateForm()

      const { name, plugin } = jsonData
      if (!name) {
        EmqxMessage.error(t('template.missingNameInFile'))
      }
      if (!plugin) {
        EmqxMessage.error(t('template.missingPluginInFile'))
      }
      if (name && plugin) {
        editTemplateData.value = jsonData
        templateDialogVisible.value = true
      }
    } catch (error) {
      EmqxMessage.error(t('common.jsonFormatError'))
    } finally {
      isImportTemplate.value = false
    }

    // Capture uploader action
    return Promise.reject()
  }

  const cancelOperateTemplate = () => {
    isEditTemplate.value = false
    isImportTemplate.value = false
    editTemplateData.value = createTemplateForm()
  }

  getTemplateList()
  return {
    templateList,
    isListLoading,
    getTemplateList,
    templateDialogVisible,
    showTemplateDialog,
    goGroupPage,
    removeTemplate,
    editTemplate,
    exportTemplate,
    importFile,
    isImportTemplate,
    editTemplateData,
    isEditTemplate,
    cancelOperateTemplate,
  }
}
