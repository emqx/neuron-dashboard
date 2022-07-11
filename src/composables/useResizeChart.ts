import { onMounted, onUnmounted } from 'vue'
import type { EChartsType } from 'echarts/core'

export default () => {
  let chart: undefined | EChartsType
  let timer: undefined | number

  const setEChartInstance = (chartInstance: EChartsType) => {
    chart = chartInstance
  }

  const handleWindowResize = () => {
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      if (chart?.resize) {
        chart.resize()
      }
    }, 100)
  }

  onMounted(() => {
    window.addEventListener('resize', () => {
      handleWindowResize()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize)
  })

  return {
    setEChartInstance,
  }
}
