import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { addTag } from '@/api/template'
import type { PluginInfo, TagFormItem, AddTagListForm } from '@/types/config'
import type TagFormCom from '@/views/config/southDriver/components/TagForm.vue'
import AddTagCommon, { createTagForm } from '@/composables/config/useAddTagCommon'
import { useTemplatePluginInfo } from '@/composables/config/usePluginInfo'

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const { groupName, handlePartialSuc, sliceTagList, parseTagData, handleValidTagFormError } = AddTagCommon()

  const tagFormRef = ref()
  const tagFormComList: Ref<Array<typeof TagFormCom>> = ref([])

  const { createRawTagForm } = createTagForm()
  const tagList: Ref<Array<TagFormItem>> = ref([createRawTagForm()])
  const formData: Ref<AddTagListForm> = ref({
    tagList: tagList.value,
  })
  const isSubmitting = ref(false)

  const pluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  const template = computed(() => route.params.template.toString())

  const { getTemplatePluginInfo } = useTemplatePluginInfo()

  const getTemplatePluginConfigInfo = async () => {
    pluginInfo.value = await getTemplatePluginInfo()
  }

  const setFormRef = (com: typeof TagFormCom) => {
    if (com) {
      tagFormComList.value.push(com)
    }
  }

  const addTagItem = () => {
    formData.value.tagList.push(createRawTagForm())
  }

  const deleteTagItem = (index: number) => {
    formData.value.tagList.splice(index, 1)
  }

  const addTags = async () => {
    try {
      const tags = await parseTagData(formData.value.tagList)

      await addTag({ tags, template: template.value, group: groupName.value })
      return Promise.resolve()
    } catch (error: any) {
      const { data = {} } = error
      if (data.error !== 0 && data.index !== undefined) {
        handlePartialSuc(data.index, data.error)
        formData.value.tagList = sliceTagList(formData.value.tagList, data.index)
      }
      return Promise.reject(error)
    }
  }

  const validateTagForm = async () => {
    try {
      await tagFormRef.value.validate()
      return Promise.resolve()
    } catch (error) {
      handleValidTagFormError(error)
      return Promise.reject(error)
    }
  }

  const submit = async () => {
    try {
      isSubmitting.value = true
      await validateTagForm()
      await addTags()
      EmqxMessage.success(t('common.createSuccess'))
      router.push({
        name: 'TemplateGroupTag',
      })
    } catch (error) {
      console.error(error)
    } finally {
      isSubmitting.value = false
    }
  }

  const cancel = () => {
    router.back()
  }

  getTemplatePluginConfigInfo()
  return {
    pluginInfo,

    tagFormRef,
    setFormRef,

    createRawTagForm,
    formData,
    isSubmitting,

    addTagItem,
    deleteTagItem,

    cancel,
    submit,
  }
}
