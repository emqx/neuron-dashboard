<template>
  <el-dialog :title="propName || objName" :visible.sync="dialogVisible" width="900px" @closed="handleClose">
    <div class="select">
      <el-date-picker
        v-model="time"
        range-separator="-"
        start-placeholder="start"
        end-placeholder="end"
        type="datetimerange"
        value-format="timestamp"
      >
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-button @click="handleSubmit(-1)">{{ $t('common.submit') }}</el-button>
    </div>
    <div :style="chartStyle" ref="chartContainer"></div>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import charts from 'echarts'
import { setOneHourTime, setTimeDate } from '@/utils/time'

export default {
  props: {
    objName: {
      type: String,
      default: '',
    },
    props: {
      type: Array,
    },
  },
  data() {
    return {
      dialogVisible: false,
      chartInstance: null,
      propName: null,
      params: {},
      time: [],
      option: {
        grid: {
          top: '20px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      },
    }
  },
  computed: {
    chartStyle() {
      return {
        width: '900px',
        height: '700px',
      }
    },
    status() {
      return this.$store.state.Status.alarmList.find((i) => i.objn === this.objName)
    },
  },
  methods: {
    handleSubmit(tokn) {
      if (tokn === -1) {
        this.option.series = []
        this.option.xAxis.data = []
        this.chartInstance.clear()
        this.initChart()
      }
      if (!this.time) {
        this.time = []
      }
      const frti = setTimeDate(this.time[0])
      const toti = setTimeDate(this.time[1])
      this.params = {
        func: 82,
        srcn: this.objName,
        attn: this.propName || '',
        fend: 0,
        tokn,
        frti,
        toti,
      }
      this.$ws().set({ success: this.setData }).send(this.params)
    },
    setData(data) {
      if (data.func === 82) {
        if (data.tele) {
          data.tele.forEach((i) => {
            const dataList = this.option.series
            const timeList = this.option.xAxis.data
            dataList.forEach((j) => j.data.push(i[j.name]))
            timeList.push(moment(i.tstp * 1000).format('YYYY-MM-DD HH:mm:ss'))
          })
        }
        if (data.tokn) {
          if (data.tokn === -1) {
            this.chartInstance.setOption(this.option)
            this.$ws().remove(this.setData)
          } else {
            this.handleSubmit(data.tokn)
          }
        }
      }
    },
    initChart() {
      if (!this.chartInstance) {
        this.chartInstance = charts.init(this.$refs.chartContainer)
      }
      if (this.propName) {
        this.option.series.push({
          data: [],
          type: 'line',
          name: this.propName,
        })
      } else {
        this.props
          .filter((i) => i.check)
          .map((i) => i.prop)
          .forEach((i) => {
            if (i !== 'tstp' && i !== 'objn') {
              this.option.series.push({
                data: [],
                type: 'line',
                name: i,
              })
            }
          })
      }
      this.chartInstance.setOption(this.option)
    },
    handleClose() {
      this.option.series = []
      this.option.xAxis.data = []
      this.propName = null
      this.params = {}
      this.chartInstance.clear()
    },
    handleShow(row, type) {
      this.time = [moment().subtract(1, 'hours'), moment()]
      this.propName = row ? row.prop : null
      this.dialogVisible = true
      this.$nextTick(this.initChart)
    },
  },
  created() {
    this.time = setOneHourTime()
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding: 0;
}
.select {
  padding: 20px;
}
</style>
