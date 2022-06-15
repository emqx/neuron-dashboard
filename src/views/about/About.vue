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
      </emqx-descriptions>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { License } from '@/types/admin'
import { queryVersion } from '@/api/admin'
import { useI18n } from 'vue-i18n'

const versionData = ref({
  version: '',
  build_date: '',
})
const isDataLoading = ref(false)
const getVersion = async () => {
  try {
    isDataLoading.value = true
    const { data } = await queryVersion()
    versionData.value = data
  } catch (error) {
    //
  } finally {
    isDataLoading.value = false
  }
}

getVersion()
</script>

<style lang="scss" scoped>
.about {
  min-height: 300px;
  .card-hd-with-btn {
    margin-bottom: 60px;
  }
}
</style>
