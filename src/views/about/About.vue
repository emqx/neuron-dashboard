<template>
  <emqx-card class="about" v-emqx-loading="isDataLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('common.about') }}</h3>
    </div>
    <div>
      <emqx-descriptions :column="1">
        <emqx-descriptions-item :label="$t('admin.version')">
          {{ versionData.version }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.builtDate')">
          {{ versionData.build_date }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.hwToken')">
          {{ hwToken }}
        </emqx-descriptions-item>
      </emqx-descriptions>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { queryVersion, queryHardwareToken } from '@/api/admin'
import { ref } from 'vue'

const versionData = ref({
  version: '',
  build_date: '',
})
const isDataLoading = ref(false)
const hwToken = ref('')

const getVersion = async () => {
  try {
    isDataLoading.value = true
    const { data } = await queryVersion()
    versionData.value = data
  } finally {
    isDataLoading.value = false
  }
}

const getHWToken = () => {
  queryHardwareToken().then((res) => {
    const { token } = res.data
    hwToken.value = token
  })
}

getVersion()
getHWToken()
</script>

<style lang="scss" scoped>
.about {
  min-height: 300px;
  .card-hd-with-btn {
    margin-bottom: 60px;
  }
}
</style>
