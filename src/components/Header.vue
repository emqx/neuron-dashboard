<template>
  <emqx-header class="header">
    <template v-slot:title>
      <img src="../assets/images/logo.png" alt="emqx-platform-logo" width="141" />
    </template>
  </emqx-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
})
</script>

<style lang="scss">
.header {
  background: #092132;
}
</style>
