<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.northAppSetup') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate">{{ $t('config.addConfig') }}</emqx-button>
    </div>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in northDriverList" :key="item.id" tag="li" class="setup-item">
          <SetupItemCard :data="item"></SetupItemCard>
        </emqx-col>
      </emqx-row>
    </ul>
  </emqx-card>
</template>

<script lang="ts" setup>
import SetupItemCard from './components/SetupItemCard.vue'
import useNorthDriver from '@/composables/config/useNorthDriver'
const { northDriverList, isListLoading } = useNorthDriver()
</script>

<style lang="scss">
.setup-list {
  list-style: none;
  .setup-item {
    margin-bottom: 24px;
  }
}
</style>
