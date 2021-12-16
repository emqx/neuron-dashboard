<template>
  <el-dialog :title="propName" :visible.sync="dialogVisible" width="500px" @closed="handleClose">
    <span> {{ $t('status.value') }}: </span>
    <el-input v-model="val" style="width: 400px;"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    objName: {
      type: String,
    },
    attr: {
      type: Object,
    },
  },
  data() {
    return {
      propName: '',
      dialogVisible: false,
      val: '',
    }
  },
  methods: {
    handleShow(propName) {
      console.log(propName, this.objName)
      this.propName = propName
      this.dialogVisible = true
    },
    handleSubmit() {
      /* 
        When the attribute type is 'string', 
        even if the write data is ‘123’, 
        it must be submitted as string type data.
      */
      const { type = 'word' } = this.attr
      const valn = type === 'string' ? this.val : Number.isNaN(+this.val) ? this.val : +this.val
      if (this.val) {
        const params = {
          func: 51,
          srcn: this.objName,
          attn: this.propName,
          valn,
        }
        this.$ws().send(params)
      }
      this.dialogVisible = false
    },
    handleClose() {
      this.val = ''
    },
  },
  mounted() {},
}
</script>

<style lang="scss" scoped></style>
