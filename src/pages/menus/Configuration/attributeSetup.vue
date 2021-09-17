<template>
  <Container class="attribute-setup" type="card-full" :scorll="false">
    <div class="row flex">
      <emqx-breadcrumb separator-class="el-icon-arrow-right">
        <emqx-breadcrumb-item :to="{ name: 'Configuration-objectSetup' }">
          <span>{{ $t('configuration.objectSetup') }}</span>
        </emqx-breadcrumb-item>
        <emqx-breadcrumb-item>
          <span>{{ $t('configuration.attributeSetup') }}</span>
        </emqx-breadcrumb-item>
      </emqx-breadcrumb>
      <div>
        <emqx-button @click="dialogTableVisible = true" type="primary">{{ $t('common.create') }}</emqx-button>
        <emqx-button @click="onDelete(null)" :disabled="!multipleSelection.length" type="danger">{{
          $t('common.delete')
        }}</emqx-button>
        <emqx-button @click="$router.go(-1)">{{ $t('common.save') }}</emqx-button>
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

    <el-dialog
      :z-index="2000"
      :title="$t('configuration.dataAttributeSetup')"
      v-model="dialogTableVisible"
      @closed="close"
    >
      <emqx-form
        ref="AttributeSetupForm"
        :model="AttributeSetupForm"
        :rules="AttributeSetupFormRules"
        label-width="120px"
      >
        <emqx-form-item :label="$t('common.name')" prop="attn">
          <emqx-input v-model="AttributeSetupForm.attn" :disabled="isEdit"></emqx-input>
        </emqx-form-item>
        <emqx-form-item :label="$t('common.type')" prop="attn">
          <emqx-select v-model="AttributeSetupForm.attt">
            <emqx-option v-for="item in AttributeTypeList" :key="item.val" :label="item.val" :value="item.val">
            </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item label="Decimal" v-if="showDecimal" prop="deci">
          <el-input-number v-model="AttributeSetupForm.deci" :controls="false" :precision="0" :min="0" />
        </emqx-form-item>
        <emqx-form-item label="Direction" prop="attr">
          <el-radio-group v-model="AttributeSetupForm.attr">
            <el-radio label="R">R</el-radio>
            <el-radio label="W">W</el-radio>
            <el-radio label="RW">RW</el-radio>
          </el-radio-group>
        </emqx-form-item>
        <emqx-form-item label="Read time" prop="rtim" v-if="showReadTime">
          <el-input-number v-model="AttributeSetupForm.rtim" :controls="false" :precision="0" :min="0" />
        </emqx-form-item>
      </emqx-form>
      <template #footer>
        <span class="dialog-footer">
          <emqx-button @click="submitAttributeSetupFrom">{{ $t('common.submit') }}</emqx-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :z-index="2000"
      :title="$t('configuration.dataAddrSetup')"
      @closed="addressClosed"
      v-model="addressVisible"
    >
      <emqx-table :data="preAndSuff" class="dd-mb">
        <emqx-table-column :label="$t('status.index')" :width="minWidth">
          <template v-slot="scope">
            {{ scope.row.obix + 1 }}
          </template>
        </emqx-table-column>
        <emqx-table-column prop="pref" :width="minWidth" :label="$t('configuration.prefix')" />
        <emqx-table-column :label="$t('configuration.suffix')" :width="minWidth" prop="suff" />
        <emqx-table-column :label="$t('configuration.address')">
          <template v-slot="scope">
            <emqx-input v-model="scope.row.addr" size="mini"></emqx-input>
          </template>
        </emqx-table-column>
      </emqx-table>
      <template #footer>
        <span class="dialog-footer">
          <emqx-button @click="addressSubmit" type="primary">{{ $t('common.submit') }}</emqx-button>
        </span>
      </template>
    </el-dialog>
  </Container>
</template>

<script>
import { clone } from '@/utils/index'
import { AttributeTypeList } from '@/config/index'
import { mapState, mapMutations } from 'vuex'
import AttributeTable from './components/attributeTable'
import { ElDialog, ElRadio, ElInputNumber, ElRadioGroup } from 'element-plus'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'AttributeSetup',
  components: {
    ElDialog,
    ElRadio,
    ElInputNumber,
    ElRadioGroup,
    AttributeTable,
    Container,
  },
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
      AttributeTypeList,
      addressVisible: false,
      activeAttributeRow: {},
      multipleSelection: [],
    }
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
  },
  watch: {
    // eslint-disable-next-line
    'AttributeSetupForm.attt': function () {
      this.AttributeSetupForm.deci = 0
    },
  },
  created() {
    this.init()
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
      pref = pref ? `${pref}_` : ''
      // eslint-disable-next-line no-param-reassign
      suff = suff ? `_${suff}` : ''
      return pref + this.objn + suff
    },
    validataAddr() {
      return (
        this.attributeList.length &&
        this.attributeList.every((attr) => !attr.aadd.some((ad) => ad.addr === '' || ad.addr === undefined))
      )
    },
    submitAttributeSetupFrom() {
      this.$refs.AttributeSetupForm.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        const { attr, rtim } = this.AttributeSetupForm
        if ((attr !== 'R' || attr !== 'RW') && rtim === undefined) {
          this.AttributeSetupForm.rtim = 0
        }
        if (this.isEdit) {
          const findIndex = this.attributeList.findIndex((_attr) => _attr.attn === this.AttributeSetupForm.attn)
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
      })
    },
    async confirmSubmit(immediately = false) {
      if (!this.validataAddr()) {
        EmqxMessage.warning(this.$t('configuration.addressRequired'))
      }
      this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
      if (!immediately) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }
      if (this.$refs.attributeTable.$refs.form) {
        this.$refs.attributeTable.$refs.form.setData()
      }
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
      this.activeAttributeRow.aadd = clone(this.preAndSuff)
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
        EmqxMessage.warning(this.$t('configuration.rwRequired'))
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
      ElMessageBox(this.$t('common.confirmDelete'), this.$t('common.delete'), {
        type: 'warning',
      }).then(() => {
        const deleteList = deleteData.map((i) => i.attn)
        this.attributeList = this.attributeList.filter((i) => !deleteList.includes(i.attn))
        this.setObjectAttribute({ name: this.objn, attributeList: this.attributeList })
        setTimeout(() => {
          if (this.$refs.attributeTable.$refs.form) {
            this.$refs.attributeTable.$refs.form.setData()
          }
        }, 1000)
      })
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
      const name = this.$route.params.data
      if (name) {
        this.objn = name
        this.objectData.forEach((i) => {
          if (i.objn === name) {
            if (i.preAndSuff) {
              this.preAndSuff = [...i.preAndSuff]
            } else {
              this.preAndSuff = i.oatt[0].aadd.map((j) => ({
                pref: j.pref,
                obix: j.obix,
                suff: j.suff,
                addr: '',
              }))
            }
            if (i.oatt) {
              this.attributeList = i.oatt
            }
            return false
          }
          return true
        })
      }
    },
    ...mapMutations(['setObjectAttribute']),
  },
  beforeRouteLeave(to, from, next) {
    this.confirmSubmit(true)
    next()
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.data) {
      next()
    } else {
      next({ name: 'Configuration-objectSetup' })
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public.scss';
>>> .el-input-number {
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
.attribute-setup {
  .emqx-breadcrumb {
    margin-bottom: 0;
  }
}
</style>
