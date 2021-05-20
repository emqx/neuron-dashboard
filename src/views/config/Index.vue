<template>
  <div class="config">
    <emqx-card>
      <h3 class="card-title">{{ $t('config.objectSetup') }}</h3>
      <emqx-row class="card-oper">
        <emqx-col :span="12">
          <driver-setup></driver-setup>
        </emqx-col>
        <emqx-col class="right" :span="12">
          <emqx-button
            size="small"
            icon="el-icon-download"
            :loading="exportLoading"
            plain
            type="primary"
            @click="handleExport"
          >
            {{ $t('common.export') }}
          </emqx-button>
          <emqx-upload
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
            <emqx-button size="small" icon="el-icon-upload2" plain type="primary" :loading="uploadLoading">
              {{ $t('common.import') }}
            </emqx-button>
          </emqx-upload>
          <emqx-dropdown class="oper-dropdown" trigger="click">
            <emqx-button size="small" type="primary" icon="el-icon-d-caret">{{ $t('common.oper') }} </emqx-button>
            <template #dropdown>
              <emqx-dropdown-menu>
                <emqx-dropdown-item @click="createObject">
                  <i class="el-icon-plus"></i>
                  {{ $t('common.create') }}
                </emqx-dropdown-item>
                <emqx-dropdown-item><i class="el-icon-close"></i> {{ $t('common.clear') }}</emqx-dropdown-item>
                <emqx-dropdown-item class="danger"
                  ><i class="el-icon-delete"></i> {{ $t('common.delete') }}</emqx-dropdown-item
                >
              </emqx-dropdown-menu>
            </template>
          </emqx-dropdown>
        </emqx-col>
      </emqx-row>
      <emqx-table :data="tableData" @selection-change="handleSelectionChange">
        <emqx-table-column type="selection" width="55"> </emqx-table-column>
        <emqx-table-column type="index" label="No" />
        <emqx-table-column prop="objn" :label="$t('data.objName')" />
        <emqx-table-column prop="obsz" label="Size" />
        <emqx-table-column prop="updt" label="Update Time" />
        <emqx-table-column prop="logt" label="Log Time" />
        <emqx-table-column>
          <template #default="scope">
            <emqx-button type="text" @click="editObject(scope.row)">{{ $t('common.edit') }}</emqx-button>
            <emqx-button type="text" @click="goToAttrPage(scope.row)">{{ $t('data.attribute') }}</emqx-button>
            <emqx-button type="text" @click="delObj(scope.row)">{{ $t('common.delete') }}</emqx-button>
          </template>
        </emqx-table-column>
      </emqx-table>
    </emqx-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useConfig, { useUploadObject } from '@/composables/config/useConfig'
import DriverSetup from './components/DriverSetup.vue'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Config',
  components: {
    DriverSetup,
  },
  setup() {
    const router = useRouter()
    const { tableData, editObject, goToAttrPage, delObj } = useConfig()
    const fileList = ref([])
    const exportLoading = ref(false)
    const { uploadLoading, handleUploadChange } = useUploadObject()
    const handleSelectionChange = () => ({})
    const handleExport = () => ({})
    const handleUploadError = () => ({})
    const createObject = () => {
      router.push({
        name: 'ObjectSetup',
      })
    }

    return {
      tableData,
      editObject,
      goToAttrPage,
      delObj,
      fileList,
      exportLoading,
      uploadLoading,
      handleExport,
      handleSelectionChange,
      handleUploadChange,
      handleUploadError,
      createObject,
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
