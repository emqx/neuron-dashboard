<template>
  <div class="config">
    <emqx-card>
      <h3 class="card-title">{{ $t('config.objectSetup') }}</h3>
      <emqx-row class="card-oper">
        <emqx-col :span="12">
          <driver-setup></driver-setup>
        </emqx-col>
        <emqx-col class="right" :span="12">
          <emqx-button icon="el-icon-download" :loading="exportLoading" plain type="primary" @click="handleExport">
            {{ $t('common.export') }}
          </emqx-button>
          <el-upload
            ref="upload"
            action=""
            class="upload-excel"
            accept=".xlsx"
            :show-file-list="false"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="handleUploadChange"
            :on-error="handleUploadError"
          >
            <emqx-button icon="el-icon-upload2" plain type="primary" :loading="uploadLoading">
              {{ $t('common.import') }}
            </emqx-button>
          </el-upload>
          <emqx-dropdown class="oper-dropdown" trigger="click">
            <emqx-button type="primary" icon="el-icon-d-caret">{{ $t('common.oper') }} </emqx-button>
            <template #dropdown>
              <emqx-dropdown-menu>
                <emqx-dropdown-item><i class="el-icon-plus"></i> {{ $t('common.create') }}</emqx-dropdown-item>
                <emqx-dropdown-item><i class="el-icon-close"></i> {{ $t('common.clear') }}</emqx-dropdown-item>
                <emqx-dropdown-item class="danger"
                  ><i class="el-icon-delete"></i> {{ $t('common.delete') }}</emqx-dropdown-item
                >
              </emqx-dropdown-menu>
            </template>
          </emqx-dropdown>
        </emqx-col>
      </emqx-row>
      <emqx-table :data="objectList" @selection-change="handleSelectionChange">
        <emqx-table-column type="selection" width="55"> </emqx-table-column>
        <emqx-table-column type="index" width="120" label="No" />
        <emqx-table-column prop="objn" :label="$t('data.objName')" min-width="250" />
        <emqx-table-column prop="obsz" :min-width="120" label="Size" />
        <emqx-table-column prop="updt" :min-width="120" label="Update Time" />
        <emqx-table-column prop="logt" :min-width="120" label="Log Time" />
        <emqx-table-column prop="tstd" :min-width="120" label="Timestamp">
          <template #scope>
            {{ scope.row.tstd ? 'YES' : 'NO' }}
          </template>
        </emqx-table-column>
        <emqx-table-column :width="200">
          <template #scope>
            <emqx-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</emqx-button>
            <emqx-button type="text" @click="goToAttrPage(scope.row)">{{ $t('data.attribute') }}</emqx-button>
            <emqx-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</emqx-button>
          </template>
        </emqx-table-column>
      </emqx-table>
    </emqx-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElUpload } from 'element-plus'
import DriverSetup from './components/DriverSetup.vue'

export default defineComponent({
  name: 'Config',
  components: {
    DriverSetup,
    ElUpload,
  },
  setup() {
    const objectList = ref([])
    const fileList = ref([])
    const exportLoading = ref(false)
    const uploadLoading = ref(false)
    const handleSelectionChange = () => ({})
    const handleExport = () => ({})
    const handleUploadChange = () => ({})
    const handleUploadError = () => ({})
    return {
      objectList,
      fileList,
      exportLoading,
      uploadLoading,
      handleExport,
      handleSelectionChange,
      handleUploadChange,
      handleUploadError,
    }
  },
})
</script>

<style lang="scss">
.config {
  .upload-excel {
    display: inline-block;
    margin: 0 20px;
  }
}
</style>
