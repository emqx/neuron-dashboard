<template>
  <emqx-card v-emqx-loading="isListLoading">
    <ViewHeaderBar>
      <template v-slot:left>
        <emqx-button type="primary" size="small" icon="iconfont iconcreate" class="header-item btn" @click="addConfig">
          {{ $t('config.addApplication') }}
        </emqx-button>
      </template>
    </ViewHeaderBar>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="(item, index) in northDriverList" :key="item.name" tag="li" class="setup-item">
          <SetupItemCard
            :data="item"
            @updated="dbGetNorthDriverList"
            @reload="dbGetNorthDriverList"
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToggleNodeStartStopStatus } from '@/composables/config/useDriver'
import useNorthDriver from '@/composables/config/useNorthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import SetupItemCard from './components/SetupItemCard.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'

const { t } = useI18n()
const { northDriverList, isListLoading, getNorthDriverList, dbGetNorthDriverList } = useNorthDriver(true, true)
const showDialog = ref(false)

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()

const setNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    const message = status ? t('config.runSuc') : t('config.stopSuc')
    EmqxMessage.success(message)
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

<style lang="scss" scoped>
.setup-list {
  list-style: none;
  margin-top: 6px;

  .setup-item {
    margin-bottom: 24px;
  }
}
</style>
