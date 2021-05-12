<template>
  <emqx-card class="logData">
    <h3 class="card-title">{{ $t('logs.logData') }}</h3>
    <emqx-form>
      <emqx-row type="flex" align="middle" :gutter="20">
        <emqx-col :span="7">
          <emqx-form-item :label="$t('common.date')">
            <el-date-picker
              v-model="date"
              class="input"
              range-separator="-"
              start-placeholder="start"
              end-placeholder="end"
              type="datetimerange"
            >
            </el-date-picker>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="7">
          <emqx-form-item :label="$t('logs.logType')">
            <emqx-select v-model="logType" class="input" clearable>
              <emqx-option v-for="item in logTypeList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="7">
          <emqx-form-item :label="$t('logs.proc')">
            <emqx-select v-model="proc" class="input" clearable>
              <emqx-option v-for="item in procList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col class="right" :span="3">
          <emqx-button type="primary" @click="sendData">{{ $t('common.submit') }}</emqx-button>
        </emqx-col>
      </emqx-row>
    </emqx-form>
    <emqx-table
      v-if="maxTableHeight"
      :max-height="maxTableHeight - 102"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <emqx-table-column prop="tstp" :label="$t('common.time')">
        <template #default="scope">
          {{ formatTime(scope.row.tstp) }}
        </template>
      </emqx-table-column>
      <emqx-table-column prop="logl" :label="$t('logs.level')" :width="150"> </emqx-table-column>
      <emqx-table-column prop="proc" :label="$t('logs.proc')" :width="150"> </emqx-table-column>
      <emqx-table-column show-overflow-tooltip prop="data" :label="$t('logs.content')"> </emqx-table-column>
    </emqx-table>
    <div class="custom-pagination">
      <a :class="['prev', page === 1 ? 'disabled' : '']" href="javascript:;" @click="handlePrevClick(sendData)">
        <i class="el-icon-arrow-left"></i>
      </a>
      <a :class="['next', hasnext ? '' : 'disabled']" href="javascript:;" @click="handleNextClick(sendData)">
        <i class="el-icon-arrow-right"></i>
      </a>
    </div>
  </emqx-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import useFunc from '@/composables/useFunc'
import { ElDatePicker } from 'element-plus'
import useOneHourTime from '@/composables/useOneHourTime'
import useLogs from '@/composables/logs/useLogs'
import { setTimeDate, formatTime } from '@/utils/time'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { LogData, LogModel } from '@/types/neuron'
import useMaxHeight from '@/composables/useMaxHeight'

export default defineComponent({
  name: 'LogData',
  components: {
    ElDatePicker,
  },
  setup() {
    const date: Ref<number[]> = ref([])
    const readLogs = useFunc('readLogs')
    const logType = ref('all')
    const proc = ref('all')
    const tableData: Ref<LogModel[]> = ref([])
    const logTypeList = ref(['all', 'debug', 'info', 'warning', 'err'])
    const procList = ref(['all', 'WEBS', 'SERV', 'DRVR', 'CORE', 'TIMR'])
    const { oneHourRange } = useOneHourTime()
    const { maxTableHeight } = useMaxHeight()
    date.value = oneHourRange.value
    const { page, pageMap, offset, hasnext, handleNextClick, handlePrevClick } = useLogs()
    const { ws } = useWebsocket()
    const setData = (data: LogData) => {
      if (data.func === readLogs && data.errc === 0) {
        tableData.value = []
        tableData.value = data.rows
        if (data.last !== -1) {
          offset.value = data.last
          pageMap[page.value] = offset.value
        }
        hasnext.value = data.nrow === 500 && data.last !== -1
      }
    }
    const sendData = () => {
      const srtt = setTimeDate(date.value[0])
      const stpt = setTimeDate(date.value[1])
      const srtl = pageMap[page.value - 1] || 0
      ws().set({ success: setData }).send({
        func: readLogs,
        srtt,
        stpt,
        srtl,
        proc: proc.value,
        logl: logType.value,
      })
    }
    onMounted(() => {
      sendData()
    })
    return {
      date,
      logType,
      proc,
      logTypeList,
      procList,
      tableData,
      maxTableHeight,
      formatTime,
      page,
      hasnext,
      handleNextClick,
      handlePrevClick,
      sendData,
    }
  },
})
</script>

<style lang="scss">
.logData {
  .custom-pagination {
    margin-top: 10px;
    text-align: right;
    a {
      border: 1px solid #ebeef5;
      transition: all 0.3s ease;
      color: #fff;
      margin-right: 10px;
      background: #189bfe;
      display: inline-block;
      border-radius: 4px;
      padding: 4px 8px;
      &:hover {
        color: #fff;
      }
    }
    a.disabled {
      transition: all 0.3s ease;
      color: #495062;
      background: transparent;
      cursor: not-allowed;
    }
  }
}
</style>
