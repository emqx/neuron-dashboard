<template>
  <emqx-card class="plugin" v-emqx-loading="isListLoading">
    <ViewHeaderBar>
      <template v-slot:left>
        <emqx-button type="primary" size="small" icon="iconfont iconcreate" class="header-item btn" @click="addPlugin">
          {{ $t('config.addPlugin') }}
        </emqx-button>
      </template>
      <template v-slot:right>
        <emqx-select
          v-model="filterNodeType"
          clearable
          size="medium"
          :placeholder="$t('common.pleaseSelect')"
          class="header-item filter-item"
        >
          <emqx-option v-for="item in nodeTypeList" :key="item.value" :value="item.value" :label="item.label" />
          <emqx-option :value="ALL_KEY" :label="$t('config.all')"></emqx-option>
        </emqx-select>
      </template>
    </ViewHeaderBar>

    <ul class="setup-list">
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="item in listToShow" :key="item.name" tag="li" class="setup-item">
          <PluginItemCard :data="item" @deleted="getPluginList" @edit="editPlugin(item)" />
        </emqx-col>
      </emqx-row>
    </ul>
    <emqx-empty v-if="!isListLoading && listToShow.length === 0" />
  </emqx-card>
  <PluginDialog v-model="showDialog" :plugin="currentPlugin" @submitted="getPluginList" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNodeTypeSelect } from '@/composables/config/useDriver'
import usePlugin from '@/composables/config/usePlugin'
import type { CreatedPlugin } from '@/types/config'
import { DriverDirection, PluginKind } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import type { Ref } from 'vue'
import PluginDialog from './components/PluginDialog.vue'
import PluginItemCard from './components/PluginItemCard.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'

const { pluginList, isListLoading, getPluginList } = usePlugin()
const { nodeTypeList } = useNodeTypeSelect()
const filterNodeType = ref(null)
const currentPlugin: Ref<undefined | CreatedPlugin> = ref(undefined)
const showDialog = ref(false)
const ALL_KEY = 'all'

const listNeedShow = computed(() => {
  return pluginList.value.filter(({ kind }) => {
    return kind !== PluginKind.Static
  })
})

const listToShow = computed(() => {
  if (!filterNodeType.value || filterNodeType.value === ALL_KEY) {
    return listNeedShow.value
  }
  return listNeedShow.value.filter(({ node_type }) =>
    filterNodeType.value === DriverDirection.South
      ? SOUTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type)
      : NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type),
  )
})

const addPlugin = () => {
  currentPlugin.value = undefined
  showDialog.value = true
}
</script>

<style lang="scss" scoped>
.plugin {
  .filter-item {
    width: 220px;
  }
  .setup-list {
    list-style: none;
    margin-top: 6px;
    .setup-item {
      margin-bottom: 24px;
    }
  }

  :deep(.emqx-select) {
    .el-icon-circle-close {
      font-size: 16px;
    }
  }
}
</style>
