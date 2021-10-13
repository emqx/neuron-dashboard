<template>
  <emqx-card v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.pluginManagement') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addPlugin"
        >{{ $t('common.add') }} Plugin</emqx-button
      >
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane :label="`${$t('config.northApp')} plugin`" :name="DriverDirection.North.toString()" />
      <el-tab-pane :label="`${$t('config.southDevice')} plugin`" :name="DriverDirection.South.toString()" />
    </el-tabs>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in pluginListToShow" :key="item.id" tag="li" class="setup-item">
          <PluginItemCard :data="item" @deleted="getPluginList" @edit="editPlugin(item)" />
        </emqx-col>
      </emqx-row>
    </ul>
  </emqx-card>
  <PluginDialog v-model="showDialog" :type="currentPluginType" :plugin="currentPlugin" @submitted="getPluginList" />
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { DriverDirection } from '@/types/enums'
import PluginItemCard from './components/PluginItemCard.vue'
import usePlugin from '@/composables/config/usePlugin'
import PluginDialog from './components/PluginDialog.vue'
import { CreatedPlugin } from '@/types/config'

const { northPluginList, southPluginList, isListLoading, getPluginList } = usePlugin()

const currentPluginType = ref(DriverDirection.North)
const activeTab = computed({
  get() {
    return currentPluginType.value.toString()
  },
  set(val) {
    currentPluginType.value = Number(val)
  },
})

const currentPlugin: Ref<undefined | CreatedPlugin> = ref(undefined)
const showDialog = ref(false)

const pluginListToShow = computed(() =>
  currentPluginType.value === DriverDirection.North ? northPluginList.value : southPluginList.value,
)

const addPlugin = () => {
  currentPlugin.value = undefined
  showDialog.value = true
}

const editPlugin = (pluginItem: CreatedPlugin) => {
  currentPlugin.value = pluginItem
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
