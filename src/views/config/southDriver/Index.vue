<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.south') + $t('config.driverSetup') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addConfig">{{
        $t('config.addConfig')
      }}</emqx-button>
    </div>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in southDriverList" :key="item.id" tag="li" class="setup-item">
          <SouthDriveItemCard :data="item" />
        </emqx-col>
      </emqx-row>
    </ul>
  </emqx-card>
  <DriverDialog v-model="showDialog" :type="DriverDirection.South" @submitted="getSouthDriverList" />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import SouthDriveItemCard from './components/SouthDriveItemCard.vue'
import useSouthDriver from '@/composables/config/useSouthDriver'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import { DriverDirection } from '@/types/enums'

const { southDriverList, isListLoading, getSouthDriverList } = useSouthDriver()

const showDialog = ref(false)

const addConfig = () => {
  showDialog.value = true
}
</script>

<style lang="scss">
.setup-list {
  list-style: none;
  .setup-item {
    margin-bottom: 24px;
  }
}
</style>
