<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.northAppSetup') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addConfig">{{
        $t('config.addApplication')
      }}</emqx-button>
    </div>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="(item, index) in northDriverList" :key="item.id" tag="li" class="setup-item">
          <SetupItemCard
            :data="item"
            @deleted="getNorthDriverList"
            @updated="getNorthDriverList"
            @toggle-status="setNodeStartStopStatus(item, $event, index)"
          />
        </emqx-col>
      </emqx-row>
    </ul>
    <emqx-empty v-if="!isListLoading && northDriverList.length === 0" />
  </emqx-card>
  <DriverDialog v-model="showDialog" :type="DriverDirection.North" @submitted="getNorthDriverList" />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import SetupItemCard from './components/SetupItemCard.vue'
import useNorthDriver from '@/composables/config/useNorthDriver'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import { DriverDirection } from '@/types/enums'
import { useToggleNodeStartStopStatus } from '@/composables/config/useDriver'
import { DriverItemInList } from '@/types/config'

const { northDriverList, isListLoading, getNorthDriverList } = useNorthDriver()
const showDialog = ref(false)

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const setNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    if (typeof ret === 'object') {
      northDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getNorthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}

const addConfig = () => {
  showDialog.value = true
}
</script>

<style lang="scss">
.setup-list {
  list-style: none;
  .setup-item {
    margin-bottom: 24px;
  }
}
</style>
