import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { addGroup, updateGroup } from '@/api/template'
import { useTemplatePluginInfo } from '@/composables/config/usePluginInfo'
import type { TemplateGroup, TemplateGroupForm } from '@/types/config'

export default () => {
  const createRawForm = (): TemplateGroupForm => ({
    group: '',
    template: null,
    interval: null,
  })

  const { t } = useI18n()
  const route = useRoute()

  // get template& its plugin
  const template = computed(() => route.params.template.toString())

  const groupDialogVisible = ref(false)
  const groupForm = ref(createRawForm())
  const isEditGroup = ref(false)
  const isSubmitting = ref(false)

  const showDialog = () => {
    groupDialogVisible.value = true
    groupForm.value.template = template.value
  }

  // Get group default interval
  const { getTemplatePluginInfo } = useTemplatePluginInfo()
  const getPluginConfigInfo = async () => {
    const data = await getTemplatePluginInfo()
    const { group_interval } = data

    if (group_interval !== undefined || group_interval !== null) {
      groupForm.value.interval = group_interval || null
    }
  }

  // Handle add group
  const handleAddGroup = () => {
    showDialog()
    isEditGroup.value = false
    // set plugin default inteval
    getPluginConfigInfo()
  }

  // Handle edit group
  const handleEditGroup = (groupRowData: TemplateGroup) => {
    const { name, interval } = groupRowData

    isEditGroup.value = true
    showDialog()

    groupForm.value = {
      ...groupForm.value,
      group: name,
      interval,
    }
  }

  /**
   * Create or Update group
   */
  const submitForm = async () => {
    try {
      isSubmitting.value = true

      const data = { ...groupForm.value, template: template.value }
      if (!isEditGroup.value) {
        await addGroup(data)
      } else {
        await updateGroup(data)
      }

      EmqxMessage.success(t('common.submitSuccess'))
      groupDialogVisible.value = false
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    groupForm,

    groupDialogVisible,
    isEditGroup,
    getPluginConfigInfo,
    handleAddGroup,
    handleEditGroup,

    isSubmitting,
    submitForm,
  }
}
