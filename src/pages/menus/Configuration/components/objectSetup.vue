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
            <el-form-item :label="$t('configuration.objectName')" prop="objn">
              <el-input v-model="objectSetupFrom.objn" :disabled="isEdit"></el-input>
            </el-form-item>
            <el-form-item :label="$t('configuration.objectSize')" prop="obsz">
              <el-input-number v-model="objectSetupFrom.obsz" :controls="false" :precision="0" />
            </el-form-item>
            <el-form-item :label="`${$t('configuration.updateTime')}(100ms)`" prop="updt">
              <el-input-number v-model="objectSetupFrom.updt" :controls="false" :precision="0" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('common.description')" prop="description">
              <el-input v-model="objectSetupFrom.description"></el-input>
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
    const _this = this
    return {
      dialogTableVisible: false,
      isDetail: true,
      isEdit: false,
      uploadLoading: false,
      exportLoading: false,
      fileList: [],
      objectSetupFrom: {
        oatt: [],
      },
      objectSetupFromRules: {
        objn: [
          { required: true, message: 'name is required', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (_this.checkDuplicateObjName(value)) {
                callback(_this.$t('configuration.sameNameObjWarning'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        obsz: [{ required: true, message: 'size is required', trigger: 'blur' }],
        updt: [{ required: true, message: 'update time is required', trigger: 'blur' }],
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
      if (!('logt' in this.objectSetupFrom)) {
        this.objectSetupFrom.logt = 0
      }
      if (!('tstd' in this.objectSetupFrom)) {
        this.objectSetupFrom.tstd = 1
      }

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
    checkDuplicateObjName(name) {
      const objList = this.$store.state.SetUpData.objectData
      return !this.isEdit && objList.some(({ objn }) => objn === name)
    },
    checkObjList(objList) {
      if (objList.some(({ objn }) => this.checkDuplicateObjName(objn))) {
        return Promise.reject(this.$t('configuration.sameNameObjWarning'))
      }
      return Promise.resolve(objList)
    },
    genObjListData(sheets) {
      const objList = _.uniqBy(
        sheets.map((sheet) => ({
          objn: sheet.objn,
          logt: 0,
          tstd: 1,
          updt: sheet.updt,
          obsz: sheet.obsz,
          description: sheet.objdesc,
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
            // There are no two columns of data in the new table,
            // but not passing it to API will result in an error
            adis: currentObj.adis || 1,
            achg: currentObj.achg || 1,
            description: currentObj.attrdesc,
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
        'objdesc',
        'suff',
        'updt',
        'obsz',
        'attn',
        'attrdesc',
        'attt',
        'deci',
        'attr',
        'rtim',
        'addr',
      ]
      const webwork = [cols]
      objList.forEach((obj) => {
        const { objn, description: objdesc, updt, obsz } = obj
        const content = []
        obj.oatt.forEach((attrs) => {
          const { attn, description: attrdesc, attt, deci, attr, rtim, aadd } = attrs
          aadd.forEach((item) => {
            const { pref, suff, addr } = item
            content.push([pref, objn, objdesc, suff, updt, obsz, attn, attrdesc, attt, deci, attr, rtim, addr])
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
          return this.checkObjList(objList)
        })
        .then((objList) => {
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
