<template>
  <div class="object-setup">
    <div class="dd-mb dd-fr">
      <el-button @click='dialogTableVisible=true'
                 type="primary">Create</el-button>
      <el-button @click='handleDelete'
                 type="danger">Delete</el-button>
    </div>
    <div class="row">
      <ObjectTable :showBtn='true'
                   v-model="multipleSelection" />
    </div>
    <el-dialog @closed='close'
               :title='isDetail?"Object setup":"Object index setup"'
               :visible.sync="dialogTableVisible">
      <template v-if="isDetail">
        <div class="row">
          <el-form ref='objectSetupFrom'
                  :rules="objectSetupFromRules"
                  :model="objectSetupFrom"
                  class="dd-mb"
                  label-position="left"
                  label-width="160px">
            <el-form-item label="Object name"
                          prop="objn">
              <el-input v-model="objectSetupFrom.objn"></el-input>
            </el-form-item>
            <el-form-item label="Object size"
                          prop="obsz">
              <el-input-number v-model="objectSetupFrom.obsz"
                              :controls='false'
                              :precision='0'
                              :min="1"
                              :max="9" />
            </el-form-item>
            <el-form-item label="Update time"
                          prop="updt">
              <el-input-number v-model="objectSetupFrom.updt"
                              :controls='false'
                              :precision='0'
                              :min="0" />
            </el-form-item>
            <el-form-item label="Logging time"
                          prop="logt">
              <el-input-number v-model="objectSetupFrom.logt"
                              :controls='false'
                              :precision='0'
                              :min="0" />
            </el-form-item>
            <el-form-item label="Timestamp Display"
                          prop="logt">
              <el-radio-group v-model="objectSetupFrom.tstd">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Visible"
                          prop="disp">
              <el-radio-group v-model="objectSetupFrom.disp">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Logging"
                          prop="logs">
              <el-radio-group v-model="objectSetupFrom.logs">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click='submitObjectSetupFrom'>submit</el-button>
        </span>
      </template>
      <template v-if="objectIndexSetupList.length &&!isDetail">
        <div class="row">
          <el-table :data='objectIndexSetupList'
                    class="dd-mb">
            <el-table-column label="Index">
              <template slot-scope="scope">
                {{scope.row.obix}}
              </template>
            </el-table-column>
            <el-table-column label="Prefix">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pref" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="Suffix">
              <template slot-scope="scope">
                <el-input v-model="scope.row.suff" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer"
          class="dialog-footer">
          <el-button @click="handleCancel">cancel</el-button>
          <el-button type="primary"
                    @click="submitObjectDetail">submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ObjectTable from './objectTable'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      dialogTableVisible: false,
      isDetail: true,
      objectSetupFrom: {},
      objectSetupFromRules: {
        objn: [
          { required: true, message: 'name is required', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' }
        ],
        obsz: [
          { required: true, message: 'size is required', trigger: 'blur' }
        ],
        updt: [
          { required: true, message: 'update time is required', trigger: 'blur' }
        ],
        logt: [
          { required: true, message: 'logging time is required', trigger: 'blur' }
        ],
        disp: [
          { required: true, message: 'display is required', trigger: 'blur' }
        ],
        logs: [
          { required: true, message: 'logging is required', trigger: 'blur' }
        ]
      },
      objectIndexSetupList: [],
      multipleSelection: []
    }
  },
  watch: {
    'objectSetupFrom.obsz' (val) {
      let res = []
      for (let i = 0; i < val; i++) {
        res.push({
          obix: i,
          pref: '',
          suff: ''
        })
      }
      this.objectIndexSetupList = res
    }
  },
  methods: {
    submitObjectSetupFrom () {
      this.$refs.objectSetupFrom.validate((valid) => {
        if (valid) {
          this.isDetail = false
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitObjectDetail () {
      let list = this.objectIndexSetupList.map(i => i.pref + i.suff)
      let length = list.length
      let newLength = [...new Set(list)].length
      if (length && length === newLength) {
        this.objectSetupFrom.preAndSuff = this.objectIndexSetupList
        this.addObjectData(this.objectSetupFrom)
        this.dialogTableVisible = false
      } else {
        this.$message.error("Don't repeat")
      }
    },
    handleCancel () {
      this.isDetail = true
      this.objectIndexSetupList = this.objectIndexSetupList.map(i => {
        i.pref = ''
        i.suff = ''
        return i
      })
    },
    handleDelete () {
      this.$confirm('Are you sure delete these object?', 'delete object', {
        type: 'warning'
      }).then(() => {
        this.deleteObjectData(this.multipleSelection.map(i => i.objn))
      }).catch(() => {
      })
    },
    close () {
      this.isDetail = true
      this.objectSetupFrom = {
        oatt: []
      }
      this.objectIndexSetupList = []
      this.$refs.objectSetupFrom && this.$refs.objectSetupFrom.clearValidate()
    },
    ...mapMutations(['addObjectData', 'deleteObjectData'])
  },
  components: {
    ObjectTable
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public.scss";
.object-setup {
  .dd-mb {
    margin-top: 8px;
  }
}
</style>
