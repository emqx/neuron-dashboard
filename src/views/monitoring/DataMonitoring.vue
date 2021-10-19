<template>
  <emqx-card class="data-monitoring">
    <h3 class="card-title">{{ $t('data.dataMonitoring') }}</h3>
    <div class="filter-bar common-flex">
      <div>
        <template v-if="currentGroup.groupName">
          <label>{{ $t('data.updated') }}</label>
          <span>{{ dateformat(updated, 'yyyy-mm-dd HH:MM:ss') }}</span>
        </template>
      </div>
      <div class="target-select">
        <div>
          <label>{{ $t('config.northApp') }}/{{ $t('config.southDevice') }}</label>
          <emqx-select v-model="currentGroup.nodeID" @change="selectedNodeChanged">
            <emqx-option v-for="item in nodeList" :key="item.id" :value="item.id" :label="item.name" />
          </emqx-select>
        </div>
        <div>
          <label>{{ $t('config.groupName') }}</label>
          <emqx-select v-model="currentGroup.groupName" @change="selectedGroupChanged">
            <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
          </emqx-select>
        </div>
      </div>
    </div>
    <div class="table-container" v-emqx-loading="isDataLoading">
      <emqx-table :data="tableData" :empty-text="tableEmptyText">
        <emqx-table-column prop="id" label="ID" min-width="180"></emqx-table-column>
        <emqx-table-column prop="name" :label="$t('common.name')" min-width="180"></emqx-table-column>
        <emqx-table-column prop="value" :label="$t('data.value')" min-width="180"></emqx-table-column>
        <emqx-table-column width="300" :label="$t('common.oper')" align="right">
          <template #default="{ row }">
            <emqx-button type="text" @click="writeData(row)">Write</emqx-button>
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      hide-on-single-page
      layout="sizes, prev, pager, next, jumper"
      v-model:current-page="pageController.num"
      :page-sizes="[100, 200, 300, 400, 500]"
      :total="pageController.total"
      :page-size="pageController.size"
      @size-change="handleSizeChange"
    />
  </emqx-card>
  <WriteDialog v-model="showWriteDialog" :data="currentWriteData" :tag-name="currentTagName" @updated="getTableData" />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import useDataMonitoring from '@/composables/data/useDataMonitoring'
import dateformat from 'dateformat'
import WriteDialog, { DataForWrite } from './components/WriteDialog.vue'
import { TagDataInMonitoring } from '@/types/data'

const {
  nodeList,
  groupList,
  currentGroup,
  isDataLoading,
  pageController,
  tableData,
  updated,
  tableEmptyText,
  getTableData,
  handleSizeChange,
  selectedNodeChanged,
  selectedGroupChanged,
} = useDataMonitoring()
const showWriteDialog = ref(false)
const currentWriteData: Ref<undefined | DataForWrite> = ref(undefined)
const currentTagName = ref('')

const writeData = ({ id, value, name }: TagDataInMonitoring) => {
  currentWriteData.value = {
    node_id: Number(currentGroup.value.nodeID),
    group_config_name: currentGroup.value.groupName,
    tagID: id,
    tagValue: value,
  }
  currentTagName.value = name || 'Tag'
  showWriteDialog.value = true
}
</script>

<style lang="scss">
.data-monitoring {
  .filter-bar {
    margin-bottom: 16px;
  }
  .target-select {
    > div {
      display: inline-block;
      &:not(:last-child) {
        margin-right: 16px;
      }
    }
    .emqx-select {
      width: 220px;
    }
  }
  .table-container {
    margin-bottom: 24px;
  }
  .emqx-pagination {
    text-align: right;
  }
}
</style>
