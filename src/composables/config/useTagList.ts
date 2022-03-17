import { deleteTag, queryTagList } from '@/api/config'
import { TagData, TagForm } from '@/types/config'
import { Ref, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { EmqxMessage, EmqxMessageBox } from '@emqx/emqx-ui'

interface TagDataInTable extends TagData {
  checked: boolean
}

export default () => {
  const route = useRoute()
  const { t } = useI18n()

  const tagList: Ref<Array<TagDataInTable>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  const nodeID = computed(() => Number(route.params.nodeID))
  const groupName = computed(() => route.params.group as string)
  const allChecked = computed({
    get() {
      if (tagList.value.length === 0) {
        return false
      }
      return tagList.value.every(({ checked }) => checked)
    },
    set(val: boolean) {
      tagList.value.forEach((item) => {
        item.checked = val
      })
    },
  })

  const currentTag: Ref<TagForm> = ref({} as TagForm)
  const showEditDialog = ref(false)

  const getTagList = async () => {
    isListLoading.value = true
    const data = await queryTagList(nodeID.value, groupName.value)
    tagList.value = data.map((item) => Object.assign(item, { checked: false }))
    isListLoading.value = false
  }

  const deleteTagList = async (list: Array<TagDataInTable>) => {
    await deleteTag({
      node_id: nodeID.value,
      group_config_name: groupName.value,
      ids: list.map(({ id }) => id),
    })
    EmqxMessage.success(t('common.operateSuccessfully'))
    getTagList()
  }

  const delTag = async (item: TagDataInTable) => {
    await EmqxMessageBox.confirm(t('common.confirmDelete'), t('common.operateConfirm'))
    deleteTagList([item])
  }

  const editTag = (tag: TagForm) => {
    currentTag.value = tag
    showEditDialog.value = true
  }

  const batchDeleteTag = async () => {
    await EmqxMessageBox.confirm(t('common.confirmDelete'), t('common.operateConfirm'))
    deleteTagList(tagList.value.filter(({ checked }) => checked))
  }

  const clearTag = async () => {
    await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmClear') })
    deleteTagList(tagList.value)
  }

  getTagList()

  return {
    nodeID,
    groupName,
    tagList,
    isListLoading,
    allChecked,
    currentTag,
    showEditDialog,
    getTagList,
    editTag,
    delTag,
    clearTag,
    batchDeleteTag,
  }
}
