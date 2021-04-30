<template>
  <div class="driver-setup">
    <label>{{ $t('config.driverName') }}:</label>
    <span>{{ driverName }}</span>
    <emqx-button class="driver-btn" type="primary" plain icon="el-icon-plus">{{ $t('config.newDriver') }}</emqx-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'DriverSetup',
  setup() {
    const driverName = ref('None')
    return {
      driverName,
    }
  },
})
</script>

<style lang="scss">
.driver-setup {
  .driver-btn {
    margin-left: 20px;
  }
}
</style>
