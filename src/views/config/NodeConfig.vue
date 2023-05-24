<template>
  <div class="node-config" v-emqx-loading="isLoading">
    <article shadow="none" class="node-config-bd">
      <h3 class="card-title">{{ cardTitle }}</h3>
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ labelForNodeName }}</label>
          <span>{{ node }}</span>
        </p>
      </div>

      <emqx-form ref="formCom" :model="configForm">
        <template v-for="field in fieldList" :key="field.key">
          <emqx-row>
            <NodeConfigParamItem
              :ref="setParamRef"
              v-if="shouldFieldShow(field, configForm)"
              v-model="configForm[field.key]"
              :param-key="field.key"
              :param-info="field.info"
              :default-data="defaultConfigData"
              @validateFileds="validateFileds"
            />
          </emqx-row>
        </template>
      </emqx-form>

      <template v-if="!isLoading && fieldList.length === 0">
        <div class="empty-placeholder">
          <emqx-empty :description="$t('config.noConfigInfoDesc')" />
          <emqx-button @click="cancel" size="small">{{ $t('common.back') }}</emqx-button>
        </div>
      </template>
    </article>
    <article shadow="none" class="node-config-ft" v-if="!isLoading && fieldList.length > 0">
      <emqx-button type="primary" :loading="isSubmitting" @click="submit">{{ $t('common.submit') }}</emqx-button>
      <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
      <emqx-button @click.stop="reset">{{ $t('common.reset') }}</emqx-button>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import useNodeConfig from '@/composables/config/useNodeConfig'
import { DriverDirection } from '@/types/enums'
import NodeConfigParamItem from './components/NodeConfigParamItem.vue'
import { useI18n } from 'vue-i18n'
import useNodeConfigParamCommon from '@/composables/config/useNodeConfigParamCommon'

const props = defineProps({
  direction: {
    type: Number as PropType<DriverDirection>,
    required: true,
  },
})

const { t } = useI18n()
const cardTitle = computed(() =>
  t(props.direction === DriverDirection.North ? 'config.appConfig' : 'config.deviceConfig'),
)
const labelForNodeName = computed(() =>
  t(props.direction === DriverDirection.North ? 'config.appName' : 'config.deviceName'),
)

const { shouldFieldShow } = useNodeConfigParamCommon()

const {
  node,
  configForm,
  defaultConfigData,
  fieldList,
  isLoading,
  formCom,
  setParamRef,
  isSubmitting,
  submit,
  cancel,
  reset,
  validateFileds,
} = useNodeConfig(props)
</script>

<style lang="scss">
.node-config {
  .node-config-ft {
    text-align: center;
    padding: 40px 0;
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
