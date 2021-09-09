<template>
  <el-dialog 
    custom-class="upload-dialog"
    :z-index="2000"
    :title="$t('administration.uploadLicense')"
    v-model="showDialog"
    width="500px"
    @open="handleOpenDialog"
  >
    <emqx-upload
      class="upload-license"
      name="license"
      :action="`/device-manager-services/v0/neuron/${nodeId}/api/v1/license`"
      :headers="{
        Authorization: `Bearer ${uploadToken}`,
      }"
      :disabled="uploadToken === ''"
      :limit="1"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
    >
      <emqx-button :disabled="uploadToken === ''" icon="el-icon-upload" type="primary">{{
        $t('common.upload')
      }}</emqx-button>
    </emqx-upload>
    <p><i class="el-icon-warning"></i> {{ $t('administration.licenseTip') }}</p>
  </el-dialog>
</template>

<script>
import { ElDialog } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'
import http from '@/utils/http.js'
export default {
  components: { ElDialog },
  props: {
    modelValue: { type: Boolean },
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
