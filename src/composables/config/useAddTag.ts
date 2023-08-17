import { addTag } from '@/api/config'
import type { TagFormItem, AddTagListForm } from '@/types/config'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import type TagFormCom from '@/views/config/southDriver/components/TagForm.vue'
import { getErrorMsg, popUpErrorMessage } from '@/utils/utils'
import AddTagCommon, { createTagForm } from '@/composables/config/useAddTagCommon'
import { useNodePluginInfo } from './usePluginInfo'

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()
  const { createRawTagForm } = createTagForm()

  const { groupName, parseTagData, handleValidTagFormError } = AddTagCommon()

  const tagFormComList: Ref<Array<typeof TagFormCom>> = ref([])
  const tagList: Ref<Array<TagFormItem>> = ref([createRawTagForm()])
  const formData: Ref<AddTagListForm> = ref({
    tagList: tagList.value,
  })
  const isSubmitting = ref(false)

  const node = computed(() => route.params.node.toString())

  const { nodePluginInfo, getNodePluginInfo } = useNodePluginInfo()

  const tagFormRef = ref()
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

  const handlePartialSuc = (errIndex: number, errorNum: number) => {
    if (errIndex === 0) {
      if (errorNum === 2405) {
        EmqxMessage.error(t('error.addTagByNode2405'))
      } else {
        popUpErrorMessage(errorNum)
      }
      return
    }

    EmqxMessage.error(t('config.tagPartAddedFailedPopup', [getErrorMsg(errorNum)]))
    formData.value.tagList = formData.value.tagList.slice(errIndex)
  }

  const addTags = async () => {
    try {
      const tags = await parseTagData(formData.value.tagList)

      await addTag({ tags, node: node.value, group: groupName.value })
      return Promise.resolve()
    } catch (error: any) {
      const { data = {} } = error
      if (data.error !== 0 && data.index !== undefined) {
        handlePartialSuc(data.index, data.error)
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
        name: 'SouthDriverGroupTag',
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

  getNodePluginInfo()
  return {
    nodePluginInfo,
    formData,
    isSubmitting,

    createRawTagForm,
    addTagItem,
    deleteTagItem,
    tagFormRef,
    setFormRef,
    cancel,
    submit,
  }
}
