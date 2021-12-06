<template>
  <div class="message-chart" ref="chartEl"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watchEffect, watch } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import dateFormat from 'dateformat'

const { t } = useI18n()

const NORTH = t('config.north')
const SOUTH = t('config.south')

const lineBaseOption = {
  type: 'line',
  stack: 'Total',
  smooth: true,
  lineStyle: { width: 2 },
  showSymbol: false,
  areaStyle: {
    opacity: 0.8,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgba(24, 155, 254, 0.5)' },
      { offset: 1, color: 'rgba(24, 155, 254, 0)' },
    ]),
  },
  emphasis: { focus: 'series' },
  symbolSize: 10,
  symbol: 'circle',
  itemStyle: {
    borderWidth: 3,
    borderColor: '#fff',
  },
}

const baseAxisOption = {
  axisLine: { show: false },
  axisTick: { show: false },
}

const mockXData = (length = 16) => {
  const ret = []
  for (let i = 0; i < length; i += 1) {
    ret.unshift(dateFormat(new Date(Date.now() - i * 60 * 1000), 'HH:MM'))
  }
  return ret
}
const mockYData = (length = 16) => {
  const ret = []
  for (let i = 0; i < length; i += 1) {
    ret.push(Math.ceil(Math.random() * 100))
  }
  return ret
}

const southData = mockYData()
const northData = mockYData()

const chartEl = ref()
let chartInstance = undefined
const option = reactive({
  backgroundColor: new echarts.graphic.LinearGradient(0.8, 0.2, 0, 0, [
    { offset: 0, color: 'rgba(34, 52, 106, 1)' },
    { offset: 0.23, color: 'rgba(19, 57, 95, 1)' },
    { offset: 0.45, color: 'rgba(12, 40, 62, 1)' },
    { offset: 0.73, color: 'rgba(12, 40, 62, 1)' },
    { offset: 1, color: 'rgba(38, 47, 110, 1)' },
  ]),
  textStyle: { color: '#fff' },
  color: ['#189BFE', '#566EFA'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: { backgroundColor: '#6a7985' },
      lineStyle: { width: 0 },
    },
  },
  legend: {
    top: '4%',
    left: '3%',
    data: [NORTH, SOUTH],
    textStyle: { color: '#fff' },
    formatter(data: string) {
      if (data === SOUTH) {
        return `${t('config.southMessageCount')}: ${southData.reduce((count, current) => count + current, 0)}`
      }
      return `${t('config.northMessageCount')}: ${northData.reduce((count, current) => count + current, 0)}`
    },
    lineStyle: { width: 0 },
    itemStyle: { borderWidth: 0 },
    icon: 'circle',
    itemWidth: 10,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: mockXData(),
      ...baseAxisOption,
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: { show: false },
      splitLine: { show: false },
      ...baseAxisOption,
    },
  ],
  series: [
    {
      name: SOUTH,
      data: southData,
      ...lineBaseOption,
    },
    {
      name: NORTH,
      data: northData,
      ...lineBaseOption,
    },
  ],
})

onMounted(() => {
  chartInstance = echarts.init(chartEl.value)
  chartInstance.setOption(option)
})
</script>

<style lang="scss">
.message-chart {
  border-radius: 4px;
  overflow: hidden;
}
</style>
