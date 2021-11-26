<template>
  <emqx-card class="group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('config.deviceName') }}</label>
          <span>{{ nodeName }}</span>
          <i class="el-icon-edit icon-edit" :title="$t('common.edit')" @click="editNodeName" />
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.import') }}</span>
          </emqx-button>
          <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button>
        </div>
        <div class="btn-group">
          <emqx-button size="small" type="primary" @click="addGroup">{{ $t('common.create') }}</emqx-button>
          <emqx-button size="small" type="warning" @click="clearGroup">{{ $t('common.clear') }}</emqx-button>
          <emqx-button size="small" type="danger" @click="batchDeleteGroup">{{ $t('common.delete') }}</emqx-button>
        </div>
      </div>
    </div>
    <emqx-table :data="groupList">
      <emqx-table-column :width="28">
        <template #header>
          <emqx-checkbox v-model="allChecked" />
        </template>
        <template #default="{ row }">
          <emqx-checkbox v-model="row.checked" />
        </template>
      </emqx-table-column>
      <emqx-table-column label="No" :width="60">
        <template #default="{ index }">{{ index + 1 }}</template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.groupName')" prop="name"></emqx-table-column>
      <emqx-table-column label="Tag Count" prop="tag_count"></emqx-table-column>
      <emqx-table-column label="Interval" prop="interval"></emqx-table-column>
      <emqx-table-column align="right">
        <template #default="{ row }">
          <AComWithDesc :content="$t('common.edit')">
            <i class="el-icon-edit-outline" @click="editGroup(row)" />
          </AComWithDesc>
          <AComWithDesc :content="$t('config.tagList')">
            <i class="iconfont iconalarm" @click="goTagPage(row)" />
          </AComWithDesc>
          <AComWithDesc :content="$t('common.delete')">
            <i class="iconfont icondelete" @click="delGroup(row)" />
          </AComWithDesc>
        </template>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
  <GroupDialog v-model="showGroupDialog" :current-node="nodeID" @submitted="getGroupList" :group="currentGroup" />
  <EditNodeNameDialog v-model="showEditDialog" :node="currentNode" @updated="refreshNodeMsgMap" />
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue'
import useGroupList from '@/composables/config/useGroupList'
import GroupDialog from './components/GroupDialog.vue'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import { GroupData, GroupForm } from '@/types/config'
import { useRouter } from 'vue-router'
import { DriverDirection } from '@/types/enums'
import AComWithDesc from '@/components/AComWithDesc.vue'
import EditNodeNameDialog from '../components/EditNodeNameDialog.vue'

const router = useRouter()
const { nodeID, groupList, isListLoading, allChecked, getGroupList, clearGroup, delGroup, batchDeleteGroup } =
  useGroupList()
const showGroupDialog = ref(false)
const { initMap: refreshNodeMsgMap, getNodeMsgById } = useNodeMsgMap(DriverDirection.South)
const currentGroup: Ref<GroupForm | undefined> = ref(undefined)

const nodeName = computed(() => getNodeMsgById(nodeID.value).name)
const showEditDialog = ref(false)

const currentNode = computed(() => ({
  id: nodeID.value,
  name: nodeName.value,
  plugin_id: getNodeMsgById(nodeID.value).id,
}))

const addGroup = () => {
  currentGroup.value = undefined
  showGroupDialog.value = true
}

const editGroup = ({ name, interval }: GroupData) => {
  currentGroup.value = {
    interval,
    name,
    node_id: nodeID.value,
  }
  showGroupDialog.value = true
}

const goTagPage = ({ name }: GroupData) => {
  router.push({
    name: 'SouthDriverGroupTag',
    params: { group: name },
  })
}

const editNodeName = () => {
  showEditDialog.value = true
}
</script>

<style lang="scss">
.group {
  .driver-name {
    margin-right: 22px;
  }
  .btn-group {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
  .icon-edit {
    margin-left: 8px;
  }
}
</style>
