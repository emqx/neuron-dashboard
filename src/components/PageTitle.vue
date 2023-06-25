<template>
  <div v-if="!isSubApp" class="neuron-page-title">{{ title }}</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { isSubApp } from '@/utils/forToBeSubApp'

defineProps({
  title: { type: String, default: '' },
})
</script>
