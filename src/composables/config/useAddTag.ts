import { addTag } from '@/api/config'
import type { TagFormItem, AddTagListForm, TagForm } from '@/types/config'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import type TagFormCom from '@/views/config/southDriver/components/TagForm.vue'
import { dataType, getErrorMsg, popUpErrorMessage } from '@/utils/utils'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'
import { createTagForm } from '@/composables/config/useAddTagCommon'
import { useNodePluginInfo } from './usePluginInfo'

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()
  const { createRawTagForm } = createTagForm()

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
      popUpErrorMessage(errorNum)
      return
    }
    EmqxMessage.error(t('config.tagPartAddedFailedPopup', [getErrorMsg(errorNum)]))
    formData.value.tagList = formData.value.tagList.slice(errIndex)
  }

  const { parseWriteData } = useWriteDataCheckNParse()
  const addTags = async () => {
    try {
      const groupName: string = route.params.group as string
      const tags: TagForm[] = formData.value.tagList.map(({ id, ...tagData }) => {
        const data = tagData
        const { type, value } = data
        if (value !== undefined && value !== null) {
          /** let it go, when the tags value use hexadecimal, and sync EditTagDialog.vue
           * const newValue = isUseHexadecimal.value ? await transToDecimal({ ...tagData, value } as TagDataInTable): value
           */
          data.value = parseWriteData(Number(type), String(value))
        }

        return data
      })
      await addTag({ tags, node: node.value, group: groupName })
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
      let errorRows: string[] = []

      const errorData = error || {}
      if (dataType(errorData) === 'object') {
        const keys = Object.keys(errorData)
        keys.forEach((field: string) => {
          const fieldSplit = field.split('.')
          if (
            fieldSplit &&
            fieldSplit[1] &&
            dataType(Number(fieldSplit[1])) === 'number' &&
            !errorRows.includes(fieldSplit[1])
          ) {
            errorRows.push(fieldSplit[1])
          }
        })
      }

      errorRows = errorRows.sort()
      const errorRow = errorRows[0]
      if (errorRow) {
        EmqxMessage.error(t('config.tableRowDataError', { rowNum: Number(errorRow) + 1 }))
      }
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
