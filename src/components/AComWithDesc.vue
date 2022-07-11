<template>
  <ElTooltip placement="top" :content="content">
    <slot></slot>
  </ElTooltip>
</template>

<script lang="ts" setup>
import { ElTooltip } from 'element-plus'
import { defineProps } from 'vue'

const props = defineProps({
  content: {
    type: String,
  },
})
</script>
