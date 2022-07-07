<template>
  <emqx-breadcrumb separator="/">
    <emqx-breadcrumb-item :to="{ name: 'SouthDriver' }">{{ $t('config.southDeviceManagement') }}</emqx-breadcrumb-item>
    <emqx-breadcrumb-item :to="{ name: 'SouthDriverGroup' }">{{ $t('config.groupList') }}</emqx-breadcrumb-item>
    <emqx-breadcrumb-item>{{ $t('config.tagList') }}</emqx-breadcrumb-item>
  </emqx-breadcrumb>
  <emqx-card v-emqx-loading="isListLoading" class="tag-page">
    <h3 class="card-title">{{ $t('config.tagList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left">
        <p class="driver-name">
          <label>{{ $t('config.deviceName') }}</label>
          <span>{{ node }}</span>
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <emqx-dropdown :hide-timeout="512" popper-class="btn-download-temp-popper">
            <emqx-upload class="uploader-tag" :before-upload="uploadFile" :show-file-list="false" action="placeholder">
              <emqx-button size="small">
                <i class="iconfont icon-import icondownload" />
                <span>{{ $t('common.import') }}</span>
              </emqx-button>
            </emqx-upload>
            <template #dropdown>
              <emqx-dropdown-menu>
                <emqx-button class="btn-download-temp" @click="downloadTemplate">
                  <span>{{ $t('config.downloadTemplate') }}</span>
                </emqx-button>
              </emqx-dropdown-menu>
            </template>
          </emqx-dropdown>
          <emqx-button size="small" :loading="isExporting" @click="handleExport">
            <i class="iconfont icon-import iconsubmit" />
            <span>{{ $t('common.export') }}</span>
          </emqx-button>

          <emqx-button size="small" type="primary" @click="goCreatePage">{{ $t('common.create') }}</emqx-button>
          <emqx-button size="small" type="warning" @click="clearTag">{{ $t('common.clear') }}</emqx-button>
          <emqx-button size="small" type="danger" @click="batchDeleteTag">{{ $t('common.delete') }}</emqx-button>
        </div>
      </div>
    </div>
    <div class="table-container">
      <emqx-table :data="tagList">
        <emqx-table-column :width="28">
          <template #header>
            <emqx-checkbox v-model="allChecked" />
          </template>
          <template #default="{ row }">
            <emqx-checkbox v-model="row.checked" />
          </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('common.name')" prop="name" />
        <emqx-table-column :label="$t('config.address')" prop="address" />

        <emqx-table-column :label="$t('common.type')">
          <template #default="{ row }">{{ findTagTypeLabelByValue(row.type) }}</template>
        </emqx-table-column>
        <emqx-table-column label="RW">
          <template #default="{ row }">{{ getAttrStrByValue(row.attribute) }}</template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.desc')" prop="description" />

        <emqx-table-column align="right">
          <template #default="{ row }">
            <AComWithDesc :content="$t('common.edit')">
              <i class="el-icon-edit-outline" @click="editTag(row)" />
            </AComWithDesc>
            <!-- <AComWithDesc>
              <i class="iconfont iconalarm" />
            </AComWithDesc>-->
            <AComWithDesc :content="$t('common.delete')">
              <i class="iconfont icondelete" @click="delTag(row)" />
            </AComWithDesc>
          </template>
        </emqx-table-column>
      </emqx-table>
    </div>
    <emqx-pagination
      v-model:current-page="pageController.pageNum"
      hide-on-single-page
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[50, 100, 200]"
      :total="pageController.total"
      :page-size="pageController.pageSize"
      @current-change="getAPageTagData"
      @size-change="handleSizeChange"
    />
  </emqx-card>
  <EditTagDialog
    v-model="showEditDialog"
    :tag="currentTag"
    :node="node"
    :group="groupName"
    @submitted="refreshTable"
  />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useTagAttributeTypeSelect, useTagTypeSelect } from '@/composables/config/useAddTag'
import EditTagDialog from './components/EditTagDialog.vue'
import useTagList from '@/composables/config/useTagList'
import AComWithDesc from '@/components/AComWithDesc.vue'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'

const router = useRouter()

const {
  node,
  groupName,
  tagList,
  totalData,
  pageController,
  isListLoading,
  allChecked,
  currentTag,
  showEditDialog,
  getAPageTagData,
  refreshTable,
  handleSizeChange,
  editTag,
  delTag,
  clearTag,
  batchDeleteTag,
} = useTagList()
const { findLabelByValue: findTagTypeLabelByValue } = useTagTypeSelect()
const { getAttrStrByValue } = useTagAttributeTypeSelect()
const { uploadTag } = useUploadTagList()
const { isExporting, exportTable } = useExportTagTable()

const goCreatePage = () => {
  router.push({ name: 'SouthDriverGroupAddTag' })
}

const uploadFile = async (file: File) => {
  try {
    await uploadTag(file)
    refreshTable()
  } catch (error) {
    console.error(error)
  }
  return Promise.reject()
}

const downloadTemplate = () => {
  window.open('/template/upload-tag-template.xlsx', '_blank')
}

const handleExport = () => {
  exportTable(totalData.value, groupName.value, node.value)
}
</script>

<style lang="scss">
.tag-page {
  .uploader-tag {
    display: inline-block;
    margin-right: 10px;
  }
}
.btn-download-temp {
  font-weight: normal;
  border: none;
}
.btn-download-temp-popper {
  .el-dropdown-menu {
    padding: 0;
  }
}
.table-container {
  margin-bottom: 24px;
}
</style>
