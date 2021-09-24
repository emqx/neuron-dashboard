import { ref, computed, Ref } from 'vue'
import { EmqxMessageBox, EmqxMessage } from '@emqx/emqx-ui'
import { queryGroupList, deleteGroup } from '@/api/config'
import { useRoute } from 'vue-router'
import { GroupData } from '@/types/config'
import { useI18n } from 'vue-i18n'

interface GroupDataInTable extends GroupData {
  checked: boolean
}

export default () => {
  const { t } = useI18n()
  const route = useRoute()
  const groupList: Ref<Array<GroupDataInTable>> = ref([])
  const isListLoading = ref(false)

  const nodeID = computed(() => parseInt(route.params.nodeID as string))
  const allChecked = computed({
    get() {
      if (groupList.value.length === 0) {
        return false
      }
      return groupList.value.every(({ checked }) => checked)
    },
    set(val: boolean) {
      groupList.value.forEach((item) => {
        item.checked = val
      })
    },
  })

  const getGroupList = async () => {
    isListLoading.value = true
    const data = await queryGroupList(nodeID.value)
    groupList.value = data.map((item) => Object.assign(item, { checked: false }))
    isListLoading.value = false
  }

  const delGroup = async ({ name }: GroupDataInTable) => {
    await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmDelete') })
    await deleteGroup(nodeID.value, name)
    EmqxMessage.success(t('common.operateSuccessfully'))
    getGroupList()
  }

  const clearGroup = async () => {
    await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmClear') })
    await Promise.all(groupList.value.map(({ name }) => deleteGroup(nodeID.value, name)))
    EmqxMessage.success(t('common.operateSuccessfully'))
    getGroupList()
  }

  getGroupList()

  return {
    nodeID,
    groupList,
    isListLoading,
    allChecked,
    clearGroup,
    getGroupList,
    delGroup,
  }
}
