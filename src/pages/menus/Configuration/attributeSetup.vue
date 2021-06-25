<template>
  <Container type="card-full" :scorll="false">
    <div class="row flex">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Configuration/objectSetup' }">
          <span class="dd-title">{{ $t('configuration.objectSetup') }}</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <span class="dd-title">{{ $t('configuration.attributeSetup') }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button @click="dialogTableVisible = true" type="primary">{{ $t('common.create') }}</el-button>
        <el-button @click="onDelete(null)" :disabled="!multipleSelection.length" type="danger">{{
          $t('common.delete')
        }}</el-button>
        <el-button @click="$router.go(-1)">{{ $t('common.save') }}</el-button>
      </div>
    </div>
    <div>
      <AttributeTable
        ref="attributeTable"
        v-model="multipleSelection"
        :attributeList="attributeList"
        :showBtn="true"
        :objectName="objn"
        @add="addAddress"
        @edit="editAddress"
        @dummy="onDummy"
        @delete="onDelete"
      />
    </div>

    <el-dialog :title="$t('configuration.dataAttributeSetup')" :visible.sync="dialogTableVisible" @closed="close">
      <el-form
        ref="AttributeSetupForm"
        :model="AttributeSetupForm"
        :rules="AttributeSetupFormRules"
        label-width="120px"
      >
        <el-form-item :label="$t('common.name')" prop="attn">
          <el-input v-model="AttributeSetupForm.attn" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('common.type')" prop="attn">
          <el-select v-model="AttributeSetupForm.attt">
            <el-option v-for="item in AttributeTypeList" :key="item.val" :label="item.val" :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Decimal" v-if="showDecimal" prop="deci">
          <el-input-number v-model="AttributeSetupForm.deci" :controls="false" :precision="0" :min="0" />
        </el-form-item>
        <el-form-item label="Direction" prop="attr">
          <el-radio-group v-model="AttributeSetupForm.attr">
            <el-radio v-for="item in driverAttrList" :key="item" :label="item">
              {{ item }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Read time" prop="rtim" v-if="showReadTime">
          <el-input-number v-model="AttributeSetupForm.rtim" :controls="false" :precision="0" :min="0" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitAttributeSetupFrom">{{ $t('common.submit') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('configuration.dataAddrSetup')" @closed="addressClosed" :visible.sync="addressVisible">
      <el-table :data="preAndSuff" class="dd-mb">
        <el-table-column :label="$t('status.index')" :width="minWidth">
          <template slot-scope="scope">
            {{ scope.row.obix + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="pref" :width="minWidth" :label="$t('configuration.prefix')" />
        <el-table-column :label="$t('configuration.suffix')" :width="minWidth" prop="suff" />
        <el-table-column :label="$t('configuration.address')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.addr" size="mini"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressSubmit" type="primary">{{ $t('common.submit') }}</el-button>
      </span>
    </el-dialog>
  </Container>
</template>

<script>
import { clone } from '@/utils/index'
import { AttributeTypeList } from '@/config/index'
import AttributeTable from './components/attributeTable'
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      minWidth: 80,
      objn: '',
      preAndSuff: [],
      dialogTableVisible: false,
      isEdit: false,
      attributeList: [],
      AttributeSetupForm: {
        adis: 1,
        achg: 1,
      },
      AttributeSetupFormRules: {
        attn: [
          { required: true, message: 'Please input Name', trigger: 'blur' },
          { max: 30, message: 'max 30', trigger: 'blur' },
        ],
        attt: [{ required: true, message: 'Please select Type', trigger: 'blur' }],
        deci: [{ required: true, message: 'Please input Decimal', trigger: 'blur' }],
        attr: [{ required: true, message: 'Please select Direction', trigger: 'blur' }],
        rtim: [{ required: true, message: 'pleact input Time', trigger: 'blur' }],
      },
      AttributeTypeList: AttributeTypeList,
      addressVisible: false,
      activeAttributeRow: {},
      multipleSelection: [],
    }
  },
  methods: {
    close() {
      this.isEdit = false
      this.AttributeSetupForm = {
        adis: 1,
        achg: 1,
      }
      this.preAndSuff = []
    },
    addressClosed() {
      this.preAndSuff.addr = ''
    },
    getFullName(pref, suff) {
      // eslint-disable-next-line no-param-reassign
      pref = pref ? pref + '_' : ''
      // eslint-disable-next-line no-param-reassign
      suff = suff ? '_' + suff : ''
      return pref + this.objn + suff
    },
    validataAddr(attribute) {
      return (
        this.attributeList.length &&
        this.attributeList.every((attr) => !attr.aadd.some((ad) => ad.addr === '' || ad.addr === undefined))
      )
    },
    submitAttributeSetupFrom() {
      this.$refs.AttributeSetupForm.validate((valid) => {
        if (valid) {
          const { attr, rtim } = this.AttributeSetupForm
          if ((attr !== 'R' || attr !== 'RW') && rtim === undefined) {
            this.AttributeSetupForm.rtim = 0
          }
          if (this.isEdit) {
            const findIndex = this.attributeList.findIndex((attr) => attr.attn === this.AttributeSetupForm.attn)
            if (findIndex !== -1) {
              const attrData = [...this.attributeList]
              attrData[findIndex] = {
                ...this.AttributeSetupForm,
                aadd: clone(this.preAndSuff),
              }
              this.attributeList = attrData
            }
          } else {
            this.attributeList.push({
              ...this.AttributeSetupForm,
              aadd: clone(this.preAndSuff),
            })
          }
          this.dialogTableVisible = false
          this.AttributeSetupForm = {
            adis: 1,
            achg: 1,
          }
          this.confirmSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    confirmSubmit() {
      if (!this.validataAddr()) {
        this.$openMessage.warning(this.$t('configuration.addressRequired'))
      }
      setTimeout(() => {
        this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
        if (this.$refs.attributeTable) {
          this.$refs.attributeTable.setData()
        }
      }, 1000)
    },
    addAddress(data) {
      this.activeAttributeRow = data
      if (data.aadd.length) {
        this.preAndSuff = clone(data.aadd)
      }
      this.addressVisible = true
    },
    editAddress(data) {
      this.isEdit = true
      this.AttributeSetupForm = data
      this.dialogTableVisible = true
      if (data.aadd.length) {
        this.preAndSuff = clone(data.aadd)
      }
    },
    addressSubmit() {
      this.addressVisible = false
      this.$set(this.activeAttributeRow, 'aadd', clone(this.preAndSuff))
      this.validateAddr(this.activeAttributeRow)
      this.resetPreAndSuff()
      this.confirmSubmit()
    },
    validateAddr(row) {
      let hasDummyAddr = true
      row.aadd.forEach(($) => {
        if ($.addr !== '-') {
          hasDummyAddr = false
        }
      })
      if (!hasDummyAddr && row.attr === '-') {
        this.$openMessage.warning(this.$t('configuration.rwRequired'))
      }
    },
    resetPreAndSuff() {
      this.preAndSuff = this.preAndSuff.map((i) => {
        i.addr = ''
        return i
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
          const deleteList = deleteData.map((i) => i.attn)
          this.attributeList = this.attributeList.filter((i) => !deleteList.includes(i.attn))
          this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
          setTimeout(() => {
            if (this.$refs.attributeTable) {
              this.$refs.attributeTable.setData()
            }
          }, 500)
        })
        .catch(() => {})
    },
    onDummy(data) {
      data.attr = '-'
      data.rtim = 0
      data.aadd.forEach((item) => {
        item.addr = '-'
        return item
      })
    },
    init() {
      let name = this.$route.params.data
      if (name) {
        this.objn = name
        this.objectData.some((i) => {
          if (i.objn === name) {
            if (i.preAndSuff) {
              this.preAndSuff = [...i.preAndSuff]
            } else {
              this.preAndSuff = i.oatt[0].aadd.map((i) => ({
                pref: i.pref,
                obix: i.obix,
                suff: i.suff,
                addr: '',
              }))
            }
            if (i.oatt) {
              this.attributeList = i.oatt
            }
            return false
          }
        })
      }
    },
    ...mapMutations(['setObjectAttribute']),
  },
  computed: {
    showDecimal() {
      return this.AttributeSetupForm.attt && this.AttributeSetupForm.attt.indexOf('word') !== -1
    },
    showReadTime() {
      return (
        this.AttributeSetupForm.attr && (this.AttributeSetupForm.attr === 'R' || this.AttributeSetupForm.attr === 'RW')
      )
    },
    ...mapState({
      objectData: (state) => state.SetUpData.objectData,
    }),
    driverAttrList() {
      const { chdv } = this.$store.state.SetUpData.driverData
      const { southDriverList } = this.$store.state.Device
      const currentDriver = southDriverList.find((item) => item.val === chdv)
      return currentDriver.attr || []
    },
  },
  watch: {
    'AttributeSetupForm.attt'(val) {
      this.AttributeSetupForm.deci = 0
    },
  },
  created() {
    this.init()
  },
  beforeRouteLeave(to, from, next) {
    this.confirmSubmit()
    next()
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.data) {
      next()
    } else {
      next({ name: 'Configuration-objectSetup' })
    }
  },
  components: {
    AttributeTable,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public.scss';
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
.addrs {
  border-bottom: 1px solid $color-border-main;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
.el-select {
  width: 100%;
}
</style>
