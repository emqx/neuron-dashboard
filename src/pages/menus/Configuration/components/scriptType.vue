<template>
  <div style="display:inline-block;">
    <span>subroutine:</span>
    &nbsp;&nbsp;
    <el-select v-model="scriptType.subr"
               style="width:300px;"
               @change="handleSelect"
               placeholder="">
      <el-option v-for="item in scriptTypeList"
                 :key="item.subr"
                 :label="item.name"
                 :value="item.subr">
      </el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-button @click='handleDelete'
               type='danger'>delete</el-button>
    <el-button @click='handleCreate'
               type="primary">create</el-button>

    <el-dialog title="Create Subroutine"
               @closed='handleClose'
               :visible.sync="dialogVisible">
      <el-form :model="subroutineForm"
               :rules="subroutineFormRules"
               label-width="100px"
               ref='subroutineForm'>
        <el-form-item prop="name"
                      label="name">
          <el-input v-model="subroutineForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="subr"
                      label="subr">
          <el-input v-model="subroutineForm.subr"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="handleSubmit">submit</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      scriptType: null,
      scriptTypeList: [
        { name: 'Main', subr: -10 },
        { name: 'Auto', subr: -22 },
        { name: 'Manual', subr: -20 }
      ],
      dialogVisible: false,
      subroutineForm: {
        name: '',
        subr: ''
      },
      subroutineFormRules: {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        subr: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      this.$ws().set({ success: this.setSubroutineList }).send({ func: 32 })
    },
    setSubroutineList (data) {
      if (data.func === 32) {
        this.$ws().remove(this.setSubroutineList)
        data.rows.forEach(i => {
          if (!this.scriptTypeList.some(j => j.subr === i.subr)) {
            this.scriptTypeList.unshift({
              subr: i.subr,
              name: `${i.subr}     ${i.name}`
            })
          }
        })
      }
    },
    handleCreate () {
      this.dialogVisible = true
    },
    handleDelete () {
      this.$confirm('Are you sure delete this subroutine?', 'Delete', {
        type: 'warning'
      }).then(() => {
        const list = [-10, -20, -30]
        if (this.scriptType.subr && !list.includes(this.scriptType.subr)) {
          this.$ws().send({ func: 35, subr: this.scriptType.subr })
          const res = this.scriptTypeList.filter(i => list.includes(i.subr) || (i.subr !== this.scriptType.subr))
          if (res.length !== this.scriptTypeList.length) {
            this.scriptTypeList = res
            this.scriptType = {
              name: '',
              subr: ''
            }
          }
          this.$emit('delete')
        }
      }).catch(() => {
      })
    },
    handleClose () {
      this.$refs.subroutineForm.resetFields()
      this.subroutineForm = {
        name: '',
        subr: ''
      }
    },
    handleSubmit () {
      this.$refs.subroutineForm.validate((valid) => {
        if (valid) {
          const { name, subr } = this.subroutineForm
          if (!this.scriptTypeList.some(i => i.subr === subr)) {
            this.$emit('submit', name, subr)
            this.init()
            this.dialogVisible = false
          }
        } else {
          return false
        }
      })
    },
    handleSelect (e) {
      if (e) {
        const res = this.scriptTypeList.filter(i => i.subr === e)
        // debugger
        this.scriptType = {
          name: res[0].name,
          subr: res[0].subr
        }
        this.$emit('input', this.scriptType)
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.scriptType = val
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
</style>
