<template>
  <emqx-card class="north-driver-group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('config.appName') }}</label>
          <span>{{ nodeName }}</span>
          <!-- <i class="el-icon-edit icon-edit" :title="$t('common.edit')" @click="editNodeName" /> -->
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <!-- <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.import') }}</span>
          </emqx-button> -->
          <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button>
        </div>
        <div class="btn-group">
          <emqx-button size="small" type="primary" @click="addSubscription">{{
            $t('config.addSubscription')
          }}</emqx-button>
          <emqx-button size="small" type="warning" @click="clearSubscription">{{ $t('common.clear') }}</emqx-button>
          <emqx-button size="small" type="danger" @click="unsubscribeInBulk">{{ $t('common.delete') }}</emqx-button>
        </div>
      </div>
    </div>
    <emqx-table :data="subscriptionList">
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
      <emqx-table-column :label="$t('config.groupName')" prop="group"></emqx-table-column>
      <emqx-table-column :label="$t('config.deviceName')" prop="name">
        <template #default="{ row }">{{ row.driver }}</template>
      </emqx-table-column>
      <emqx-table-column align="right">
        <template #default="{ row }">
          <AComWithDesc :content="$t('config.unsubscribe')">
            <i class="iconfont icondelete" @click="unsubscribeGroup(row)" />
          </AComWithDesc>
        </template>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
  <AddSubscriptionDialog v-model="showAddSubscriptionDialog" :current-node="node" @submitted="getSubscriptionList" />
  <EditNodeNameDialog v-model="showEditDialog" :node="currentNode" @updated="refreshNodeMsgMap" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import { DriverDirection } from '@/types/enums'
import { useSubscriptionList } from '@/composables/config/useSubscription'
import AddSubscriptionDialog from './components/AddSubscriptionDialog.vue'
import EditNodeNameDialog from '../components/EditNodeNameDialog.vue'
import AComWithDesc from '@/components/AComWithDesc.vue'

const {
  node,
  subscriptionList,
  isListLoading,
  allChecked,
  unsubscribeGroup,
  clearSubscription,
  unsubscribeInBulk,
  getSubscriptionList,
} = useSubscriptionList()
const { initMap: refreshNodeMsgMap, getNodeMsgById } = useNodeMsgMap(DriverDirection.North)
const { getNodeMsgById: getSrcNodeMsgById } = useNodeMsgMap(DriverDirection.South)
const showEditDialog = ref(false)

const currentNode = computed(() => ({
  name: nodeName.value,
  plugin_id: getNodeMsgById(node.value).id,
}))

const showAddSubscriptionDialog = ref(false)

const nodeName = computed(() => getNodeMsgById(node.value).name)

const addSubscription = () => {
  showAddSubscriptionDialog.value = true
}

const editNodeName = () => {
  showEditDialog.value = true
}
</script>

<style lang="scss">
.north-driver-group {
  .driver-name {
    margin-right: 22px;
  }
  .icon-edit {
    margin-left: 8px;
  }
  .btn-group {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}
</style>
