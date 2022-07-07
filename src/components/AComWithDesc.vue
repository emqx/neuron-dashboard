<template>
  <ElTooltip placement="top" :content="content">
    <slot />
  </ElTooltip>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
</script>

<script lang="ts" setup>
import { ElTooltip } from 'element-plus'

export default defineComponent({
  name: 'AComWithDesc',
})

const props = defineProps({
  content: {
    type: String,
  },
})
</script>
