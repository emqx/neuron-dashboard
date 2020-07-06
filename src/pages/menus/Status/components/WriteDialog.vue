<template>
  <el-dialog :title='propName'
             :visible.sync="dialogVisible"
             width="500px"
             @closed="handleClose">
    <span>
      value:
    </span>
    <el-input v-model="val"
              style='width:400px;'></el-input>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="dialogVisible = false">cancle</el-button>
      <el-button type="primary"
                 @click="handleSubmit">submit</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    objName: {
      type: String
    }
  },
  data () {
    return {
      propName: '',
      dialogVisible: false,
      val: ''
    }
  },
  methods: {
    handleShow (propName) {
      console.log(propName, this.objName)
      this.propName = propName
      this.dialogVisible = true
    },
    handleSubmit () {
      if (this.val) {
        const params = {
          func: 51,
          'srcn': this.objName,
          'attn': this.propName,
          'valn': isNaN(+this.val) ? this.val : +this.val
        }
        this.$ws().send(params)
      }
      this.dialogVisible = false
    },
    handleClose () {
      this.val = ''
    }
  },
  mounted () {
  }
}
</script>

<style lang='scss' scoped>
</style>
