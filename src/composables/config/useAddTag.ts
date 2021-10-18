import { addTag } from '@/api/config'
import { TagForm } from '@/types/config'
import { TagAttrbuteType, TagType } from '@/types/enums'
import { ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import TagFormCom from '@/views/config/southDriver/components/TagForm.vue'

export const useTagTypeSelect = () => {
  const tagTypeOptList = Object.keys(TagType)
    .filter((key) => typeof TagType[key as keyof typeof TagType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagType[key as keyof typeof TagType],
    }))

  const findLabelByValue = (val: number) => tagTypeOptList.find(({ value }) => val === value)?.label || ''

  return {
    tagTypeOptList,
    findLabelByValue,
  }
}

export const useTagAttributeTypeSelect = () => {
  const tagAttributeTypeOptList = Object.keys(TagAttrbuteType)
    .filter((key) => typeof TagAttrbuteType[key as keyof typeof TagAttrbuteType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagAttrbuteType[key as keyof typeof TagAttrbuteType],
    }))

  // 1, 2, 4
  // Possible values are 1, 2, 3, 4, 5, 6, 7
  const tagAttrValueMap = {
    [1]: [1],
    [2]: [2],
    [3]: [1, 2],
    [4]: [4],
    [5]: [1, 4],
    [6]: [2, 4],
    [7]: [1, 2, 4],
  }

  const findLabelByValue = (val: number) => tagAttributeTypeOptList.find(({ value }) => val === value)?.label || ''

  const getAttrStrByValue = (val: number) => {
    const key = Number(Object.keys(tagAttrValueMap).find((total) => Number(total) === val))
    const valueArr = tagAttrValueMap[key as keyof typeof tagAttrValueMap]
    return valueArr.map((value) => findLabelByValue(value)).join(', ')
  }

  return {
    tagAttributeTypeOptList,
    tagAttrValueMap,
    getAttrStrByValue,
    findLabelByValue,
  }
}

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const tagFormComList: Ref<Array<typeof TagFormCom>> = ref([])
  const tagList: Ref<Array<TagForm>> = ref([])
  const tagNum: Ref<number> = ref(0)
  const isSubmitting = ref(false)

  const tagNumForInput: Ref<number | null> = ref(null)

  const setFormRef = (com: typeof TagFormCom) => {
    if (com) {
      tagFormComList.value.push(com)
    }
  }

  const createRawTagForm = (): TagForm => ({
    name: '',
    address: '',
    attribute: null,
    type: null,
  })

  const tagNumChanged = () => {
    if (Number.isNaN(Number(tagNumForInput.value)) && tagNumForInput.value !== undefined) {
      return
    }
    if (Number(tagNumForInput.value) > 100) {
      EmqxMessage.warning(t('config.tagNumExceedsTheMaximumError'))
      return
    }
    const diff = tagNumForInput.value === null ? -tagNum.value : tagNumForInput.value - tagNum.value
    if (diff === 0) {
      return
    }
    if (diff > 0) {
      for (let i = 0; i < diff; i += 1) {
        tagList.value.push(createRawTagForm())
      }
    } else {
      tagList.value.splice(tagList.value.length + diff, -diff)
    }
    tagNum.value = tagNumForInput.value === null ? 0 : tagNumForInput.value
  }

  const submit = async () => {
    try {
      await Promise.all(tagFormComList.value.map((com: typeof TagFormCom) => com.validate()))
      isSubmitting.value = true
      const nodeID = Number(route.params.nodeID)
      const groupName: string = route.params.group as string
      await addTag({ node_id: nodeID, group_config_name: groupName, tags: tagList.value })
      EmqxMessage.success(t('common.createSuccess'))
      router.push({
        name: 'SouthDriverGroupTag',
      })
    } catch (error) {
      //
    } finally {
      isSubmitting.value = false
    }
  }

  const cancel = () => {
    router.back()
  }

  return {
    tagList,
    tagNumForInput,
    isSubmitting,
    tagNumChanged,
    setFormRef,
    cancel,
    submit,
  }
}
