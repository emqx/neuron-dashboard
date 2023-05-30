import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTagTypeSelect, useTagAttributeTypeSelect } from '@/composables/config/useAddTagCommon'
import type { PluginInfo, TagRegex } from '@/types/config'
import useWriteDataCheckNParse, { WriteDataErrorCode } from '@/composables/data/useWriteDataCheckNParse'
import { TagType, TagAttributeType } from '@/types/enums'
import type { TagDataInTable } from '@/composables/data/useDataMonitoring'

export default (props: any) => {
  const { t } = useI18n()
  const formCom = ref()

  const { isAttrsIncludeTheValue } = useTagAttributeTypeSelect()

  const isAttrsIncludeStatic = computed(() => (attr: number | undefined) => {
    return isAttrsIncludeTheValue(attr, TagAttributeType.Static)
  })

  const tagRegex = computed(() => {
    return props?.nodePluginInfo?.tag_regex
  })

  const { tagTypeOptList } = useTagTypeSelect()
  /**
   * The available tag types are restricted by
   * the plug-in type bound to the current node.
   */
  const tagTypeOptListAfterFilter = computed(() => {
    if (!tagRegex.value) {
      return tagTypeOptList
    }

    return tagTypeOptList.filter((tagType) =>
      (props.nodePluginInfo as PluginInfo).tag_regex.some(
        (canSelectTagType: TagRegex) => canSelectTagType.type === tagType.value,
      ),
    )
  })

  // valid address: valid address by type
  const validAddress = (rule: any, value: string, callback: any) => {
    const { field } = rule
    const $index = field.split('.')[1]

    // Compatible tag form and tag list form
    const tag: TagDataInTable = props?.data?.tagList ? props?.data?.tagList[$index] : props?.data
    const { type: cuurentType, attribute } = tag

    const isStaticAttr = isAttrsIncludeStatic.value(Number(attribute))

    if (isStaticAttr) {
      return callback()
    }

    const curentTagRegex = tagRegex.value?.find((item: TagRegex) => item.type === Number(cuurentType))
    if (!curentTagRegex) {
      callback()
      return
    }
    const regex = curentTagRegex?.regex ? new RegExp(curentTagRegex.regex) : null
    if (!regex) {
      callback()
      return
    }

    if (!regex.test(value)) {
      callback(new Error(`${t('config.tagAddressValid')}`))
    } else {
      callback()
    }
  }

  // checkFloat,
  const { checkWriteData } = useWriteDataCheckNParse()
  const createErrorMsg = (type: number, prefix: string, suffix: string) => {
    if (!type) return ''
    return prefix + TagType[type] + suffix
  }
  const errorMsgMap = computed(() => (type: number) => ({
    [WriteDataErrorCode.FormattingError]: createErrorMsg(
      type,
      t('data.writeDataFormattingErrorPrefix'),
      t('data.writeDataFormattingErrorSuffix'),
    ),
    [WriteDataErrorCode.LessThanMinimum]: createErrorMsg(
      type,
      t('data.writeDataMinimumErrorPrefix'),
      t('data.writeDataMinimumErrorSuffix'),
    ),
    [WriteDataErrorCode.GreaterThanMaximum]: createErrorMsg(
      type,
      t('data.writeDataMaximumErrorPrefix'),
      t('data.writeDataMaximumErrorSuffix'),
    ),
    [WriteDataErrorCode.LessThanMinSafeInteger]: t('data.writeDataSafeMinimumError'),
    [WriteDataErrorCode.GreaterThanMaxSafeInteger]: t('data.writeDataSafeMaximumError'),
  }))
  const validTagValue = async (rule: any, value: string, callback: any) => {
    const { field } = rule
    const $index = field.split('.')[1]
    const tag: TagDataInTable = props?.data?.tagList ? props.data.tagList[$index] : props?.data
    // const { type, attribute, decimal } = tag
    const { type, attribute } = tag

    try {
      // not Static attribute, no value
      const isStaticAttr = isAttrsIncludeTheValue(Number(attribute), TagAttributeType.Static)
      if (!isStaticAttr) {
        return callback()
      }

      if (type) {
        const trueValue = String(value)
        // // when `decimal` = 0, all other types can be enter as `float`, excepet for `bit` type
        // if (decimal !== undefined && decimal !== null && decimal === 0) {
        //   await checkWriteData(type, trueValue)
        //   return callback()
        // }

        const checkValueRes = await Promise.allSettled([
          // checkFloat.bind(null, trueValue)(), // when `decimal` need to be determind `decimal !== 0` , use it
          checkWriteData(type, trueValue),
        ])

        const checkRes = checkValueRes.map((item: any) => item?.value || false)
        if (!checkRes.includes(true)) {
          const errorMsg = errorMsgMap.value(type)[Number('1') as keyof typeof errorMsgMap.value]
          return callback(new Error(errorMsg))
        }
        return callback()
      }

      callback()
    } catch (error: any) {
      const errorCode = error?.message || error
      const errorMsg = errorMsgMap.value(type)[Number(errorCode) as keyof typeof errorMsgMap.value]
      callback(new Error(errorMsg))
    }
  }

  const rules = computed(() => {
    return {
      name: [{ required: true, message: t('config.tagNameRequired') }],
      address: [
        //  Whether or not is `required` is defined in vue code, because required is dynamic, is determined by the tag's `attribute`
        { validator: validAddress, trigger: ['blur', 'change'] },
      ],
      attribute: [
        { required: true, message: t('config.tagAttributeRequired') },
        {
          validator(rule: unknown, value: Array<TagType>) {
            if (!value || value.length === 0) {
              return [new Error(t('config.tagAttributeRequired'))]
            }
            return []
          },
        },
      ],
      type: [{ required: true, message: t('config.tagTypeRequired') }],
      value: [
        //  Whether or not is `required` is defined in vue code, because required is dynamic, is determined by the tag's `attribute`
        { validator: validTagValue, trigger: 'blur' },
      ],
    }
  })

  const validate = () => {
    // When the component is deleted, the form component is no longer available
    // but the validate method can still be called
    if (!formCom.value) {
      return Promise.resolve()
    }
    return formCom.value.validate()
  }

  const resetFields = () => {
    return formCom.value.resetField()
  }

  return {
    formCom,
    isAttrsIncludeStatic,
    tagTypeOptListAfterFilter,
    rules,
    validate,
    resetFields,
  }
}
