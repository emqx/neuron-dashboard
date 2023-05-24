<template>
  <div class="neuron-page-title">{{ title }}</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: { type: String, default: '' },
})
</script>
