<template>
  <Container type="card-full" class="event-setup" :scorll="false">
    <div class="flex dd-mb">
      <div class="dd-title">{{ $t('configuration.eventSetup') }}</div>
      <div>
        <emqx-button @click="addEvent" type="primary">{{ $t('common.create') }}</emqx-button>
        <emqx-button @click="onDelete(null)" :disabled="!multipleSelection.length" type="danger">{{
          $t('common.delete')
        }}</emqx-button>
      </div>
    </div>
    <EventTable v-model="multipleSelection" :showBtn="true" :eventList="msgd" @delete="onDelete" @edit="onEdit" />
    <el-dialog :title="$t('configuration.eventSetup')" @closed="close" v-model="dialogTableVisible">
      <emqx-form :model="eventForm" ref="eventForm" :rules="eventFormRules" label-width="120px">
        <emqx-form-item label="Object1" prop="sobj">
          <emqx-select v-model="eventForm.sobj">
            <emqx-option v-for="item in objectList" :key="item.name" :label="item.name" :value="item.name">
            </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item label="Attribute1" prop="satt">
          <emqx-select v-model="eventForm.satt">
            <emqx-option
              v-for="item in filterAttrList(eventForm.sobj)"
              :key="item + 'satt'"
              :label="item"
              :value="item"
            />
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item :label="$t('common.type')" prop="msgt">
          <emqx-select v-model="eventForm.msgt">
            <emqx-option v-for="item in Operator" :key="item.val" :label="item.val" :value="item.val"> </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item label="Object2" prop="cobj">
          <emqx-select v-model="eventForm.cobj">
            <emqx-option v-for="item in objectList" :key="item.name" :label="item.name" :value="item.name">
            </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item label="Attribute2" prop="catt">
          <emqx-select v-model="eventForm.catt">
            <emqx-option
              v-for="item in filterAttrList(eventForm.cobj)"
              :key="item + 'catt'"
              :label="item"
              :value="item"
            >
            </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item :label="$t('status.category')" prop="catt">
          <emqx-select v-model="eventForm.acat">
            <emqx-option v-for="item in EventCategory" :key="item.val" :label="item.val" :value="item.val">
            </emqx-option>
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item :label="$t('configuration.subroutine')" prop="subr">
          <el-input-number v-model="eventForm.subr" :controls="false" :precision="0" />
        </emqx-form-item>
      </emqx-form>
      <template #footer>
        <span class="dialog-footer">
          <emqx-button @click="submitEvent">{{ $t('common.submit') }}</emqx-button>
        </span>
      </template>
    </el-dialog>
  </Container>
</template>

<script>
/* eslint-disable */
import { Operator, EventCategory } from '@/config/index'
import { clone } from '@/utils/index'
import { mapState, mapMutations } from 'vuex'
import EventTable from './components/eventTable'
import { ElDialog, ElInputNumber } from 'element-plus'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

export default {
  data() {
    return {
      isEdit: false,
      editIndex: null,
      dialogTableVisible: false,
      eventForm: {},
      eventFormRules: {},
      objectList: [],
      Operator,
      EventCategory,
      multipleSelection: [],
    }
  },
  created() {
    if (!this.objectData.length) {
      EmqxMessage.error('please setup object!')
      this.$router.push({ name: 'Configuration-objectSetup' })
    }
    this.init()
  },
  computed: {
    ...mapState({
      objectData: (state) => state.SetUpData.objectData,
      msgd: (state) => state.SetUpData.eventData,
    }),
  },
  methods: {
    init() {
      this.buildObjectList()
    },
    addEvent() {
      this.dialogTableVisible = true
    },
    submitEvent() {
      this.$refs.eventForm.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.editEventData({
              data: clone(this.eventForm),
              index: this.editIndex,
            })
          } else {
            this.addEventData(clone(this.eventForm))
          }
          this.dialogTableVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.isEdit = false
      this.editIndex = null
      this.eventForm = {}
      this.$refs.eventForm.$refs.form && this.$refs.eventForm.$refs.form.clearValidate()
    },
    buildObjectList() {
      const list = []

      for (let j = 0, jlen = this.objectData ? this.objectData.length : 0; j < jlen; j += 1) {
        const data = this.objectData[j]
        const { objn, preAndSuff, oatt } = data
        if (oatt) {
          const attr = oatt.map((i) => i.attn)
          if (preAndSuff) {
            for (let i = 0, psLen = preAndSuff.length; i < psLen; i += 1) {
              let { pref, suff } = preAndSuff[i]
              pref = pref ? `${pref}_` : ''
              suff = suff ? `_${suff}` : ''
              list.push({
                name: pref + objn + suff,
                attr,
              })
            }
          }
        }
      }
      this.objectList = Object.freeze(list)
    },
    filterAttrList(val) {
      if (!val) return []
      for (let i = 0, len = this.objectList.length; i < len; i += 1) {
        const item = this.objectList[i]
        if (item.name === val) {
          return item.attr
        }
      }
      return []
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
      })
        .then(() => {
          this.deleteEventData(deleteData)
        })
        .catch(() => {})
    },
    onEdit(data, index) {
      this.editIndex = index
      this.dialogTableVisible = true
      this.eventForm = data
      this.isEdit = true
    },
    ...mapMutations(['addEventData', 'deleteEventData', 'editEventData']),
  },
  components: {
    ElDialog,
    ElInputNumber,
    EventTable,
    Container,
  },
}
</script>

<style scoped lang="scss">
.event-setup {
  .el-select {
    width: 100%;
  }
}
>>> .el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
</style>
