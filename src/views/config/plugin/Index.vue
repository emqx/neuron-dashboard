<template>
  <emqx-card class="plugin" v-emqx-loading="isListLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('config.pluginManagement') }}</h3>
      <emqx-button type="primary" size="small" icon="iconfont iconcreate" @click="addPlugin"
        >{{ $t('common.add') }} Plugin</emqx-button
      >
    </div>
    <div class="filter-bar">
      <emqx-select v-model="filterNodeType" clearable>
        <emqx-option v-for="item in nodeTypeList" :key="item.value" :value="item.value" :label="item.label" />
        <emqx-option :value="ALL_KEY" :label="$t('config.all')"></emqx-option>
      </emqx-select>
    </div>
    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in listToShow" :key="item.id" tag="li" class="setup-item">
          <PluginItemCard :data="item" @deleted="getPluginList" @edit="editPlugin(item)" />
        </emqx-col>
      </emqx-row>
    </ul>
  </emqx-card>
  <PluginDialog v-model="showDialog" :plugin="currentPlugin" @submitted="getPluginList" />
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { DriverDirection } from '@/types/enums'
import PluginItemCard from './components/PluginItemCard.vue'
import usePlugin from '@/composables/config/usePlugin'
import PluginDialog from './components/PluginDialog.vue'
import { CreatedPlugin } from '@/types/config'
import { useNodeTypeSelect } from '@/composables/config/useDriver'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'

const { pluginList, isListLoading, getPluginList } = usePlugin()
const { nodeTypeList } = useNodeTypeSelect()
const filterNodeType = ref(null)
const currentPlugin: Ref<undefined | CreatedPlugin> = ref(undefined)
const showDialog = ref(false)
const ALL_KEY = 'all'

const listToShow = computed(() => {
  if (!filterNodeType.value || filterNodeType.value === ALL_KEY) {
    return pluginList.value
  }
  return pluginList.value.filter(({ node_type }) =>
    filterNodeType.value === DriverDirection.South
      ? node_type === DriverDirection.South
      : NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type),
  )
})

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
.plugin {
  .filter-bar {
    margin-bottom: 16px;
    .emqx-select {
      width: 280px;
    }
  }
  .setup-list {
    list-style: none;
    .setup-item {
      margin-bottom: 24px;
    }
  }

  .emqx-select {
    .el-icon-circle-close {
      font-size: 16px;
    }
  }
  .el-col-8 {
    max-width: 33.2%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 33.2%;
  }
}
</style>
