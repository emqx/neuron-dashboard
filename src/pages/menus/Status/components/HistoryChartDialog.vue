<template>
  <el-dialog 
    custom-class="chart-dialog"
    :z-index="2000"
    :title="propName || objName"
    v-model="dialogVisible"
    width="900px"
    @closed="handleClose"
  >
    <div class="select">
      <el-date-picker
        v-model="time"
        range-separator="-"
        start-placeholder="start"
        end-placeholder="end"
        type="datetimerange"
      >
      </el-date-picker>
      <emqx-button @click="handleSubmit(-1)">{{ $t('common.submit') }}</emqx-button>
    </div>
    <div :style="chartStyle" ref="chartContainer"></div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import moment from 'moment'
import charts from 'echarts'
import { getData } from '@/api/data'
import { setOneHourTime, setTimeDate } from '@/utils/time'
import { ElDialog, ElDatePicker } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'

export default {
  components: {
    ElDialog,
    ElDatePicker,
  },
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
        backgroundColor: '#fff',
        grid: {
          top: '20px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#333',
            },
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
        width: '850px',
        height: '700px',
      }
    },
    status() {
      return this.$store.state.Status.alarmList.find((i) => i.objn === this.objName)
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  created() {
    this.time = setOneHourTime()
  },
  methods: {
    handleSubmit(tokn) {
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
        wtrm: 'neruon',
      }
      getData(this.nodeId, this.params).then((res) => {
        this.setData(res.data)
      })
    },
    setData(data) {
      if (data.func === 82) {
        if (data.errc !== 0) {
          EmqxMessage.error(data.emsg)
        } else {
          data.tele &&
            data.tele.forEach((i) => {
              const dataList = this.option.series
              const timeList = this.option.xAxis.data
              dataList.forEach((j) => j.data.push(i[j.name]))
              timeList.push(moment(i.tstp * 1000).format('YYYY-MM-DD HH:mm:ss'))
            })
          if (data.tokn) {
            if (data.tokn === -1) {
              this.chartInstance.setOption(this.option)
            } else {
              this.handleSubmit(data.tokn)
            }
          }
        }
      }
    },
    initChart() {
      if (!this.chartInstance) {
        this.chartInstance = charts.init(this.$refs.chartContainer, 'dark')
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
}
</script>

<style lang="scss" scoped>
>>> .el-dialog__body {
  padding: 0;
}
.select {
  padding: 20px;
}
</style>
