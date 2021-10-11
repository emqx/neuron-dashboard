<template>
  <div class="neuron-info-card">
    <div class="neuron-info-card-hd">
      <p>Neuron Gateway</p>
      <emqx-button size="small">{{ $t('common.restart') }}</emqx-button>
    </div>
    <div class="neuron-info-card-bd">
      <emqx-row>
        <emqx-col :span="12">
          <label>{{ $t('config.workStatus') }}:</label>
          <i class="iconfont iconlanguage"></i>
          <span>{{ info.status }}</span>
        </emqx-col>
        <emqx-col :span="12">
          <label>{{ $t('config.deviceConnectNum') }}:</label>
          <span>{{ info.deviceNum }}</span>
        </emqx-col>
      </emqx-row>
      <emqx-row>
        <emqx-col :span="12">
          <label>{{ $t('config.runningTime') }}:</label>
          <span>{{ timeFormat(info.runningTime) }}</span>
        </emqx-col>
        <emqx-col :span="12">
          <label>{{ $t('config.versionNAuthInfo') }}:</label>
          <span
            >Version {{ info.version }}
            {{ info.isAuthorize ? $t('common.authorized') : $t('common.unauthorized') }}</span
          >
        </emqx-col>
      </emqx-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useTimeFormat from '@/composables/useTimeFormat'

const info = {
  runningTime: 30000,
  version: '2.3',
  isAuthorize: true,
  deviceNum: 36,
  status: '停止',
}
const { timeFormat } = useTimeFormat()
</script>

<style lang="scss">
.neuron-info-card {
  min-width: 530px;
  padding: 24px;
  border-radius: 4px;
  color: #fff;
  background-color: #189bfe;
  .neuron-info-card-hd {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    margin-bottom: 24px;
    p {
      margin-right: 16px;
    }
  }
  .emqx-row {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
  label {
    color: #fff;
  }
}
</style>
