<template>
  <emqx-card class="north-driver-group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('config.appName') }}</label>
          <span>{{ nodeName }}</span>
        </p>
        <emqx-button size="small" @click="editDriverPlugin">{{ $t('config.modifyAppPlugin') }}</emqx-button>
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
      <emqx-table-column :label="$t('config.groupName')" prop="name"></emqx-table-column>
      <emqx-table-column :label="$t('config.deviceName')" prop="name">
        <template #default="{ row }">{{ getSrcNodeMsgById(row.src_node_id).name }}</template>
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
  <AddSubscriptionDialog
    v-model="showAddSubscriptionDialog"
    :current-node-id="nodeID"
    @submitted="getSubscriptionList"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNodeMsgMap } from '@/composables/config/useNodeList'
import { DriverDirection } from '@/types/enums'
import { useSubscriptionList } from '@/composables/config/useSubscription'
import AddSubscriptionDialog from './components/AddSubscriptionDialog.vue'
import AComWithDesc from '@/components/AComWithDesc.vue'

const {
  nodeID,
  subscriptionList,
  isListLoading,
  allChecked,
  unsubscribeGroup,
  clearSubscription,
  unsubscribeInBulk,
  getSubscriptionList,
} = useSubscriptionList()
const { getNodeMsgById } = useNodeMsgMap(DriverDirection.North)
const { getNodeMsgById: getSrcNodeMsgById } = useNodeMsgMap(DriverDirection.South)

const showAddSubscriptionDialog = ref(false)
const showChangePluginDialog = ref(false)

const nodeName = computed(() => getNodeMsgById(nodeID.value).name)

const addSubscription = () => {
  showAddSubscriptionDialog.value = true
}

const editDriverPlugin = () => {
  showChangePluginDialog.value = true
}
</script>

<style lang="scss">
.north-driver-group {
  .driver-name {
    margin-right: 22px;
  }
  .btn-group {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}
</style>
