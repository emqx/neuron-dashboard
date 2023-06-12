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
        <emqx-select
          v-model="currentGroup.node"
          size="medium"
          filterable
          clearable
          class="header-item search-group filter-selector"
          :placeholder="$t('config.southDevicePlaceholder')"
          @change="selectedNodeChanged"
        >
          <emqx-option v-for="{ name } in nodeList" :key="name" :value="name" :label="name" />
        </emqx-select>

        <emqx-select
          v-model="currentGroup.groupName"
          filterable
          clearable
          size="medium"
          class="header-item search-group filter-selector"
          :placeholder="$t('config.groupPlaceholder')"
          @change="selectedGroupChanged"
        >
          <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
        </emqx-select>
        <KeywordSerachInput
          v-model="keywordSearch"
          class="header-item search_input"
          @input="dbGetTagList"
          @clear="dbGetTagList"
          @enter="dbGetTagList"
        />
      </template>
    </ViewHeaderBar>

    <div class="table-container">
      <emqx-table :data="tableData" :empty-text="tableEmptyText" @sort-change="sortDataByKey">
        <emqx-table-column
          prop="tagName"
          :label="$t('common.name')"
          sortable="custom"
          min-width="100"
        ></emqx-table-column>
        <emqx-table-column
          prop="address"
          :label="$t('config.address')"
          sortable="custom"
          min-width="100"
        ></emqx-table-column>
        <emqx-table-column :label="$t('common.type')" width="90" sortable="custom" prop="typeLabel">
          <template #default="{ row }">{{ row.typeLabel }}</template>
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
      v-if="pageController.total > 100"
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
    @updated="writtenTag"
  />
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ElPopover } from 'element-plus'
import type { TagDataInTable } from '@/composables/data/useDataMonitoring'
import useDataMonitoring from '@/composables/data/useDataMonitoring'
import { useTagDecimal } from '@/composables/config/useAddTagCommon'
import dateformat from 'dateformat'
import { getErrorMsg } from '@/utils/utils'
import WriteDialog from './components/WriteDialog.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import KeywordSerachInput from '@/components/KeywordSearchInput.vue'

const {
  nodeList,
  groupList,
  keywordSearch,
  currentGroup,
  pageController,
  tableData,
  showValueByHexadecimal,
  updated,
  currentNodeName,

  tableEmptyText,

  handleShowValueByHexadecimalChanged,
  canWrite,
  handleSizeChange,
  selectedNodeChanged,
  selectedGroupChanged,
  dbGetTagList,
  sortDataByKey,
  writtenTag,
} = useDataMonitoring()

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
