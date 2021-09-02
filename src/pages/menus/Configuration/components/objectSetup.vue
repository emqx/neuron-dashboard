<template>
  <div class="object-setup">
    <div class="dd-mb dd-fr">
      <el-button slot="trigger" icon="el-icon-download" :loading="exportLoading" @click="handleExport">
        {{ $t('common.export') }}
      </el-button>
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
        <el-button slot="trigger" icon="el-icon-upload2" :loading="uploadLoading">
          {{ $t('common.import') }}
        </el-button>
      </el-upload>
      <el-button type="warning" @click="handleClearData">{{ $t('common.clear') }}</el-button>
      <el-button type="primary" @click="dialogTableVisible = true">{{ $t('common.create') }}</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" @click="onDelete(null)">{{
        $t('common.delete')
      }}</el-button>
    </div>
    <div class="row">
      <ObjectTable :showBtn="true" v-model="multipleSelection" @edit="onEdit" @delete="onDelete" />
    </div>
    <el-dialog
      :title="isDetail ? $t('configuration.objectSetup') : $t('configuration.objectIndexsetup')"
      :visible.sync="dialogTableVisible"
      @closed="onClose"
    >
      <template v-if="isDetail">
        <div class="row">
          <el-form
            ref="objectSetupFrom"
            :rules="objectSetupFromRules"
            :model="objectSetupFrom"
            class="dd-mb"
            label-position="left"
            label-width="160px"
          >
            <el-form-item label="Object name" prop="objn">
              <el-input v-model="objectSetupFrom.objn" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item label="Object size" prop="obsz">
              <el-input-number v-model="objectSetupFrom.obsz" :controls="false" :precision="0" />
            </el-form-item>
            <el-form-item label="Update time (100ms)" prop="updt">
              <el-input-number v-model="objectSetupFrom.updt" :controls="false" :precision="0" :min="0" />
            </el-form-item>
            <el-form-item label="Logging time (1s)" prop="logt">
              <el-input-number v-model="objectSetupFrom.logt" :controls="false" :precision="0" :min="0" />
            </el-form-item>
            <el-form-item label="Timestamp display" prop="tstd">
              <el-radio-group v-model="objectSetupFrom.tstd">
                <el-radio :label="1">Yes</el-radio>
                <el-radio :label="0">No</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitObjectSetupFrom">{{ $t('common.submit') }}</el-button>
        </span>
      </template>
      <template v-if="objectIndexSetupList.length && !isDetail">
        <div class="row">
          <el-table :data="objectIndexSetupList" class="dd-mb">
            <el-table-column :label="$t('status.index')">
              <template slot-scope="scope">
                {{ scope.row.obix }}
              </template>
            </el-table-column>
            <el-table-column :label="$t('configuration.prefix')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.pref" size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('configuration.suffix')">
              <template slot-scope="scope">
                <el-input v-model="scope.row.suff" size="mini"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="submitObjectDetail">{{ $t('common.submit') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ObjectTable from './objectTable'
import { mapMutations } from 'vuex'
import _ from 'lodash'
import { getExcelData, exportExcelData } from '@/utils/excelData'
export default {
  data() {
    return {
      dialogTableVisible: false,
      isDetail: true,
      isEdit: false,
      uploadLoading: false,
      exportLoading: false,
      fileList: [],
      objectSetupFrom: {},
      objectSetupFromRules: {
        objn: [
          { required: true, message: 'name is required', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' },
        ],
        obsz: [{ required: true, message: 'size is required', trigger: 'blur' }],
        updt: [{ required: true, message: 'update time is required', trigger: 'blur' }],
        logt: [{ required: true, message: 'logging time is required', trigger: 'blur' }],
      },
      objectIndexSetupList: [],
      multipleSelection: [],
    }
  },
  watch: {
    'objectSetupFrom.obsz'(val, oldVal) {
      const initData = () => {
        const res = []
        for (let i = 0; i < val; i++) {
          res.push({
            obix: i,
            pref: '',
            suff: '',
          })
        }
        return res
      }
      if (this.isEdit && oldVal === undefined) {
        this.objectIndexSetupList = this.objectSetupFrom.preAndSuff || initData()
      } else {
        this.objectIndexSetupList = initData()
      }
    },
  },
  methods: {
    submitObjectSetupFrom() {
      this.$refs.objectSetupFrom.validate((valid) => {
        if (valid) {
          this.isDetail = false
        } else {
          return false
        }
      })
    },
    submitObjectDetail() {
      let list = this.objectIndexSetupList.map((i) => i.pref + i.suff)
      let { length } = list
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
    handleCancel() {
      this.isDetail = true
      if (!this.isEdit) {
        this.objectIndexSetupList = this.objectIndexSetupList.map((i) => {
          i.pref = ''
          i.suff = ''
          return i
        })
      }
    },
    genObjListData(sheets) {
      const objList = _.uniqBy(
        sheets.map((sheet) => ({
          objn: sheet.objn,
          logt: sheet.logt,
          tstd: sheet.tstd,
          updt: sheet.updt,
          obsz: sheet.obsz,
        })),
        (sheet) => sheet.objn,
      )
      objList.forEach((obj) => {
        const currentObjs = sheets.filter((sheet) => sheet.objn === obj.objn)
        const attributes = _.uniqBy(
          currentObjs.map((currentObj) => ({
            attn: currentObj.attn,
            attt: currentObj.attt,
            attr: currentObj.attr,
            deci: currentObj.deci,
            rtim: currentObj.rtim,
            adis: currentObj.adis,
            achg: currentObj.achg,
          })),
          (currentObj) => currentObj.attn,
        )
        attributes.forEach((attr) => {
          const aadds = currentObjs
            .map((currentObj) => {
              if (currentObj.attn === attr.attn) {
                let { suff, pref, addr } = currentObj
                suff = suff ? suff.toString() : ''
                pref = pref ? pref.toString() : ''
                return {
                  suff,
                  pref,
                  addr,
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
        obj.oatt = attributes
        obj.preAndSuff = obj.oatt[0].aadd.map((i) => ({
          pref: i.pref,
          obix: i.obix,
          suff: i.suff,
        }))
      })
      return objList
    },
    genExcelWebwork(objList) {
      const cols = [
        'pref',
        'objn',
        'suff',
        'updt',
        'logt',
        'tstd',
        'obsz',
        'attn',
        'attt',
        'deci',
        'achg',
        'adis',
        'attr',
        'rtim',
        'addr',
      ]
      const webwork = [cols]
      objList.forEach((obj) => {
        const { objn, updt, logt, tstd, obsz } = obj
        const content = []
        obj.oatt.forEach((attrs) => {
          const { attn, attt, deci, achg, adis, attr, rtim, aadd } = attrs
          aadd.forEach((item) => {
            const { pref, suff, addr } = item
            content.push([pref, objn, suff, updt, logt, tstd, obsz, attn, attt, deci, achg, adis, attr, rtim, addr])
          })
        })
        webwork.push(...content)
      })
      return webwork
    },
    handleUploadChange(file) {
      this.uploadLoading = true
      getExcelData(file)
        .then((res) => {
          const { sheet: sheets } = res[0]
          const objList = this.genObjListData(sheets)
          this.setObjectData(objList)
          this.$refs.upload.clearFiles()
          this.uploadLoading = false
        })
        .catch((error) => {
          this.$message.error(error.toString())
          this.uploadLoading = false
        })
    },
    handleUploadError(error) {
      this.$message.error(error.toString())
    },
    handleExport() {
      const objList = this.$store.state.SetUpData.objectData
      if (objList.length === 0) {
        this.$message.warning(this.$t('common.emptyData'))
        return
      }
      this.exportLoading = true
      const data = this.genExcelWebwork(objList)
      exportExcelData(data)
        .then((res) => {
          if (res) {
            this.exportLoading = false
          }
        })
        .catch((error) => {
          this.$message.error(error.toString())
          this.uploadLoading = false
        })
    },
    onDelete(data) {
      const deleteData = []
      if (data) {
        deleteData.push(data)
      } else {
        deleteData.push(...this.multipleSelection)
      }
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.delete'), {
        type: 'warning',
      })
        .then(() => {
          this.deleteObjectData(deleteData.map((i) => i.objn))
        })
        .catch(() => {})
    },
    onClose() {
      this.isEdit = false
      this.isDetail = true
      this.objectSetupFrom = {
        oatt: [],
      }
      this.objectIndexSetupList = []
      this.$refs.objectSetupFrom && this.$refs.objectSetupFrom.clearValidate()
    },
    onEdit(data) {
      this.isEdit = true
      this.objectSetupFrom = data
      this.objectIndexSetupList = this.objectSetupFrom.preAndSuff || []
      this.dialogTableVisible = true
    },
    handleClearData() {
      this.$confirm(this.$t('configuration.clearConfirm'), this.$t('common.warning'), {
        type: 'warning',
      })
        .then(() => {
          this.clearAllData()
        })
        .catch(() => {})
    },
    ...mapMutations(['clearAllData', 'setObjectData', 'addObjectData', 'deleteObjectData', 'editObjectData']),
  },
  components: {
    ObjectTable,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public.scss';
.object-setup {
  .dd-mb {
    margin-top: 8px;
  }
  .upload-excel {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>
