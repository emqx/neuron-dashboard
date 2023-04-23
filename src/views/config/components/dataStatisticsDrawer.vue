<template>
  <el-drawer v-model="visible" :title="nodeName" direction="rtl" size="35%" custom-class="dataStatisticsDrawer">
    <main ref="drawerRef" class="content">
      {{ nodeStatisticData }}
    </main>
    <span v-if="!nodeStatisticData && !loadingStatistic" class="empty-state">{{ $t('common.emptyData') }}</span>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps, defineEmits } from 'vue'
import { ElDrawer } from 'element-plus'
import { dataStatistics } from '@/composables/config/useDriver'
import type { NodeCatogery } from '@/types/enums'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  type: { type: String as PropType<NodeCatogery[keyof NodeCatogery]>, default: '' },
  nodeName: { type: String, default: '' },
})
const emits = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emits('update:modelValue', val)
  },
})

const { drawerRef, loadingStatistic, nodeStatisticData, getNodeStatisticData } = dataStatistics()

if (props.type && props.nodeName) {
  getNodeStatisticData(props.type, { node: props.nodeName })
}
</script>

<style lang="scss">
.dataStatisticsDrawer {
  .el-drawer__header {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 500;
  }
  .el-drawer__body {
    border-top: 1px solid #eee;
    overflow: auto;
  }
}
</style>

<style lang="scss" scoped>
.content {
  line-height: 24px;
  padding: 20px;
  white-space: pre-wrap;
  color: #333;
}
.empty-state {
  display: inline-block;
  width: 100%;
  font-size: 16px;
  text-align: center;
  color: #666;
}
</style>
