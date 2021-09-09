<template>
  <el-dialog 
    custom-class="chart-dialog"
    :z-index="2000"
    :title="propName || objName"
    v-model="dialogVisible"
    width="900px"
    @closed="handleClose"
  >
    <div :style="chartStyle" ref="chartContainer"></div>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import charts from 'echarts'
import { ElDialog } from 'element-plus'

export default {
  components: {
    ElDialog,
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
  },
  watch: {
    status: {
      handler(val) {
        if (this.chartInstance && this.dialogVisible) {
          const dataList = this.option.series
          const timeList = this.option.xAxis.data
          // if (dataList[0].data.length > 50) {
          //   dataList.forEach(i => i.data.shift())
          //   timeList.shift()
          // }
          dataList.forEach((i) => {
            i.data.push(this.status[i.name])
          })
          timeList.push(this.status.tstp.split(' ')[1])
          this.chartInstance.setOption(this.option)
        }
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      if (!this.chartInstance) {
        this.chartInstance = charts.init(this.$refs.chartContainer, 'dark')
      }
      if (this.propName) {
        this.option.series.push({
          data: [],
          type: 'line',
          areaStyle: {},
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
      this.chartInstance.clear()
    },
    handleShow(row) {
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
</style>
