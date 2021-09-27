<template>
  <emqx-card v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.tagList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left">
        <p class="driver-name">
          <label>{{ $t('config.driverName') }}</label>
          <span>{{ getNodeNameById(nodeID) }}</span>
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <emqx-button size="small" type="primary" @click="goCreatePage">{{ $t('common.create') }}</emqx-button>
          <emqx-button size="small" type="warning" @click="clearTag">{{ $t('common.clear') }}</emqx-button>
          <emqx-button size="small" type="danger" @click="batchDeleteTag">{{ $t('common.delete') }}</emqx-button>
        </div>
      </div>
    </div>
    <emqx-table :data="tagList">
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
      <emqx-table-column label="RW">
        <template #default="{ row }">{{ findTagAttributeTypeLabelByValue(row.attribute) }}</template>
      </emqx-table-column>

      <emqx-table-column align="right">
        <template #default="{ row }">
          <i class="el-icon-edit-outline" @click="editTag(row)" />
          <i class="iconfont iconalarm" />
          <i class="iconfont icondelete" @click="delTag(row)" />
        </template>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
  <EditTagDialog v-model="showEditDialog" :tag="currentTag" :node-id="nodeID" @submitted="getTagList" />
</template>

<script lang="ts" setup>
import { useTagAttributeTypeSelect, useTagTypeSelect } from '@/composables/config/useAddTag'
import EditTagDialog from './components/EditTagDialog.vue'
import useTagList from '@/composables/config/useTagList'
import useNodeList from '@/composables/config/useNodeList'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  nodeID,
  tagList,
  isListLoading,
  allChecked,
  currentTag,
  showEditDialog,
  getTagList,
  editTag,
  delTag,
  clearTag,
  batchDeleteTag,
} = useTagList()
const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()
const { findLabelByValue: findTagAttributeTypeLabelByValue } = useTagAttributeTypeSelect()
const { getNodeNameById } = useNodeList()

const goCreatePage = () => {
  router.push({ name: 'SouthDriverGroupAddTag' })
}
</script>
