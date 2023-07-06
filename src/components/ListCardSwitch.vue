<template>
  <el-radio-group v-model="type" size="medium" @change="changeType">
    <el-radio-button label="list">
      <i class="icon-item el-icon-s-unfold"></i>
    </el-radio-button>
    <el-radio-button label="card">
      <i class="icon-item el-icon-menu"></i>
    </el-radio-button>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'
import { ElRadioGroup, ElRadioButton } from 'element-plus'

const props = defineProps({
  modelValue: { type: String, default: 'list' },
})
const emits = defineEmits(['update:modelValue', 'change'])

const type = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const changeType = (val: string) => {
  type.value = val
  emits('change', val)
}
</script>

<style lang="scss" scoped>
@import '@/styles/emqx-ui-variables.scss';

:deep(label) {
  margin-right: 0px;
}

:deep(.el-radio-button__inner) {
  padding: 8px 12px;
  .icon-item {
    font-size: 20px;
  }
}
:deep(.is-active .el-radio-button__inner) {
  color: $--color-primary;
  background-color: rgba($--color-primary, 0.1);
  border-color: #bae1ff;
}
:deep(.el-radio-button) {
  &:last-child.is-active .el-radio-button__inner {
    box-shadow: -1px 0 0 0px #bae1ff;
  }
}
</style>
