import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RawTemplateData, TemplateFormData } from '@/types/config'
import { createTemplate, updateTemplate } from '@/api/template'
import { EmqxMessage } from '@emqx/emqx-ui'

const createTemplateForm = (): TemplateFormData => ({
  name: '',
  plugin: '',
  groups: [],
})

interface TemplateProps {
  modelValue: boolean
  formData?: TemplateFormData
  isImport?: boolean
}
export default (props: TemplateProps) => {
  const { t } = useI18n()

  const formRef = ref()
  const templateForm: Ref<TemplateFormData> = ref(createTemplateForm())
  const isSubmitting = ref(false)

  const rules = {
    name: [{ required: true, message: t('config.nameRequired') }],
    plugin: [{ required: true, message: t('config.pluginRequired') }],
  }

  const dialogTitle = computed(() => {
    let title = ''
    if (props.isImport) {
      title = t('template.importTemplate')
    } else {
      title = !props.formData ? t('template.addTemplate') : t('template.editTemplate')
    }
    return title
  })

  const initForm = async () => {
    formRef.value.resetField()
    templateForm.value = createTemplateForm()
  }

  const submitData = async () => {
    try {
      await formRef.value.validate()
      isSubmitting.value = true
      if (!props.formData || (props.formData && props.isImport)) {
        await createTemplate(templateForm.value)
        const message = !props.isImport ? t('common.createSuccess') : t('common.importSuccess')
        EmqxMessage.success(message)
      } else {
        // TODO: edit
        await updateTemplate(templateForm.value)
        EmqxMessage.success(t('common.updateSuccess'))
      }
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }
  return {
    formRef,
    templateForm,
    dialogTitle,
    isSubmitting,
    rules,
    initForm,
    submitData,
  }
}
