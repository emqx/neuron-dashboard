<template>
  <emqx-card v-emqx-loading="isListLoading">
    <ViewHeaderBar>
      <template v-slot:left>
        <emqx-button type="primary" size="small" icon="iconfont iconcreate" class="header-item btn" @click="addConfig">
          {{ $t('config.addApplication') }}
        </emqx-button>
      </template>
      <template v-slot:right>
        <ListCardSwitch v-model="showType" />
      </template>
    </ViewHeaderBar>

    <ul v-if="showType === 'card'" class="setup-list">
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

    <emqx-table
      v-if="showType === 'list'"
      :data="northDriverList"
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
            <AComWithDesc v-if="!isNotSupportRemoveNode(row.name)" :content="$t('common.delete')">
              <i class="iconfont icondelete" @click.stop="deleteDriver(row)" />
            </AComWithDesc>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>

    <emqx-empty v-if="!isListLoading && northDriverList.length === 0" />
  </emqx-card>

  <DriverDialog v-model="showDialog" :type="DriverDirection.North" @submitted="getNorthDriverList" />

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="'app'"
    :node-name="nodeItemData.name"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
import { ElLink } from 'element-plus'
import {
  useToggleNodeStartStopStatus,
  useDriverStatus,
  useNodeStartStopStatus,
  dataStatistics,
  useListShowType,
  useDriverName,
} from '@/composables/config/useDriver'
import useNorthDriver from '@/composables/config/useNorthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import SetupItemCard from './components/SetupItemCard.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import ListCardSwitch from '@/components/ListCardSwitch.vue'
import AComWithDesc from '@/components/AComWithDesc.vue'
import DataStatisticsDrawer from '../components/dataStatisticsDrawer.vue'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    store.commit('RESET_LIST_SHOW_TYPE', { to, from, next })
  },
})
</script>

<script lang="ts" setup>
const { t } = useI18n()
const {
  northDriverList,
  isListLoading,
  getNorthDriverList,
  dbGetNorthDriverList,
  goGroupPage,
  goNodeConfig,
  modifyNodeLogLevel,
  deleteDriver,
  sortDataByKey,
} = useNorthDriver(true, true)

const { isShowDataStatistics, dataStatisticsVisiable, nodeItemData } = dataStatistics()
const { isNotSupportRemoveNode } = useDriverName()

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
