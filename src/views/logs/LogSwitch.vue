<template>
  <emqx-card class="log-switch">
    <h2>{{ $t('logs.logSwitch') }}</h2>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('logs.serviceLog')" name="SERVICELOG"></el-tab-pane>
      <el-tab-pane :label="$t('logs.driverLog')" name="DRIVERLOG"></el-tab-pane>
      <el-tab-pane :label="$t('logs.scriptLog')" name="SCRIPTLOG"></el-tab-pane>
    </el-tabs>
    <div class="control">
      <label>{{ $t('logs.maxLines') }}:</label>
      <emqx-input v-model="maxLines" type="number" />
      <emqx-button type="primary" size="small" @click="sendData">{{ $t('common.submit') }}</emqx-button>
      <emqx-button type="danger" size="small" @click="stopSendData">{{ $t('common.stop') }}</emqx-button>
    </div>
    <emqx-table
      ref="LogTable"
      v-if="maxTableHeight"
      :max-height="maxTableHeight - 82"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <emqx-table-column show-overflow-tooltip prop="content" :label="$t('logs.log')"> </emqx-table-column>
    </emqx-table>
  </emqx-card>
</template>

<script lang="ts">
import { DefineComponent, defineComponent, onMounted, reactive, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElTabs, ElTabPane } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'
import useMaxHeight from '@/composables/useMaxHeight'
import { LogSwitchData, LogSwitchModel } from '@/types/neuron'
import useWebsocket from '@/plugins/ws/useWebsocket'
import useFunc from '@/composables/useFunc'

type ActiveName = 'SERVICELOG' | 'DRIVERLOG' | 'SCRIPTLOG'

interface DataMap {
  SERVICELOG: LogSwitchModel[]
  DRIVERLOG: LogSwitchModel[]
  SCRIPTLOG: LogSwitchModel[]
}

export default defineComponent({
  name: 'LogSwitch',
  components: {
    ElTabs,
    ElTabPane,
  },
  setup() {
    const activeName: Ref<ActiveName> = ref('SERVICELOG')
    const maxLines = ref(100)
    const tableData: Ref<LogSwitchModel[]> = ref([])
    const DataMap: DataMap = reactive({
      SERVICELOG: [],
      DRIVERLOG: [],
      SCRIPTLOG: [],
    })
    const LogTable = ref<DefineComponent>()
    const { maxTableHeight } = useMaxHeight()
    const switchLogs = useFunc('switchLogs')
    const { t } = useI18n()
    const { ws } = useWebsocket()
    watch(activeName, (val: ActiveName) => {
      tableData.value = DataMap[val]
    })
    const setData = (data: LogSwitchData) => {
      if (data.logn === activeName.value) {
        const _rows: LogSwitchModel[] = data.rows.map((row: string) => ({ content: row }))
        tableData.value.push(..._rows)
        DataMap[activeName.value] = tableData.value
      }
    }
    const handleStopData = (data: LogSwitchData) => {
      if (data.func === switchLogs) {
        EmqxMessage.success(t('logs.logStoped'))
      }
    }
    const sendData = () => {
      ws().remove(setData)
      ws().remove(handleStopData)
      ws().set({ success: setData }).send({
        func: switchLogs,
        logn: activeName.value,
        vars: maxLines.value,
      })
    }
    const stopSendData = () => {
      ws().remove(setData)
      ws().remove(handleStopData)
      ws().set({ success: handleStopData }).send({
        func: 84,
        logn: activeName.value,
        vars: -1,
      })
    }
    onMounted(() => {
      ws().set({ success: setData })
    })
    return {
      activeName,
      maxLines,
      stopSendData,
      maxTableHeight,
      tableData,
      LogTable,
      sendData,
      handleStopData,
    }
  },
})
</script>

<style lang="scss">
.log-switch {
  h2 {
    margin-bottom: 20px;
  }
  .el-table.emqx-table th:last-child {
    border-radius: 8px !important;
  }
  .el-tabs {
    margin-bottom: 20px;
    .el-tabs__item {
      height: 50px;
    }
  }
  .el-card__body {
    position: relative;
  }
  .control {
    position: absolute;
    top: 70px;
    right: 20px;
    .emqx-input {
      width: 180px;
      margin-right: 20px;
    }
  }
}
</style>
