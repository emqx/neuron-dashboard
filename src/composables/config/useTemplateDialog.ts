import { ref, computed, watch, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TemplateFormData } from '@/types/config'
import { createTemplate, updateTemplate } from '@/api/template'
import { EmqxMessage } from '@emqx/emqx-ui'
import { cloneDeep } from 'lodash'

export const useTemplateForm = () => {
  const createTemplateForm = (): TemplateFormData => ({
    name: '',
    plugin: '',
    groups: [],
  })
  return {
    createTemplateForm,
  }
}

interface TemplateProps {
  modelValue: boolean
  isEdit?: boolean
  isImport?: boolean
  templateData: TemplateFormData
}
export default (props: TemplateProps) => {
  const { t } = useI18n()

  const { createTemplateForm } = useTemplateForm()

  const formRef = ref()
  const templateForm: Ref<TemplateFormData> = ref(createTemplateForm())
  const isSubmitting = ref(false)

  const rules = computed(() => {
    return {
      name: [{ required: true, message: t('config.nameRequired') }],
      plugin: [{ required: true, message: t('config.pluginRequired') }],
    }
  })

  const dialogTitle = computed(() => {
    let title = ''
    if (props.isImport) {
      title = t('template.importTemplate')
    } else {
      title = !props.isEdit ? t('template.addTemplate') : t('template.editTemplate')
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

      const data = templateForm.value
      if (!props.isEdit || props.isImport) {
        await createTemplate(data)

        const message = !props.isImport ? t('common.createSuccess') : t('common.importSuccess')
        EmqxMessage.success(message)
      } else {
        // TODO: edit
        await updateTemplate(data)
        EmqxMessage.success(t('common.updateSuccess'))
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  const initTemplateData = () => {
    if (props.isImport) {
      templateForm.value = cloneDeep(props.templateData)
    }
  }

  watch(
    () => props.templateData.name,
    (newV) => {
      if (newV) {
        nextTick(() => {
          initTemplateData()
        })
      }
    },
    { immediate: true },
  )
  return {
    createTemplateForm,
    formRef,
    templateForm,
    dialogTitle,
    isSubmitting,
    rules,
    initForm,
    submitData,
  }
}
