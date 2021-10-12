<template>
  <div class="plugin-item-card">
    <p class="plugin-item-name">{{ data.name }}</p>
    <div class="info-row">
      <label>{{ $t('common.type') }}</label>
      <span>{{ PluginKind[data.kind] }}</span>
    </div>
    <div class="info-row">
      <label>{{ $t('config.libName') }}</label>
      <span>{{ data.lib_name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CreatedPlugin } from '@/types/config'
import { PluginKind } from '@/types/enums'
import { defineProps, PropType } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<CreatedPlugin>,
    required: true,
  },
})
</script>

<style lang="scss">
.plugin-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f4f9fc;
  .plugin-item-name {
    margin-bottom: 16px;
  }
  .info-row:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
