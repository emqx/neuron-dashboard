<template>
  <div class="object-setup">
    <div class="dd-mb dd-fr">
      <el-upload
        ref="upload"
        class="upload-excel"
        action=""
        accept=".xlsx"
        :show-file-list="false"
        :limit="1"
        :file-list="fileList"
        :auto-upload="false"
        :on-change="handleUploadChange"
        :on-error="handleUploadError"
      >
        <el-button
          slot="trigger"
          icon="el-icon-upload2"
          :loading="uploadLoading"
        >
          Import
        </el-button>
      </el-upload>
      <el-button type="primary"
                 @click='dialogTableVisible=true'>Create</el-button>
      <el-button type="danger"
                 :disabled="!multipleSelection.length"
                 @click='onDelete(null)'>Delete</el-button>
    </div>
    <div class="row">
      <ObjectTable :showBtn='true'
                   v-model="multipleSelection"
                   @edit="onEdit"
                   @delete="onDelete" />
    </div>
    <el-dialog @closed='onClose'
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
              <el-input v-model="objectSetupFrom.objn" :disabled="isEdit"></el-input>
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
            <el-form-item label="Timestamp display"
                          prop="logt">
              <el-radio-group v-model="objectSetupFrom.tstd">
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
      <template v-if="objectIndexSetupList.length && !isDetail">
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
import _ from 'lodash'
import getExcelData from '@/utils/excelData'

export default {
  data () {
    return {
      dialogTableVisible: false,
      isDetail: true,
      isEdit: false,
      uploadLoading: false,
      fileList: [],
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
        ]
      },
      objectIndexSetupList: [],
      multipleSelection: []
    }
  },
  watch: {
    'objectSetupFrom.obsz' (val, oldVal) {
      const initData = () => {
        const res = []
        for (let i = 0; i < val; i++) {
          res.push({
            obix: i,
            pref: '',
            suff: ''
          })
        }
        return res
      }
      if (this.isEdit && oldVal === undefined) {
        this.objectIndexSetupList = this.objectSetupFrom.preAndSuff || initData()
      } else {
        this.objectIndexSetupList = initData()
      }
    }
  },
  methods: {
    submitObjectSetupFrom () {
      this.$refs.objectSetupFrom.validate((valid) => {
        if (valid) {
          this.isDetail = false
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
        if (this.isEdit) {
          this.editObjectData(this.objectSetupFrom)
        } else {
          this.addObjectData(this.objectSetupFrom)
        }
        this.dialogTableVisible = false
      } else {
        this.$openMessage.error("Don't repeat")
      }
    },
    handleCancel () {
      this.isDetail = true
      if (!this.isEdit) {
        this.objectIndexSetupList = this.objectIndexSetupList.map(i => {
          i.pref = ''
          i.suff = ''
          return i
        })
      }
    },
    genObjListData (sheets) {
      const objList = _.uniqBy(sheets.map((sheet) => ({
        objn: sheet.objn,
        logt: sheet.logt,
        tstd: sheet.tstd,
        updt: sheet.updt,
        obsz: sheet.obsz
      })), sheet => sheet.objn)
      objList.forEach((obj) => {
        const currentObjs = sheets.filter((sheet) => sheet.objn === obj.objn)
        const attrbutes = _.uniqBy(currentObjs.map((currentObj) => ({
          attn: currentObj.attn,
          attt: currentObj.attt,
          attr: currentObj.attr,
          deci: currentObj.deci,
          rtim: currentObj.rtim,
          adis: currentObj.adis,
          achg: currentObj.achg
        })), currentObj => currentObj.attn)
        attrbutes.forEach((attr) => {
          const aadds = currentObjs
            .map((currentObj) => {
              if (currentObj.attn === attr.attn) {
                return {
                  suff: currentObj.suff || '',
                  pref: currentObj.pref || '',
                  addr: currentObj.addr
                }
              }
            })
            .filter((currentAadd) => currentAadd)
            .map((currentAadd, index) => {
              currentAadd.obix = index
              return currentAadd
            })
          attr.aadd = aadds
        })
        obj.oatt = attrbutes
        obj.preAndSuff = obj.oatt[0].aadd.map(i => ({
          pref: i.pref,
          obix: i.obix,
          suff: i.suff
        }))
      })
      return objList
    },
    handleUploadChange (file) {
      this.uploadLoading = true
      getExcelData(file).then((res) => {
        const { sheet: sheets } = res[0]
        const objList = this.genObjListData(sheets)
        this.setObjectData(objList)
        this.$refs.upload.clearFiles()
        this.uploadLoading = false
      }).catch((error) => {
        this.$message.error(error.toString())
        this.uploadLoading = false
      })
    },
    handleUploadError (error) {
      this.$message.error(error.toString())
    },
    onDelete (data) {
      const deleteData = []
      let confirmMsg = 'Are you sure delete these object?'
      if (data) {
        deleteData.push(data)
        confirmMsg = 'Are you sure delete this object?'
      } else {
        deleteData.push(...this.multipleSelection)
      }
      this.$confirm(confirmMsg, 'delete object', {
        type: 'warning'
      }).then(() => {
        this.deleteObjectData(deleteData.map(i => i.objn))
      }).catch(() => {
      })
    },
    onClose () {
      this.isEdit = false
      this.isDetail = true
      this.objectSetupFrom = {
        oatt: []
      }
      this.objectIndexSetupList = []
      this.$refs.objectSetupFrom && this.$refs.objectSetupFrom.clearValidate()
    },
    onEdit (data) {
      this.isEdit = true
      this.objectSetupFrom = data
      this.objectIndexSetupList = this.objectSetupFrom.preAndSuff || []
      this.dialogTableVisible = true
    },
    ...mapMutations(['setObjectData', 'addObjectData', 'deleteObjectData', 'editObjectData'])
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
  .upload-excel {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
