<template>
  <div style="display: inline-block;">
    <span>{{ $t('configuration.routine') }}:</span>
    &nbsp;&nbsp;
    <el-select v-model="scriptType.subr" style="width: 400px;" @change="handleSelect" placeholder="">
      <el-option v-for="item in scriptTypeList" :key="item.subr" :label="item.name" :value="item.subr"> </el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-button @click="handleCreate" type="primary">{{ $t('common.create') }}</el-button>
    <el-button
      @click="handleDelete"
      type="danger"
      :disabled="[-10, -22, -20].includes(scriptType.subr) || !scriptType.subr"
      >{{ $t('common.delete') }}</el-button
    >
    <el-dialog :title="$t('configuration.createSubroutine')" @closed="handleClose" :visible.sync="dialogVisible">
      <el-form
        :model="subroutineForm"
        :rules="subroutineFormRules"
        label-width="160px"
        label-position="left"
        ref="subroutineForm"
      >
        <el-form-item prop="name" :label="$t('configuration.subroutineName')">
          <el-input v-model="subroutineForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="subr" :label="$t('configuration.subroutineNumber')">
          <el-input v-model.number="subroutineForm.subr" type="number" placeholder="1 - 999"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    const checkSubr = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Subroutine number is required'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else {
        if (value < 1 || value > 999) {
          callback(new Error('Values range from 1 to 999'))
        } else {
          callback()
        }
      }
    }
    return {
      scriptType: null,
      scriptTypeList: [
        { name: 'Main', subr: -10 },
        { name: 'Auto', subr: -22 },
        { name: 'Manual', subr: -20 },
      ],
      dialogVisible: false,
      subroutineForm: {
        name: '',
        subr: '',
      },
      subroutineFormRules: {
        name: [{ required: true, message: '', trigger: 'blur' }],
        subr: [
          { required: true, message: '', trigger: 'blur' },
          { validator: checkSubr, trigger: 'blur' },
        ],
      },
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.$ws().set({ success: this.setSubroutineList }).send({ func: 32 })
    },
    setSubroutineList(data) {
      if (data.func === 32) {
        this.$ws().remove(this.setSubroutineList)
        data.rows.forEach((i) => {
          if (!this.scriptTypeList.some((j) => j.subr === i.subr)) {
            this.scriptTypeList.unshift({
              subr: i.subr,
              name: `SR${i.subr} - ${i.name}`,
            })
            this.scriptTypeList.sort((prev, next) => prev.subr - next.subr)
          }
        })
      }
    },
    handleCreate() {
      this.dialogVisible = true
    },
    handleDelete() {
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.delete'), {
        type: 'warning',
      })
        .then(() => {
          const list = [-10, -20, -30]
          if (this.scriptType.subr && !list.includes(this.scriptType.subr)) {
            this.$ws().send({ func: 35, subr: this.scriptType.subr })
            const res = this.scriptTypeList.filter((i) => list.includes(i.subr) || i.subr !== this.scriptType.subr)
            if (res.length !== this.scriptTypeList.length) {
              this.scriptTypeList = res
              this.scriptType = {
                name: '',
                subr: '',
              }
            }
            this.$emit('delete')
          }
        })
        .catch(() => {})
    },
    handleClose() {
      this.$refs.subroutineForm.resetFields()
      this.subroutineForm = {
        name: '',
        subr: '',
      }
    },
    handleSubmit() {
      this.$refs.subroutineForm.validate((valid) => {
        if (valid) {
          const { name, subr } = this.subroutineForm
          if (!this.scriptTypeList.some((i) => i.subr === subr)) {
            this.$emit('submit', name, subr)
            this.dialogVisible = false
            this.init()
          }
        } else {
          return false
        }
      })
    },
    handleSelect(e) {
      if (e) {
        const res = this.scriptTypeList.filter((i) => i.subr === e)
        this.scriptType = {
          name: res[0].name,
          subr: res[0].subr,
        }
        this.$emit('input', this.scriptType)
      }
    },
  },
  watch: {
    value: {
      handler(val) {
        this.scriptType = val
      },
      immediate: true,
    },
  },
}
</script>

<style scoped lang="scss"></style>
