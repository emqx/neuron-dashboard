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
          <span>停止</span>
        </emqx-col>
        <emqx-col :span="12">
          <label>{{ $t('config.deviceConnectNum') }}:</label>
          <span>36</span>
        </emqx-col>
      </emqx-row>
      <emqx-row>
        <emqx-col :span="12">
          <label>{{ $t('config.runningTime') }}:</label>
          <span>3 小时 27 分钟</span>
        </emqx-col>
        <emqx-col :span="12">
          <label>{{ $t('config.versionNAuthInfo') }}:</label>
          <span>Version 2.1 已授权</span>
        </emqx-col>
      </emqx-row>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

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
