<template>
  <ElTooltip placement="top" :content="content">
    <slot></slot>
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AComWithDesc',
})
</script>

<script lang="ts" setup>
import { ElTooltip } from 'element-plus'
import { defineProps } from 'vue'

const props = defineProps({
  content: {
    type: String,
  },
})
</script>
