<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.pluginManagement') }}</h3>

      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addPlugin"
        >{{ $t('common.add') }} Plugin</emqx-button
      >
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane :label="`${$t('config.northApp')} plugin`" :name="DriverDirection.North" />
      <el-tab-pane :label="`${$t('config.southDriver')} plugin`" :name="DriverDirection.South" />
    </el-tabs>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in pluginListToShow" :key="item.id" tag="li" class="setup-item">
          <PluginItemCard :data="item" @deleted="getPluginList" />
        </emqx-col>
      </emqx-row>
    </ul>
  </emqx-card>
  <AddPluginDialog v-model="showDialog" :type="activeTab" @submitted="getPluginList" />
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { DriverDirection } from '@/types/enums'
import PluginItemCard from './components/PluginItemCard.vue'
import usePlugin from '@/composables/config/usePlugin'
import AddPluginDialog from './components/AddPluginDialog.vue'

const { northPluginList, southPluginList, getPluginList } = usePlugin()

const activeTab = ref(DriverDirection.North)
const showDialog = ref(false)

const pluginListToShow = computed(() =>
  activeTab.value === DriverDirection.North ? northPluginList.value : southPluginList.value,
)

const addPlugin = () => {
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
