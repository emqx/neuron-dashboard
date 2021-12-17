import { nextTick, onMounted, onUnmounted } from '@vue/runtime-core'
import { EChartsType } from 'echarts/core'

export default () => {
  let chart: undefined | EChartsType = undefined
  let timer: undefined | number = undefined

  const setEChartInstance = (chartInstance: EChartsType) => {
    chart = chartInstance
  }

  const handleWindowResize = () => {
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      chart?.resize()
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
