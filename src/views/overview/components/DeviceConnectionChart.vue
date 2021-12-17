<template>
  <div ref="chartEl" class="device-connection-chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import dateFormat from 'dateformat'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { AxisPointerComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import useResizeChart from '@/composables/useResizeChart'

echarts.use([
  BarChart,
  AxisPointerComponent,
  LegendComponent,
  TooltipComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

const { setEChartInstance } = useResizeChart()

const mockXData = (length = 27) => {
  const ret = []
  for (let i = 0; i < length; i += 1) {
    ret.unshift(dateFormat(new Date(Date.now() - i * 60 * 1000), 'HH:MM'))
  }
  return ret
}
const mockYData = (length = 27) => {
  const ret = []
  for (let i = 0; i < length; i += 1) {
    ret.push(Math.floor(Math.random() * 64))
  }
  return ret
}

const chartEl = ref()
let chartInstance = undefined
const options = reactive({
  grid: { top: 0, bottom: 0, left: 0, right: 0 },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: { backgroundColor: '#6a7985' },
      lineStyle: { width: 0 },
    },
  },
  xAxis: {
    type: 'category',
    data: mockXData(27),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { show: false },
    splitLine: { show: false },
  },
  series: [
    {
      data: mockYData(27),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#00B173' },
            { offset: 1, color: '#23C0AA' },
          ],
        },
      },
    },
  ],
})

onMounted(() => {
  chartInstance = echarts.init(chartEl.value)
  setEChartInstance(chartInstance)
  chartInstance.setOption(options)
})
</script>

<style lang="scss">
.device-connection-chart {
  height: 20px;
}
</style>
