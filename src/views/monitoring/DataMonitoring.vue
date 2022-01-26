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
          <label>{{ $t('config.southDevice') }}</label>
          <emqx-select v-model="currentGroup.nodeID" @change="selectedNodeChanged" filterable>
            <emqx-option v-for="item in nodeList" :key="item.id" :value="item.id" :label="item.name" />
          </emqx-select>
        </div>
        <div>
          <label>{{ $t('config.groupName') }}</label>
          <emqx-select v-model="currentGroup.groupName" @change="selectedGroupChanged" filterable>
            <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
          </emqx-select>
        </div>
      </div>
    </div>

    <div class="table-container">
      <emqx-table :data="tableData" :empty-text="tableEmptyText">
        <emqx-table-column prop="tagName" :label="$t('common.name')" min-width="180"></emqx-table-column>
        <emqx-table-column prop="address" :label="$t('config.address')" min-width="180"></emqx-table-column>
        <emqx-table-column prop="valueToShow" min-width="180">
          <template #header>
            <div class="value-column-hd">
              <span>{{ $t('data.value') }}</span>
              <el-popover placement="top-start" :width="180" trigger="hover">
                <template #reference>
                  <i class="iconfont iconalarm" />
                </template>
                <label class="hexadecimal-label">{{ $t('data.displayTheValueInHexadecimal') }}</label>
                <emqx-switch
                  size="mini"
                  v-model="showValueByHexadecimal"
                  @change="handleShowValueByHexadecimalChanged"
                />
              </el-popover>
            </div>
          </template>
        </emqx-table-column>
        <emqx-table-column width="300" :label="$t('common.oper')" align="right">
          <template #default="{ row }">
            <emqx-button type="text" @click="writeData(row)" v-if="canWrite(row)">Write</emqx-button>
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
  <WriteDialog v-model="showWriteDialog" :group="currentGroup" :tag="currentTag" @updated="getTableData" />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { ElPopover } from 'element-plus'
import useDataMonitoring, { TagDataInTable } from '@/composables/data/useDataMonitoring'
import dateformat from 'dateformat'
import WriteDialog from './components/WriteDialog.vue'

const {
  nodeList,
  groupList,
  currentGroup,
  pageController,
  tableData,
  showValueByHexadecimal,
  updated,

  tableEmptyText,

  handleShowValueByHexadecimalChanged,
  canWrite,
  getTableData,
  handleSizeChange,
  selectedNodeChanged,
  selectedGroupChanged,
} = useDataMonitoring()
const showWriteDialog = ref(false)
const currentTag: Ref<undefined | TagDataInTable> = ref(undefined)

const writeData = (item: TagDataInTable) => {
  currentTag.value = item
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
  .value-column-hd {
    display: flex;
    align-items: center;
  }
  .iconalarm {
    font-size: 22px;
    margin-left: 4px;
    font-weight: normal;
    cursor: pointer;
    color: var(--main-green-color);
  }
}
</style>