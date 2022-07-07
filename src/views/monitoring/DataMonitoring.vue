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
          <emqx-select v-model="currentGroup.node" filterable @change="selectedNodeChanged">
            <emqx-option v-for="{ name } in nodeList" :key="name" :value="name" :label="name" />
          </emqx-select>
        </div>
        <div>
          <label>{{ $t('config.groupName') }}</label>
          <emqx-select v-model="currentGroup.groupName" filterable @change="selectedGroupChanged">
            <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
          </emqx-select>
        </div>
      </div>
    </div>

    <div class="table-container">
      <emqx-table :data="tableData" :empty-text="tableEmptyText">
        <emqx-table-column prop="tagName" :label="$t('common.name')" min-width="100" />
        <emqx-table-column prop="address" :label="$t('config.address')" min-width="100" />
        <emqx-table-column :label="$t('common.type')" width="90">
          <template #default="{ row }">{{ findTagTypeLabelByValue(row.type) }}</template>
        </emqx-table-column>
        <emqx-table-column prop="valueToShow" min-width="100">
          <template #header>
            <div class="value-column-hd">
              <span>{{ $t('data.value') }}</span>
              <el-popover placement="top-start" :width="180" trigger="hover">
                <template #reference>
                  <i class="iconfont iconalarm" />
                </template>
                <label class="hexadecimal-label">{{ $t('data.displayTheValueInHexadecimal') }}</label>
                <emqx-switch
                  v-model="showValueByHexadecimal"
                  size="mini"
                  @change="handleShowValueByHexadecimalChanged"
                />
              </el-popover>
            </div>
          </template>
          <template #default="{ row }">
            <span v-if="!row.error">{{ row.valueToShow }}</span>
            <span v-else class="has-error"> Error({{ row.error }}): {{ getErrorMsg(row.error) }} </span>
          </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.desc')" prop="description" min-width="100" />

        <emqx-table-column width="100" :label="$t('common.oper')" align="right">
          <template #default="{ row }">
            <emqx-button v-if="canWrite(row)" type="text" @click="writeData(row)">Write</emqx-button>
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      v-model:current-page="pageController.num"
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[100, 200, 300, 400, 500]"
      :total="pageController.total"
      :page-size="pageController.size"
      @size-change="handleSizeChange"
    />
  </emqx-card>
  <WriteDialog
    v-model="showWriteDialog"
    :group="currentGroup.groupName"
    :tag="currentTag"
    :node-name="currentNodeName"
    @updated="getTableData"
  />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { ElPopover } from 'element-plus'
import dateformat from 'dateformat'
import useDataMonitoring, { TagDataInTable } from '@/composables/data/useDataMonitoring'
import WriteDialog from './components/WriteDialog.vue'
import { getErrorMsg } from '@/utils/utils'
import { useTagTypeSelect } from '@/composables/config/useAddTag'

const {
  nodeList,
  groupList,
  currentGroup,
  pageController,
  tableData,
  showValueByHexadecimal,
  updated,
  currentNodeName,

  tableEmptyText,

  handleShowValueByHexadecimalChanged,
  canWrite,
  getTableData,
  handleSizeChange,
  selectedNodeChanged,
  selectedGroupChanged,
} = useDataMonitoring()
const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()
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
  .has-error {
    color: var(--main-red-color);
  }
}
</style>
