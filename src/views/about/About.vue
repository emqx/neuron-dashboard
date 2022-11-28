<template>
  <emqx-card class="about" v-emqx-loading="isDataLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('common.about') }}</h3>
    </div>
    <div>
      <emqx-descriptions :column="1">
        <emqx-descriptions-item :label="$t('admin.version')">
          {{ versionData.version }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.builtDate')">
          {{ versionData.build_date }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.hwToken')">
          {{ hwToken }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.systemRunningTime')">
          {{ systemRunningTime }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.systemStatus')">{{
          $t(`${systemStatusText}`)
        }}</emqx-descriptions-item>
      </emqx-descriptions>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue'
import { queryVersion, queryHardwareToken } from '@/api/admin'
import { getStatisticByType } from '@/api/statistics'
import { secondToTime } from '@/utils/time'

const isDataLoading = ref(false)

const versionData = ref({
  version: '',
  build_date: '',
})
const hwToken = ref('')

const generalStatistics = reactive({
  systemRunningTime: '', // neuron running seconds
  systemStatus: '',
  startupTimeMatchReg: /(uptime_seconds=?)(\s*\d*)(?=\n)/g,
  debugFilesMatchReg: /(core_dumped=?)(\s*\d*)(?=\n)/g,
})
let timer: undefined | number

const systemRunningTime = computed(() => {
  return secondToTime(Number(generalStatistics.systemRunningTime))
})
const systemStatusText = computed(() => {
  return generalStatistics.systemStatus === '0' ? 'common.normal' : 'common.exceptions'
})

if (Promise && !Promise.allSettled) {
  Promise.allSettled = (promises: any[]) => {
    return Promise.all(
      promises.map((promise) => {
        return promise
          .then((value: any) => {
            return { state: 'fulfilled', value }
          })
          .catch((reason: any) => {
            return { state: 'rejected', reason }
          })
      }),
    )
  }
}

const getStatistic = () => {
  return new Promise((resolve, reject) => {
    getStatisticByType('global')
      .then((res) => {
        const { data: statisticsInfo } = res

        const startupTime = statisticsInfo.match(generalStatistics.startupTimeMatchReg)
        const isDebugFiles = statisticsInfo.match(generalStatistics.debugFilesMatchReg)
        generalStatistics.systemRunningTime = startupTime ? startupTime[0].split(' ')[1] : ''
        generalStatistics.systemStatus = isDebugFiles ? isDebugFiles[0].split(' ')[1] : ''

        setTimer()
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
const setTimer = () => {
  if (timer) {
    window.clearInterval(timer)
  }

  timer = window.setInterval(() => {
    getStatistic()
  }, 5000)
}

const init = () => {
  try {
    isDataLoading.value = true
    Promise.allSettled([queryVersion(), queryHardwareToken(), getStatistic()])
      .then((values: any) => {
        const { data: versionInfo } = values[0]?.value || { version: '', build_date: '' }
        const { data: hwTokenInfo } = values[1]?.value || {}

        versionData.value = versionInfo
        hwToken.value = hwTokenInfo?.token || ''
      })
      .finally(() => {
        isDataLoading.value = false
      })
  } catch (error) {
    console.log('error', error)
  }
}
init()

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
</script>

<style lang="scss" scoped>
.about {
  min-height: 300px;
}
</style>
