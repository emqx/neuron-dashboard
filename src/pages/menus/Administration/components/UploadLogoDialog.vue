<template>
  <el-dialog
    custom-class="upload-dialog"
    :title="$t('common.uploadLogo')"
    v-model="showDialog"
    width="500px"
    @open="handleOpenDialog"
  >
    <emqx-upload
      class="upload-logo"
      name="logo"
      :action="`/device-manager-services/v0/neuron/${nodeId}/api/v1/logo`"
      list-type="picture"
      :headers="{
        Authorization: `Bearer ${uploadToken}`,
      }"
      :disabled="uploadToken === ''"
      :limit="1"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
    >
      <emqx-button :disabled="uploadToken === ''" icon="el-icon-upload" type="primary">
        {{ $t('common.upload') }}
      </emqx-button>
      <template #tip>
        <div class="el-upload__tip">{{ $t('common.uploadLogoTip') }}</div>
      </template>
    </emqx-upload>
  </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import http from '@/utils/http.js'
import { EmqxMessage } from '@emqx/emqx-ui'

export default {
  components: { ElDialog },
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  data() {
    return {
      uploadToken: '',
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  methods: {
    handleUploadSuccess() {
      EmqxMessage.success(this.$t('common.uploadSuccess'))
      this.uploadToken = ''
    },
    handleUploadError(err) {
      EmqxMessage.error(`${err.status}: ${this.$t('common.uploadFailed')}`)
    },
    handleOpenDialog() {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const body = {
        ...user,
        wtrm: 'neuron',
        func: 10,
      }
      http.post(`/neuron/${this.nodeId}/api/v1/funcno10`, body).then((res) => {
        this.uploadToken = res.headers.cookie
      })
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/style/public.scss';
.upload-dialog {
  .el-icon-document,
  .el-upload-list__item-name {
    color: $color-text-main;
    &:hover,
    &:focus {
      .el-icon-document {
        color: #189bfe;
      }
    }
  }
  i {
    font-size: 16px;
  }
  .el-dialog__body {
    .el-icon-warning {
      color: #ffc600;
    }
    text-align: center;
    .el-upload__tip {
      color: $color-text-main;
    }
  }
  .el-upload-list--picture .el-upload-list__item {
    background: $color-bg;
  }
}
</style>
