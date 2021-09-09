<template>
  <div class="script-type" style="display: inline-block">
    <span class="routine-label">Routine:</span>
    <emqx-select v-model="scriptType.subr" class="routine-select" @change="handleSelect">
      <emqx-option v-for="item in scriptTypeList" :key="item.subr" :label="item.name" :value="item.subr"> </emqx-option>
    </emqx-select>
    <span class="btn-group">
      <emqx-button @click="handleCreate" type="primary">{{ $t('common.create') }}</emqx-button>
      <emqx-button
        @click="handleDelete"
        type="danger"
        :disabled="[-10, -22, -20].includes(scriptType.subr) || !scriptType.subr"
        >{{ $t('common.delete') }}</emqx-button
      >
    </span>
    <el-dialog :z-index="2000" :title="$t('configuration.createSubroutine')" @closed="handleClose" v-model="dialogVisible">
      <emqx-form
        :model="subroutineForm"
        :rules="subroutineFormRules"
        label-width="160px"
        label-position="left"
        ref="subroutineForm"
      >
        <emqx-form-item prop="name" :label="$t('configuration.subroutineName')">
          <emqx-input v-model="subroutineForm.name"></emqx-input>
        </emqx-form-item>
        <emqx-form-item prop="subr" :label="$t('configuration.subroutineNumber')">
          <emqx-input v-model.number="subroutineForm.subr" type="number" placeholder="1 - 999"></emqx-input>
        </emqx-form-item>
      </emqx-form>
      <template v-slot:footer>
        <emqx-button @click="dialogVisible = false">{{ $t('common.cancel') }}</emqx-button>
        <emqx-button type="primary" @click="handleSubmit">{{ $t('common.submit') }}</emqx-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getData, deleteData } from '@/api/data'
import { ElDialog } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

/* eslint-disable */
export default {
  name: 'ScriptType',
  components: {
    ElDialog,
  },
  props: ['modelValue'],
  data() {
    const checkSubr = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Subroutine number is required'))
      }
      if (!Number.isInteger(value)) {
        callback(new Error('Please input digits'))
      } else if (value < 1 || value > 999) {
        callback(new Error('Values range from 1 to 999'))
      } else {
        callback()
      }
    }
    return {
      scriptType: {
        name: '',
        subr: '',
      },
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
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  watch: {
    modelValue: {
      handler(val) {
        this.scriptType = val
      },
      immediate: true,
    },
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      getData(this.nodeId, { func: 32, wtrm: 'neruon' }).then((res) => {
        this.setSubroutineList(res.data)
      })
    },
    setSubroutineList(data) {
      if (data.func === 32 && data.rows) {
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
      ElMessageBox(this.$t('common.confirmDelete'), this.$t('common.delete'), {
        type: 'warning',
      })
        .then(() => {
          const list = [-10, -20, -30]
          if (this.scriptType.subr && !list.includes(this.scriptType.subr)) {
            deleteData(this.nodeId, { func: 35, subr: this.scriptType.subr, wtrm: 'neruon' }).then(() => {
              EmqxMessage.success(this.$t('common.deleteSuccess'))
            })
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
      this.$refs.subroutineForm.$refs.form.resetFields()
      this.subroutineForm = {
        name: '',
        subr: '',
      }
    },
    handleSubmit() {
      this.$refs.subroutineForm.$refs.form.validate((valid) => {
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
}
</script>

<style scoped lang="scss">
.script-type {
  .routine-label {
    margin-right: 20px;
  }
  .routine-select {
    width: 350px;
    margin-right: 20px;
  }
  .btn-group {
    margin-right: 10px;
  }
}
</style>
