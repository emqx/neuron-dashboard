import { addTag, queryPluginConfigInfo } from '@/api/config'
import { PluginInfo, TagForm } from '@/types/config'
import { DriverDirection, TagAttrbuteType, TagType } from '@/types/enums'
import { ref, Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import TagFormCom from '@/views/config/southDriver/components/TagForm.vue'
import { createRandomString } from '@/utils/utils'
import { useNodeMsgMap } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

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

interface TagFormItem extends TagForm {
  id: string
}

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const createRawTagForm = (): TagFormItem => ({
    name: '',
    address: '',
    attribute: undefined,
    type: null,
    id: createRandomString(6),
  })

  const tagFormComList: Ref<Array<typeof TagFormCom>> = ref([])
  const tagList: Ref<Array<TagForm>> = ref([createRawTagForm()])
  const isSubmitting = ref(false)

  const nodeID = computed(() => Number(route.params.nodeID))
  const { getNodeMsgById, initMap } = useNodeMsgMap(DriverDirection.South, false)
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const nodePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  const getNodePluginInfo = async () => {
    await Promise.all([initMap(), initMsgIdMap()])
    const { data } = await queryPluginConfigInfo()
    const plugin: PluginInfo = data[pluginMsgIdMap[getNodeMsgById(nodeID.value).plugin_id].name]
    if (plugin) {
      nodePluginInfo.value = plugin
    }
  }

  const setFormRef = (com: typeof TagFormCom) => {
    if (com) {
      tagFormComList.value.push(com)
    }
  }

  const addTagItem = () => {
    tagList.value.push(createRawTagForm())
  }

  const deleteTagItem = (index: number) => {
    tagList.value.splice(index, 1)
  }

  const submit = async () => {
    try {
      await Promise.all(tagFormComList.value.map((com: typeof TagFormCom) => com.validate()))
      isSubmitting.value = true
      const nodeID = Number(route.params.nodeID)
      const groupName: string = route.params.group as string
      const tags = tagList.value.map(({ name, address, attribute, type }) => ({ name, address, attribute, type }))
      await addTag({ tags, node_id: nodeID, group_config_name: groupName })
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
    tagList,
    isSubmitting,

    addTagItem,
    deleteTagItem,
    setFormRef,
    cancel,
    submit,
  }
}
