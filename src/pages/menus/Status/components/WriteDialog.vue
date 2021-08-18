<template>
  <el-dialog :title="propName" v-model="dialogVisible" width="500px" @closed="handleClose">
    <span> {{ $t('status.value') }}: </span>
    <emqx-input v-model="val" style="width: 400px"></emqx-input>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button @click="dialogVisible = false">{{ $t('common.cancel') }}</emqx-button>
        <emqx-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
/* eslint-disable */
import { postData } from '@/api/data'
import { ElDialog } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'

export default {
  components: {
    ElDialog,
  },
  props: {
    objName: {
      type: String,
    },
  },
  data() {
    return {
      propName: '',
      dialogVisible: false,
      val: '',
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  methods: {
    handleShow(propName) {
      this.propName = propName
      this.dialogVisible = true
    },
    handleSubmit() {
      if (this.val) {
        const params = {
          func: 51,
          srcn: this.objName,
          attn: this.propName,
          valn: isNaN(+this.val) ? this.val : +this.val,
          wtrm: 'neruon',
        }
        postData(this.nodeId, params).then(() => {
          EmqxMessage.success(this.$t('common.submitSuccess'))
        })
      }
      this.dialogVisible = false
    },
    handleClose() {
      this.val = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
