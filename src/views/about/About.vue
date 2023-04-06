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
        <emqx-descriptions-item :label="$t('admin.systemStatus')">{{
          $t(`${systemStatusText}`)
        }}</emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.systemRunningTime')">
          {{ systemRunningTime }}
        </emqx-descriptions-item>

        <emqx-descriptions-item :label="$t('admin.memoryUsage')">
          <el-progress
            :stroke-width="14"
            :percentage="generalStatistics.memPercent"
            status="success"
            class="progress-bar"
          >
            <span class="progress-text">
              {{ generalStatistics.memUsedBytes }} / {{ generalStatistics.memTotalBytes }}</span
            >
          </el-progress>
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.hwToken')">
          {{ hwToken }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.builtDate')">
          {{ versionData.build_date }}
        </emqx-descriptions-item>
      </emqx-descriptions>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue'
import { ElProgress } from 'element-plus'
import { queryVersion, queryHardwareToken } from '@/api/admin'
import { getStatisticByType } from '@/api/statistics'
import { secondToTime } from '@/utils/time'
import { formatMemory } from '@/utils/utils'
import useLang from '@/composables/useLang'

const { currentLang } = useLang()

const isDataLoading = ref(false)

const versionData = ref({
  version: '',
  build_date: '',
})
const hwToken = ref('')

const generalStatistics = reactive({
  systemRunningTime: '', // neuron running seconds
  systemStatus: '',
  memPercent: 0,
  memTotalBytes: '',
  memUsedBytes: '',
  startupTimeMatchReg: /(uptime_seconds=?)(\s*\d*)(?=\n)/g,
  debugFilesMatchReg: /(core_dumped=?)(\s*\d*)(?=\n)/g,
  memTotalBytesReg: /(mem_total_bytes=?)(\s*\d*)(?=\n)/g,
  memUsedBytesReg: /(mem_used_bytes=?)(\s*\d*)(?=\n)/g,
})
let timer: undefined | number

const systemRunningTime = computed(() => {
  return secondToTime(Number(generalStatistics.systemRunningTime))
})
const systemStatusText = computed(() => {
  return generalStatistics.systemStatus === '0' ? 'common.normal' : 'common.exceptions'
})

const labelWidth = computed(() => {
  return currentLang.value === 'zh' ? '90px' : '120px'
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
        const memUsedBytesData = statisticsInfo.match(generalStatistics.memUsedBytesReg)
        const memTotalBytesData = statisticsInfo.match(generalStatistics.memTotalBytesReg)

        generalStatistics.systemRunningTime = startupTime ? startupTime[0].split(' ')[1] : ''
        generalStatistics.systemStatus = isDebugFiles ? isDebugFiles[0].split(' ')[1] : ''

        const memUsedBytes = Number(memUsedBytesData ? memUsedBytesData[0].split(' ')[1] : '0')
        const memTotalBytes = Number(memTotalBytesData ? memTotalBytesData[0].split(' ')[1] : '0')
        generalStatistics.memPercent = Number(
          memUsedBytes && memTotalBytes ? ((memUsedBytes / memTotalBytes) * 100).toFixed(2) : '0',
        )
        generalStatistics.memUsedBytes = formatMemory(memUsedBytes, 'Byte')
        generalStatistics.memTotalBytes = formatMemory(memTotalBytes, 'Byte')

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

.progress-bar {
  display: inline-flex;
  align-items: center;
  top: 2px;
}
:deep {
  .el-descriptions__label {
    display: inline-block;
    width: v-bind(labelWidth);
  }
  .el-progress-bar {
    width: 220px;
  }
  .el-progress__text {
    display: inline-block;
    margin-top: -2px;
  }
  // .el-progress-bar__innerText {
  //   color: var(--main-label-color);
  // }
}
.progress-text {
  color: #1d1d1d;
  font-size: 14px;
}
</style>
