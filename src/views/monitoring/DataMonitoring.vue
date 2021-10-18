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
        <emqx-table-column prop="tag_id" label="Tag ID" min-width="180"></emqx-table-column>
        <emqx-table-column width="300" :label="$t('common.oper')" align="right">
          <!-- <template #default="{ row }">
            <emqx-button type="text">Write</emqx-button>
          </template> -->
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
</template>

<script lang="ts" setup>
import useDataMonitoring from '@/composables/data/useDataMonitoring'
import dateformat from 'dateformat'
const {
  nodeList,
  groupList,
  currentGroup,
  isDataLoading,
  pageController,
  tableData,
  updated,
  tableEmptyText,
  handleSizeChange,
  selectedNodeChanged,
  selectedGroupChanged,
} = useDataMonitoring()
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
