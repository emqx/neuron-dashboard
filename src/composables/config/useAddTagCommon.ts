import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import type { TagFormItem, TagForm } from '@/types/config'
import { getErrorMsg, popUpErrorMessage, dataType, createRandomString } from '@/utils/utils'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'

export const createTagForm = () => {
  const createRawTagForm = (): TagFormItem => ({
    name: '',
    address: '',
    attribute: undefined,
    type: null,
    // for the key when use v-for
    id: createRandomString(6),
    decimal: null,
    description: '',
    precision: undefined,
    value: undefined,
  })

  return {
    createRawTagForm,
  }
}

export default () => {
  const route = useRoute()
  const { t } = useI18n()

  const groupName = computed(() => route.params.group as string)

  const sliceTagList = (list: TagFormItem[], errIndex: number) => {
    const newList = list.slice(errIndex)
    return newList
  }

  const handlePartialSuc = (errIndex: number, errorNum: number) => {
    if (errIndex === 0) {
      popUpErrorMessage(errorNum)
      return
    }
    EmqxMessage.error(t('config.tagPartAddedFailedPopup', [getErrorMsg(errorNum)]))
  }

  const handleValidTagFormError = (error: any) => {
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
  }

  const { parseWriteData } = useWriteDataCheckNParse()
  const parseTagData = async (tagList: TagFormItem[]): Promise<TagForm[]> => {
    const tags: TagForm[] = tagList.map(({ id, ...tagData }) => {
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
    return tags
  }

  return {
    groupName,

    handlePartialSuc,
    sliceTagList,

    parseTagData,

    handleValidTagFormError,
  }
}
