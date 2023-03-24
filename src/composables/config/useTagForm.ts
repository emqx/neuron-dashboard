import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTagTypeSelect } from '@/composables/config/useAddTag'
import type { PluginInfo, TagRegex } from '@/types/config'
import type { TagType } from '@/types/enums'

export default (props: any) => {
  const { t } = useI18n()
  const formCom = ref()

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
    const cuurentType = props?.data?.type || props?.data?.tagList[$index].type

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

  const rules = {
    name: [{ required: true, message: t('config.tagNameRequired') }],
    address: [
      { required: true, message: t('config.tagAddressRequired') },
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
    value: [{ required: true, message: t('config.tagValueRequired') }],
  }

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
    tagTypeOptListAfterFilter,
    rules,
    validate,
    resetFields,
  }
}
