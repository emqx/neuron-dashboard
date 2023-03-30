import { ref, computed } from 'vue'
import { writeData } from '@/api/data'
import { EmqxMessage } from '@emqx/emqx-ui'
import useWriteDataCheckNParse, { WriteDataErrorCode } from '@/composables/data/useWriteDataCheckNParse'
import { useI18n } from 'vue-i18n'
import type { TagDataInTable } from '@/composables/data/useDataMonitoring'
import { TagType } from '@/types/enums'

export interface Group {
  node: string
  group: string
}

type Props = Readonly<
  {
    modelValue?: unknown
    group?: unknown
    tag?: unknown
    nodeName?: unknown
  } & {
    modelValue: boolean
  } & {
    group?: string | undefined
    tag?: TagDataInTable | undefined
    nodeName?: string | undefined
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
  const isUseHexadecimal = ref(false)
  const isSubmitting = ref(false)

  const { checkFloat, checkHexadecimal, checkWriteData, parseWriteData, transToDecimal, transToHexadecimal } =
    useWriteDataCheckNParse()

  const showToggleHexadecimalSwitch = computed(() => {
    return (
      props.tag?.type &&
      props.tag.type !== TagType.BYTE &&
      props.tag.type !== TagType.BOOL &&
      props.tag.type !== TagType.BIT &&
      props.tag.type !== TagType.STRING
    )
  })

  // change to hexadecimal
  const handleIsUseHexadecimalChanged = async () => {
    if (isUseHexadecimal.value) {
      inputValue.value = await transToHexadecimal({ ...props.tag, value: inputValue.value } as TagDataInTable)
    } else {
      inputValue.value = await transToDecimal({ ...props.tag, value: inputValue.value } as TagDataInTable)
    }
  }

  const validate = async () => {
    const { type } = props.tag as TagDataInTable

    try {
      if (isUseHexadecimal.value) {
        await checkHexadecimal(inputValue.value)
      }
    } catch (error) {
      inputErrorMsg.value = t('data.hexadecimalError')
      return
    }
    try {
      const trueValue = isUseHexadecimal.value
        ? await transToDecimal({ ...props.tag, value: inputValue.value } as TagDataInTable)
        : inputValue.value

      // when  `decimal` = 0, all other types can be enter as `float`, excepet for `bit` type
      const decimal = props.tag?.decimal
      if (decimal !== undefined && decimal !== null && decimal === 0) {
        await checkWriteData(type, trueValue)
        inputErrorMsg.value = ''
        return Promise.resolve()
      }

      const checkValueRes = await Promise.allSettled([
        checkFloat.bind(null, trueValue)(),
        checkWriteData(type, trueValue),
      ])
      const checkRes = checkValueRes.map((item: any) => item?.value || false)
      if (!checkRes.includes(true)) {
        inputErrorMsg.value = errorMsgMap.value[Number('1') as keyof typeof errorMsgMap.value]
        return Promise.reject()
      }

      inputErrorMsg.value = ''
      return Promise.resolve()
    } catch (error: any) {
      inputErrorMsg.value = errorMsgMap.value[Number(error.message) as keyof typeof errorMsgMap.value]
      return Promise.reject()
    }
  }

  const submit = async () => {
    try {
      const { group } = props
      const { name: tagName, type } = props.tag as TagDataInTable
      const nodeName = props.nodeName as string
      await validate()
      isSubmitting.value = true

      const trueValue = isUseHexadecimal.value
        ? await transToDecimal({ ...props.tag, value: inputValue.value } as TagDataInTable)
        : inputValue.value
      const value = parseWriteData(type, trueValue)
      await writeData({
        node: nodeName,
        group: group as string,
        tag: tagName as string,
        value,
      })
      EmqxMessage.success(t('common.submitSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }
  return {
    inputErrorMsg,
    inputValue,
    isUseHexadecimal,
    isSubmitting,

    showToggleHexadecimalSwitch,

    validate,
    handleIsUseHexadecimalChanged,
    checkWriteData,
    parseWriteData,
    submit,
  }
}
