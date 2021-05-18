<template>
  <div class="config">
    <emqx-card>
      <h3 class="card-title">{{ $t('config.eventSetup') }}</h3>
      <emqx-row class="card-oper">
        <emqx-col :span="12"> </emqx-col>
        <emqx-col class="right" :span="12">
          <emqx-dropdown class="oper-dropdown" trigger="click">
            <emqx-button size="small" type="primary" icon="el-icon-d-caret">{{ $t('common.oper') }} </emqx-button>
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
      <emqx-table :data="tableData" @selection-change="handleSelectionChange">
        <emqx-table-column type="selection" width="55"> </emqx-table-column>
        <emqx-table-column prop="obsz" label="Object1" />
        <emqx-table-column prop="objn" label="Attribute1" />
        <emqx-table-column prop="obsz" label="Type" />
        <emqx-table-column prop="updt" label="Object2" />
        <emqx-table-column prop="logt" label="Attribute2" />
        <emqx-table-column prop="logt" label="Category" />
        <emqx-table-column prop="logt" label="Subroutine" />
        <emqx-table-column>
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
import useConfig, { useUploadObject } from '@/composables/config/useConfig'
import useWebsocket from '@/plugins/ws/useWebsocket'

export default defineComponent({
  name: 'Config',
  components: {},
  setup() {
    const { tableData } = useConfig()
    const fileList = ref([])
    const exportLoading = ref(false)
    const { uploadLoading, handleUploadChange } = useUploadObject()
    const handleSelectionChange = () => ({})
    const handleExport = () => ({})
    const handleUploadError = () => ({})

    return {
      tableData,
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
