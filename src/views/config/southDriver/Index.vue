<template>
  <emqx-card v-emqx-loading="isListLoading">
    <ViewHeaderBar>
      <template v-slot:left>
        <emqx-button type="primary" size="small" icon="iconfont iconcreate" class="header-item btn" @click="addConfig">
          {{ $t('config.addDevice') }}
        </emqx-button>
      </template>
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
        <ListCardSwitch v-model="showType" />
      </template>
    </ViewHeaderBar>

    <emqx-empty v-if="!isListLoading && southDriverList.length === 0" class="empty" />
    <div v-else>
      <!-- card show -->
      <ul v-if="showType === 'card'" class="setup-list">
        <emqx-row :gutter="24">
          <emqx-col :span="8" v-for="(item, index) in southDriverList" :key="item.name" tag="li" class="setup-item">
            <SouthDriveItemCard
              :data="item"
              @updated="dbGetSouthDriverList"
              @reload="dbGetSouthDriverList"
              @toggle-status="setNodeStartStopStatus(item, $event, index)"
            />
          </emqx-col>
        </emqx-row>
      </ul>

      <!-- table show -->
      <emqx-table
        v-if="showType === 'list'"
        :data="southDriverList"
        :empty-text="$t('common.emptyData')"
        @sort-change="sortDataByKey"
      >
        <emqx-table-column :label="$t('common.name')" prop="name" sortable="custom" show-overflow-tooltip>
          <template #default="{ row }">
            <el-link type="primary" :underline="false" href="javascript:;" @click="goGroupPage(row)">
              {{ row.name }}
            </el-link>
          </template>
        </emqx-table-column>
        <!--  workStatus-->
        <emqx-table-column :label="$t('config.workStatus')" prop="statusText" sortable="custom">
          <template #default="{ row }">
            <svg class="iconfont icon-svg" aria-hidden="true">
              <use :xlink:href="`#${getNodeValue(row).statusIcon.value}`" />
            </svg>
            {{ getNodeValue(row).statusText.value }}
          </template>
        </emqx-table-column>
        <!-- connectionStatus -->
        <emqx-table-column
          :label="$t('config.connectionStatus')"
          prop="connectionStatusText"
          sortable="custom"
          min-width="90"
        >
          <template #default="{ row }">
            {{ getNodeValue(row).connectionStatusText.value }}
          </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.delayTime')">
          <template #default="{ row }"> {{ row.rtt }} {{ $t('common.ms') }} </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.plugin')" prop="plugin" sortable="custom" />
        <emqx-table-column align="left" :label="$t('common.oper')" width="220px">
          <template #default="{ row, index }">
            <div class="operator-wrap">
              <AComWithDesc :content="countNodeStartStopStatus(row) ? $t('common.stop') : $t('common.start')">
                <i
                  :class="countNodeStartStopStatus(row) ? 'el-icon-video-pause' : 'el-icon-video-play'"
                  @click="setNodeStartStopStatus(row, !countNodeStartStopStatus(row), index)"
                />
              </AComWithDesc>
              <AComWithDesc :content="$t('config.deviceConfig')">
                <i class="iconfont iconsetting" @click.stop="goNodeConfig(row)" />
              </AComWithDesc>
              <AComWithDesc :content="$t('config.dataStatistics')">
                <i class="iconfont iconstatus" @click.stop="isShowDataStatistics(row)" />
              </AComWithDesc>
              <AComWithDesc :content="$t('config.updateDebugLogLevel')">
                <img
                  class="img-debug-log"
                  src="~@/assets/images/debug-log-icon.png"
                  alt="debug-log"
                  width="22"
                  @click.stop="modifyNodeLogLevel(row)"
                />
              </AComWithDesc>
              <AComWithDesc :content="$t('common.delete')">
                <i class="iconfont icondelete" @click.stop="deleteDriver(row)" />
              </AComWithDesc>
            </div>
          </template>
        </emqx-table-column>
      </emqx-table>
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

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="'driver'"
    :node-name="nodeItemData.name"
  />

  <DriverDialog v-model="showDialog" :type="DriverDirection.South" @submitted="getSouthDriverList" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import store from '@/store'
import { ElLink } from 'element-plus'
import {
  useToggleNodeStartStopStatus,
  useDriverStatus,
  useNodeStartStopStatus,
  dataStatistics,
  useListShowType,
} from '@/composables/config/useDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import SouthDriveItemCard from './components/SouthDriveItemCard.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import KeywordSerachInput from '@/components/KeywordSearchInput.vue'
import PluginTypesSelector from '../components/PluginTypesSelector.vue'
import ListCardSwitch from '@/components/ListCardSwitch.vue'
import AComWithDesc from '@/components/AComWithDesc.vue'
import { SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import DataStatisticsDrawer from '../components/dataStatisticsDrawer.vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    store.commit('RESET_LIST_SHOW_TYPE', { to, from, next })
  },
})
</script>

<script lang="ts" setup>
const {
  queryKeyword,
  pageController,
  getAPageTagData,
  handleSizeChange,
  southDriverList,
  isListLoading,
  getSouthDriverList,
  dbGetSouthDriverList,
  goGroupPage,
  goNodeConfig,
  deleteDriver,
  modifyNodeLogLevel,
  sortDataByKey,
} = useSouthDriver(true, true)

const { isShowDataStatistics, dataStatisticsVisiable, nodeItemData } = dataStatistics()

const { showType } = useListShowType()

const showDialog = ref(false)
const addConfig = () => {
  showDialog.value = true
}

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const { countNodeStartStopStatus } = useNodeStartStopStatus()

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

const getNodeValue = (node: DriverItemInList) => {
  const useDriverStatusSet = useDriverStatus({ data: node })
  return useDriverStatusSet
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
.img-debug-log {
  margin-right: 8px;
  position: relative;
  top: 2px;
}
</style>
