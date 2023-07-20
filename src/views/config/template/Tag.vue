<template>
  <article v-emqx-loading="isListLoading" class="tag-page">
    <h3 class="card-title">{{ $t('config.tagList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left">
        <p class="driver-name">
          <label>{{ $t('template.templateName') }}</label>
          <span>{{ template }}</span>
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <i v-if="isAdminUser">
            <emqx-button size="small" type="primary" @click="goCreatePage">
              {{ $t('common.create') }}
            </emqx-button>
            <emqx-button size="small" type="warning" :disabled="!tagList.length" @click="clearTag">{{
              $t('common.clear')
            }}</emqx-button>
            <emqx-button size="small" type="danger" :disabled="!tagCheckedList.length" @click="batchDeleteTag">{{
              $t('common.delete')
            }}</emqx-button>
          </i>
          <KeywordSerachInput
            v-model="queryKeyword.name"
            class="search_input"
            @input="dbGetTagList"
            @clear="dbGetTagList"
            @enter="dbGetTagList"
          />
        </div>
      </div>
    </div>

    <div class="table-container">
      <emqx-table :data="tagList" :empty-text="$t('common.emptyData')">
        <emqx-table-column :width="28">
          <template #header>
            <emqx-checkbox v-model="allChecked" />
          </template>
          <template #default="{ row }">
            <emqx-checkbox v-model="row.checked" />
          </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('common.name')" prop="name"></emqx-table-column>
        <emqx-table-column :label="$t('config.address')" prop="address"></emqx-table-column>

        <emqx-table-column :label="$t('common.type')">
          <template #default="{ row }">{{ findTagTypeLabelByValue(row.type) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('common.attribute')">
          <template #default="{ row }">{{ getAttrStrByValue(row.attribute) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.decimal')">
          <template #default="{ row }">{{ tagDecimalValue(row.decimal) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.precision')">
          <template #default="{ row }">{{ tagPrecisionValue(row.type, row.precision) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.desc')" prop="description" />

        <emqx-table-column v-if="isAdminUser" align="left" :label="$t('common.oper')" width="140px">
          <template #default="{ row }">
            <AComWithDesc :content="$t('common.edit')">
              <i class="el-icon-edit-outline" @click="editTag(row)" />
            </AComWithDesc>
            <AComWithDesc :content="$t('common.delete')">
              <i class="iconfont icondelete" @click="delTag(row)" />
            </AComWithDesc>
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      v-if="pageController.total > 50"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageController.pageNum"
      :page-sizes="[50, 100, 200]"
      :total="pageController.total"
      :page-size="pageController.pageSize"
      @current-change="getAPageTagData"
      @size-change="handleSizeChange"
    />
    <!-- Edit tag -->
    <EditTagDialog
      v-model="showEditDialog"
      :tag="currentTag"
      :template="template"
      @submitted="refreshTable"
      :group="groupName"
    />
  </article>
</template>

<script lang="ts" setup>
import AComWithDesc from '@/components/AComWithDesc.vue'
import KeywordSerachInput from '@/components/KeywordSearchInput.vue'
import EditTagDialog from './components/EditTagDialog.vue'
import useTemplateTagList from '@/composables/config/useTemplateTagList'
import {
  useTagTypeSelect,
  useTagAttributeTypeSelect,
  useTagPrecision,
  useTagDecimal,
} from '@/composables/config/useAddTagCommon'
import useUser from '@/composables/useUser'

const { isAdminUser } = useUser()

const {
  template,
  groupName,

  isListLoading,
  tagList,
  tagCheckedList,
  allChecked,

  pageController,
  getAPageTagData,
  handleSizeChange,

  delTag,
  batchDeleteTag,
  clearTag,

  queryKeyword,
  dbGetTagList,
  refreshTable,

  goCreatePage,
  editTag,
  showEditDialog,
  currentTag,
} = useTemplateTagList()
const { tagPrecisionValue } = useTagPrecision()
const { tagDecimalValue } = useTagDecimal()
const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()
const { getAttrStrByValue } = useTagAttributeTypeSelect()
</script>

<style lang="scss">
.tag-page {
  .table-container {
    margin-bottom: 24px;
  }
  .search_input {
    margin-left: 10px;
  }
}
</style>
