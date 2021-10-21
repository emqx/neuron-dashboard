import { ref, computed } from 'vue'
import { writeData } from '@/api/data'
import { EmqxMessage } from '@emqx/emqx-ui'
import useWriteDataCheckNParse, { WriteDataErrorCode } from '@/composables/data/useWriteDataCheckNParse'
import { useI18n } from 'vue-i18n'
import { TagDataInTable } from '@/composables/data/useDataMonitoring'
import { TagType } from '@/types/enums'

export interface Group {
  nodeID: string
  groupName: string
}

type Props = Readonly<
  {
    modelValue?: unknown
    group?: unknown
    tag?: unknown
  } & {
    modelValue: boolean
  } & {
    group?: Group | undefined
    tag?: TagDataInTable | undefined
  }
>

export default (props: Props) => {
  const { t } = useI18n()

  const inputErrorMsg = ref('')
  const createErrorMsg = (prefix: string, suffix: string) => {
    if (!props.tag?.type) {
      return ''
    }
    return prefix + TagType[props.tag?.type] + suffix
  }
  const errorMsgMap = computed(() => ({
    [WriteDataErrorCode.FormattingError]: createErrorMsg(
      t('data.writeDataFormattingErrorPrefix'),
      t('data.writeDataFormattingErrorSuffix'),
    ),
    [WriteDataErrorCode.LessThanMinimum]: createErrorMsg(
      t('data.writeDataMinimumErrorPrefix'),
      t('data.writeDataMinimumErrorSuffix'),
    ),
    [WriteDataErrorCode.GreaterThanMaximum]: createErrorMsg(
      t('data.writeDataMaximumErrorPrefix'),
      t('data.writeDataMaximumErrorSuffix'),
    ),
    [WriteDataErrorCode.LessThanMinSafeInteger]: t('data.writeDataSafeMinimumError'),
    [WriteDataErrorCode.GreaterThanMaxSafeInteger]: t('data.writeDataSafeMaximumError'),
  }))

  const inputValue = ref('')
  const isSubmitting = ref(false)

  const { checkWriteData, parseWriteData } = useWriteDataCheckNParse()

  const validate = async () => {
    const { type } = props.tag as TagDataInTable
    try {
      await checkWriteData(type, inputValue.value)
      inputErrorMsg.value = ''
      return Promise.resolve()
    } catch (error: any) {
      inputErrorMsg.value = errorMsgMap.value[Number(error.message) as keyof typeof errorMsgMap.value]
      return Promise.reject()
    }
  }

  const submit = async () => {
    try {
      const { nodeID, groupName } = props.group as Group
      const { id, type } = props.tag as TagDataInTable
      await validate()
      isSubmitting.value = true

      const value = parseWriteData(type, inputValue.value)
      await writeData({
        node_id: Number(nodeID),
        group_config_name: groupName,
        tags: [
          {
            value,
            id,
          },
        ],
      })
      EmqxMessage.success(t('common.submitSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }
  return { validate, inputErrorMsg, inputValue, isSubmitting, checkWriteData, parseWriteData, submit }
}
