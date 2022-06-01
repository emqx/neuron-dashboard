<template>
  <emqx-card v-emqx-loading="isDataLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">License</h3>
    </div>
    <div class="license"></div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { License } from '@/types/admin'
import { queryVersion } from '@/api/admin'
import { useI18n } from 'vue-i18n'

const version = ref('')
const getVersion = async () => {
  const data = await queryVersion()
}

getVersion()
</script>

<style lang="scss" scoped>
.license {
  padding-bottom: 100px;
}
.placeholder {
  padding: 48px;
  text-align: center;
}
.msg.align-center {
  text-align: center;
}
.method-text {
  color: #bcbcbc;
  margin: 32px 0;
  > p {
    margin: 12px;
    margin-right: 0;
    margin-left: 0;
    a {
      margin: 0 2px;
      text-decoration: none;
      color: #459bf7;
    }
  }
}
</style>
