<template>
  <div class="config-data-card">
    <div class="data-block">
      <p class="data-block-title">
        {{ $t('config.numberOfNorthApp') }}/{{ $t('config.numberOfRunningInstances') }}:
        <b>{{ count.northTotal }}/{{ count.northRunning }}</b>
      </p>
      <ElProgress
        class="blue"
        :show-text="false"
        :stroke-width="16"
        :percentage="(count.northRunning / count.northTotal) * 100"
      />
    </div>
    <div class="data-block">
      <p class="data-block-title">
        {{ $t('config.numberOfSouthDevices') }}/{{ $t('config.numberOfRunningInstances') }}:
        <b>{{ count.southTotal }}/{{ count.southRunning }}</b>
      </p>
      <ElProgress
        class="green"
        :show-text="false"
        :stroke-width="16"
        :percentage="(count.southRunning / count.southTotal) * 100"
      />
    </div>
    <div class="data-block">
      <p class="data-block-title">
        {{ $t('config.deviceConnectNum') }}:
        <b>{{ count.devicesConnection }}</b>
      </p>
      <DeviceConnectionChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElProgress } from 'element-plus'
import DeviceConnectionChart from './DeviceConnectionChart.vue'

const count = reactive({
  northTotal: 44,
  northRunning: 32,
  southTotal: 66,
  southRunning: 46,
  devicesConnection: 11,
})
</script>

<style lang="scss">
.config-data-card {
  box-sizing: border-box;
  padding: 24px;
  background: #e8f6f9;
  border-radius: 4px;
  .data-block {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
  .data-block-title {
    margin-bottom: 8px;
    line-height: 20px;
  }
  .el-progress-bar__outer,
  .el-progress-bar__inner {
    border-radius: 0;
  }
  .blue {
    .el-progress-bar__outer {
      background-color: rgba(75, 103, 246, 0.18);
    }
    .el-progress-bar__inner {
      background: linear-gradient(123deg, #586ff8 0%, #4963ff 100%);
    }
  }
  .green {
    .el-progress-bar__outer {
      background-color: rgba(70, 155, 247, 0.18);
    }
    .el-progress-bar__inner {
      background: linear-gradient(135deg, #189bfe 0%, #65d5ff 100%);
    }
  }
}
</style>
