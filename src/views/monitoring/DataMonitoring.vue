<template>
  <emqx-card class="data-monitoring">
    <ViewHeaderBar>
      <template v-slot:left>
        <span v-if="currentGroup.groupName" class="header-item">
          <label class="label">{{ $t('data.updated') }}</label>
          <span>{{ dateformat(updated, 'yyyy-mm-dd HH:MM:ss') }}</span>
        </span>
      </template>

      <template v-slot:right>
        <div class="header-item search-group">
          <label class="label">{{ $t('config.southDevice') }}</label>
          <!-- <emqx-select
            v-model="currentGroup.node"
            size="medium"
            filterable
            class="filter-selector"
            @change="selectedNodeChanged"
          >
            <emqx-option v-for="{ name } in nodeList" :key="name" :value="name" :label="name" />
          </emqx-select> -->
          <AutoKeywordSearchInput
            v-model="currentGroup.node"
            :all-search-data="nodeList"
            :getKeywordListFunc="filterSouthNodesByKeyword"
            :trigger-on-focus="true"
            :placeholder="$t('config.searchNodePlaceholder')"
            @select="selectedNodeChanged"
            @enter="selectedNodeChanged"
            @input="selectedNodeChanged"
            @clear="selectedNodeChanged"
            class="header-item"
          >
            <template v-slot:content="{ item }">
              <div class="item title">{{ item.name }}</div>
            </template>
          </AutoKeywordSearchInput>
        </div>

        <div class="header-item search-group">
          <label class="label">{{ $t('config.groupName') }}</label>
          <emqx-select
            v-model="currentGroup.groupName"
            filterable
            size="medium"
            class="filter-selector"
            @change="selectedGroupChanged"
          >
            <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
          </emqx-select>
        </div>
      </template>
    </ViewHeaderBar>

    <div class="table-container">
      <emqx-table :data="tableData" :empty-text="tableEmptyText">
        <emqx-table-column prop="tagName" :label="$t('common.name')" min-width="100"></emqx-table-column>
        <emqx-table-column prop="address" :label="$t('config.address')" min-width="100"></emqx-table-column>
        <emqx-table-column :label="$t('common.type')" width="90">
          <template #default="{ row }">{{ findTagTypeLabelByValue(row.type) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.decimal')">
          <template #default="{ row }">{{ tagDecimalValue(row.decimal) }}</template>
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
                  size="mini"
                  v-model="showValueByHexadecimal"
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
            <emqx-button type="text" @click="writeData(row)" v-if="canWrite(row)">Write</emqx-button>
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageController.num"
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
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ElPopover } from 'element-plus'
import type { TagDataInTable } from '@/composables/data/useDataMonitoring'
import useDataMonitoring from '@/composables/data/useDataMonitoring'
import { useTagTypeSelect, useTagDecimal } from '@/composables/config/useAddTag'
import dateformat from 'dateformat'
import { getErrorMsg } from '@/utils/utils'
import WriteDialog from './components/WriteDialog.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import AutoKeywordSearchInput from '@/components/AutoKeywordSearchInput.vue'

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
  filterSouthNodesByKeyword,
  selectedGroupChanged,
} = useDataMonitoring()
const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()
const showWriteDialog = ref(false)
const currentTag: Ref<undefined | TagDataInTable> = ref(undefined)

const writeData = (item: TagDataInTable) => {
  currentTag.value = item
  showWriteDialog.value = true
}
const { tagDecimalValue } = useTagDecimal()
</script>

<style lang="scss">
.data-monitoring {
  .filter-selector {
    width: 220px;
  }
  .target-select {
    > div {
      display: inline-block;
      &:not(:last-child) {
        margin-right: 16px;
      }
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
