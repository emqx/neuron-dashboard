<template>
  <arcticle class="log">
    <h3 class="card-title">{{ $t('admin.log') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div>
        <div class="filter-item">
          <label>{{ $t('admin.timeRange') }}</label>
          <el-date-picker
            class="filter-date-picker"
            v-model="timeRange"
            type="datetimerange"
            @change="refreshData"
            :clearable="false"
          />
        </div>
        <div class="filter-item">
          <label>{{ $t('admin.logType') }}</label>
          <emqx-select class="filter-select" v-model="logType" @change="refreshData">
            <emqx-option v-for="{ value, label } in logTypeOptions" :key="value" :value="value" :label="label" />
          </emqx-select>
        </div>
      </div>
      <emqx-button type="primary" @click="getLogs">{{ $t('common.submit') }}</emqx-button>
    </div>
    <div class="table-container">
      <emqx-table :data="tableData" :empty-text="$t('common.emptyData')">
        <emqx-table-column :label="$t('admin.log')">
          <template #default="{ row }">
            {{ row }}
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageController.num"
      :page-sizes="[200, 300, 500, 1000]"
      :page-count="pageController.totalPageNum"
      :page-size="pageController.size"
      @current-change="getLogs"
      @size-change="handleSizeChange"
    />
  </arcticle>
</template>

<script setup lang="ts">
import useLog from '@/composables/admin/useLog'
import { ElDatePicker } from 'element-plus'

const { timeRange, logType, logTypeOptions, tableData, pageController, getLogs, refreshData, handleSizeChange } =
  useLog()
</script>

<style lang="scss">
.log {
  .filter-item {
    display: inline-block;
    margin-right: 16px;
  }
  .filter-date-picker,
  .filter-select {
    display: inline-block;
    line-height: 1;
  }
  .filter-date-picker {
    width: 360px;
  }
  .filter-select {
    width: 220px;
  }
  .table-container {
    margin-bottom: 24px;
  }
}
</style>
