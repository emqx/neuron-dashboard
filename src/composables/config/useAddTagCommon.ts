import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import type { TagFormItem, TagForm } from '@/types/config'
import { TagType, TagAttributeType } from '@/types/enums'
import { getErrorMsg, popUpErrorMessage, dataType, createRandomString } from '@/utils/utils'
import useWriteDataCheckNParse from '@/composables/data/useWriteDataCheckNParse'

export const useTagTypeSelect = () => {
  const tagTypeOptList = Object.keys(TagType)
    .filter((key) => typeof TagType[key as keyof typeof TagType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagType[key as keyof typeof TagType],
    }))

  const findLabelByValue = (val: number) => tagTypeOptList.find(({ value }) => val === value)?.label || ''

  const findValueByLabel = (lab: TagType) => tagTypeOptList.find(({ label }) => label === lab)?.value || undefined

  return {
    tagTypeOptList,
    findLabelByValue,
    findValueByLabel,
  }
}

export const useTagAttributeTypeSelect = () => {
  const tagAttributeTypeOptList = Object.keys(TagAttributeType)
    .filter((key) => typeof TagAttributeType[key as keyof typeof TagAttributeType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagAttributeType[key as keyof typeof TagAttributeType],
    }))

  /** Tag `attribute` possible value
   *  Options: 1, 2, 4, 8
   *  key-value: 'value' is selected values; 'key' is the cumulative of values;
   *  For example, 6: [2, 4], means that the the currently selected values are 2, 4, then the `key` is the sum of 2 and 4, i.e. 6.
   */
  const tagAttrValueMap = {
    1: [1],
    2: [2],
    3: [1, 2],
    4: [4],
    5: [1, 4],
    6: [2, 4],
    7: [1, 2, 4],
    8: [8],
    9: [1, 8],
    10: [2, 8],
    11: [1, 2, 8],
    12: [4, 8],
    13: [1, 4, 8],
    14: [2, 4, 8],
    15: [1, 2, 4, 8],
  }

  const findLabelByValue = (val: number) => tagAttributeTypeOptList.find(({ value }) => val === value)?.label || ''
  const findValueByLabel = (lab: any) => tagAttributeTypeOptList.find(({ label }) => label === lab)?.value || undefined

  const getAttrStrByValue = (val: number, filler = ', ') => {
    const key = Number(Object.keys(tagAttrValueMap).find((total) => Number(total) === val))
    const valueArr = tagAttrValueMap[key as keyof typeof tagAttrValueMap]
    return valueArr.map((value) => findLabelByValue(value)).join(filler)
  }

  // "Write Subscribe" to 5
  const getTotalValueByStr = (str: string, separator: string): number | undefined => {
    try {
      if (!str) {
        return undefined
      }
      const labelArr = str.split(separator)
      let ret = 0
      let currentValue: number | undefined = 0
      for (const label of labelArr) {
        currentValue = findValueByLabel(label)
        if (!currentValue) {
          return undefined
        }
        ret += currentValue
      }
      return ret
    } catch (error) {
      return undefined
    }
  }

  // attr values is include the attr value
  const isAttrsIncludeTheValue = (value: number | undefined, attr: number) => {
    if (!value || !attr) return false

    const key = Object.keys(tagAttrValueMap).find((total) => {
      return Number(total) === value
    })
    const attrValues = tagAttrValueMap[Number(key) as keyof typeof tagAttrValueMap]
    return attrValues.includes(attr)
  }

  return {
    tagAttributeTypeOptList,
    tagAttrValueMap,
    getAttrStrByValue,
    findLabelByValue,
    getTotalValueByStr,
    isAttrsIncludeTheValue,
  }
}

export const useTagPrecision = () => {
  const isShowPrecisionField = computed(() => (type: number | null) => {
    if (type === null || type === undefined) return false

    const whiteList = [9, 10] // FLOAT | DOUBLE
    const res: boolean = whiteList.includes(type)
    return res
  })

  const tagPrecisionValue = computed(() => (type: number, value: number) => {
    if (!isShowPrecisionField.value(type)) {
      return '-'
    }
    return !value ? '-' : value
  })

  return {
    isShowPrecisionField,
    tagPrecisionValue,
  }
}

export const useTagDecimal = () => {
  const tagDecimalValue = computed(() => (value: number) => {
    if (!value) {
      return '-'
    }
    return value
  })

  return {
    tagDecimalValue,
  }
}
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
