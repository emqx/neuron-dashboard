<template>
  <emqx-card class="historical-alarms">
    <h3 class="card-title">{{ $t('alarm.historicalAlarms') }}</h3>
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
          <emqx-form-item :label="$t('alarm.pattern')">
            <emqx-input v-model="patn" class="input"></emqx-input>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="7">
          <emqx-form-item :label="$t('alarm.category')">
            <emqx-select v-model="cate" class="input" clearable>
              <emqx-option v-for="item in cateList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col class="right" :span="3">
          <emqx-button type="primary" @click="handleSubmit('')">{{ $t('common.submit') }}</emqx-button>
        </emqx-col>
      </emqx-row>
    </emqx-form>
    <emqx-table :data="tableData">
      <emqx-table-column min-width="130" prop="anum" :label="$t('alarm.index')" />
      <emqx-table-column min-width="130" :label="$t('common.time')">
        <template #default="scope">
          {{ formatTime(scope.row.tstp || '') }}
        </template>
      </emqx-table-column>
      <emqx-table-column min-width="130" prop="cate" :label="$t('alarm.category')" />
      <emqx-table-column prop="stat" :label="$t('alarm.state')" min-width="130" />
      <emqx-table-column prop="uack" min-width="130" :label="$t('alarm.remark')"> </emqx-table-column>
      <emqx-table-column prop="comt" min-width="400" :label="$t('alarm.alarmMessage')" />
    </emqx-table>
  </emqx-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { ElDatePicker } from 'element-plus'
import { setTimeDate, formatTime } from '@/utils/time'
import useOneHourTime from '@/composables/useOneHourTime'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { HistoricalAlarmData, HistoricalAlarmModel } from '@/types/neuron'
import useFunc from '@/composables/useFunc'

export default defineComponent({
  name: 'HistoricalAlarms',
  components: {
    ElDatePicker,
  },
  setup() {
    const date: Ref<number[]> = ref([])
    const cate = ref('')
    const patn = ref('')
    const tableData: Ref<HistoricalAlarmModel[]> = ref([])
    const cateList = ref(['critical', 'alarm', 'warning', 'event', 'view'])
    const { oneHourRange } = useOneHourTime()
    const { ws } = useWebsocket()
    date.value = oneHourRange.value
    const setData = (data: HistoricalAlarmData) => {
      if (data.func === 81) {
        if (data.rows) {
          data.rows.forEach((i) => tableData.value.push(i))
        }
        if (data.tokn) {
          if (data.tokn === '-1') {
            ws().remove(setData)
          } else {
            handleSubmit(data.tokn)
          }
        }
      }
    }
    const handleSubmit = (tokn: string) => {
      if (tokn === '') {
        tableData.value = []
      }
      const frti = setTimeDate(date.value[0])
      const toti = setTimeDate(date.value[1])
      ws()
        .set({ success: setData })
        .send({
          func: useFunc('ReadHistoricalAlarm'),
          tokn,
          srch: '',
          sett: '',
          ofst: 0,
          frti,
          toti,
          cate: cate.value,
          patn: patn.value,
        })
    }
    return {
      tableData,
      date,
      patn,
      cate,
      cateList,
      handleSubmit,
      formatTime,
    }
  },
})
</script>
