<template>
  <div class="node-config" v-emqx-loading="isLoading">
    <emqx-card shadow="none" class="node-config-bd">
      <h3 class="card-title">
        {{ $t(direction === DriverDirection.North ? 'config.appConfig' : 'config.deviceConfig') }}
      </h3>
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t(direction === DriverDirection.North ? 'config.appName' : 'config.deviceName') }}</label>
          <span>{{ nodeName }}</span>
        </p>
      </div>
      <emqx-row>
        <emqx-col :span="12">
          <emqx-form ref="formCom" :model="configForm">
            <NodeConfigParamItem
              v-for="field in fieldList"
              :key="field.key"
              v-model="configForm[field.key]"
              :param-key="field.key"
              :param-info="field.info"
            />
          </emqx-form>
        </emqx-col>
      </emqx-row>
      <template v-if="!isLoading && fieldList.length === 0">
        <div class="empty-placeholder">
          <emqx-empty :description="$t('config.noConfigInfoDesc')" />
          <emqx-button @click="cancel" size="small">{{ $t('common.back') }}</emqx-button>
        </div>
      </template>
    </emqx-card>
    <emqx-card shadow="none" class="node-config-ft" v-if="!isLoading && fieldList.length > 0">
      <emqx-button type="primary" :loading="isSubmitting" @click="submit">{{ $t('common.submit') }}</emqx-button>
      <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
    </emqx-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import useNodeConfig from '@/composables/config/useNodeConfig'
import { DriverDirection } from '@/types/enums'
import NodeConfigParamItem from './components/NodeConfigParamItem.vue'

const props = defineProps({
  direction: {
    type: Number as PropType<DriverDirection>,
    required: true,
  },
})

const { nodeName, configForm, fieldList, isLoading, formCom, isSubmitting, submit, cancel } = useNodeConfig(props)
</script>

<style lang="scss">
.node-config {
  .node-config-ft {
    text-align: center;
    .emqx-button {
      width: 130px;
    }
  }
  .node-config-bd {
    margin-bottom: 24px;
    min-height: 200px;
  }
  .emqx-row {
    padding-top: 16px;
  }
  .el-radio-group {
    width: 100%;
  }
  .empty-placeholder {
    padding-bottom: 60px;
    text-align: center;
  }
}
</style>