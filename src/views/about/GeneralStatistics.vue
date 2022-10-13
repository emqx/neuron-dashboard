<template>
  <emqx-card class="about" v-emqx-loading="loading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('common.generalStatistics') }}</h3>
    </div>
    <div>
      <emqx-descriptions :column="1">
        <emqx-descriptions-item :label="$t('admin.systemRunningTime')">
          {{ systemRunningTime }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.isExistDebugFiles')">{{
          $t(`${isExistDebugFilesText}`)
        }}</emqx-descriptions-item>
      </emqx-descriptions>
    </div>
  </emqx-card>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { secondToTime } from '@/utils/time'
import { getStatisticByType } from '@/api/statistics'

const loading = ref(false)
const generalStatistics = reactive({
  systemRunningTime: '', // neuron running seconds
  isExistDebugFiles: '',
})

const systemRunningTime = computed(() => {
  return secondToTime(Number(generalStatistics.systemRunningTime))
})
const isExistDebugFilesText = computed(() => {
  return generalStatistics.isExistDebugFiles === '1' ? 'common.yes' : 'common.no'
})

const startupTimeMatchReg = /(uptime_seconds=?)(\s*\d)*(?=\n)/
const debugFilesMatchReg = /(core_dumped=?)(\s*\d)*(?=\n)/

const getGeneralStatistics = async () => {
  try {
    loading.value = true
    const { data } = await getStatisticByType('global')

    const startupTime = data.match(startupTimeMatchReg)
    const isDebugFiles = data.match(debugFilesMatchReg)
    generalStatistics.systemRunningTime = startupTime ? startupTime[2].trim() : ''
    generalStatistics.isExistDebugFiles = isDebugFiles ? isDebugFiles[2].trim() : ''
  } finally {
    loading.value = false
  }
}
getGeneralStatistics()
</script>
