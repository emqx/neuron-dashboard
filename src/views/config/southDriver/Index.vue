<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.southDeviceManagement') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addConfig">
        {{ $t('config.addDevice') }}
      </emqx-button>
    </div>

    <ViewHeaderBar>
      <template v-slot:right>
        <PluginTypesSelector
          v-model="queryKeyword.plugin"
          :types="SOUTH_DRIVER_NODE_TYPE"
          class="header-item"
          @change="dbGetSouthDriverList"
        />
        <KeywordSerachInput
          v-model="queryKeyword.node"
          class="header-item"
          @input="dbGetSouthDriverList"
          @clear="dbGetSouthDriverList"
          @enter="dbGetSouthDriverList"
        />
      </template>
    </ViewHeaderBar>

    <emqx-empty v-if="!isListLoading && southDriverList.length === 0" class="empty" />
    <div v-else>
      <ul class="setup-list">
        <emqx-row :gutter="24">
          <emqx-col :span="8" v-for="(item, index) in southDriverList" :key="item.name" tag="li" class="setup-item">
            <SouthDriveItemCard
              :data="item"
              @deleted="dbGetSouthDriverList"
              @updated="dbGetSouthDriverList"
              @toggle-status="setNodeStartStopStatus(item, $event, index)"
            />
          </emqx-col>
        </emqx-row>
      </ul>
      <emqx-pagination
        v-if="pageController.total > 30"
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="pageController.pageNum"
        :page-sizes="[30, 60, 90]"
        :total="pageController.total"
        :page-size="pageController.pageSize"
        @current-change="getAPageTagData"
        @size-change="handleSizeChange"
      />
    </div>
  </emqx-card>
  <DriverDialog v-model="showDialog" :type="DriverDirection.South" @submitted="getSouthDriverList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useToggleNodeStartStopStatus } from '@/composables/config/useDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import SouthDriveItemCard from './components/SouthDriveItemCard.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import KeywordSerachInput from '@/components/KeywordSearchInput.vue'
import PluginTypesSelector from '../components/PluginTypesSelector.vue'
import { SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'

const {
  queryKeyword,
  pageController,
  getAPageTagData,
  handleSizeChange,
  southDriverList,
  isListLoading,
  getSouthDriverList,
  dbGetSouthDriverList,
} = useSouthDriver(true, true)

const showDialog = ref(false)

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const setNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    if (typeof ret === 'object') {
      southDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getSouthDriverList()
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
  .setup-item {
    margin-bottom: 24px;
  }
}
.filters-container {
  margin-bottom: 10px;
}
</style>
