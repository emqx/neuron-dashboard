<template>
  <Container  type="card-full"
              class="event-setup"
              :scorll='false'>
    <div class='flex dd-mb'>
      <div class="dd-title">Event Setup</div>
      <div>
        <el-button @click='handleSubmit'>submit</el-button>
        <el-button @click='addEvent'
                   type="primary">Created</el-button>
        <el-button @click='handleDelete'
                   type="danger">Delete</el-button>
      </div>
    </div>
    <EventTable v-model="multipleSelection"
                :showBtn='true'
                :eventList='msgd' />
    <el-dialog title="Event Setup"
               @closed='close'
               :visible.sync="dialogTableVisible">
      <el-form :model="eventForm"
               ref="eventForm"
               :rules="eventFormRules"
               label-width="120px">
        <el-form-item label='Object1'
                      prop="sobj">
          <el-select v-model="eventForm.sobj">
            <el-option v-for="item in objectList"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Attribute1'
                      prop="satt">
          <el-select v-model="eventForm.satt">
            <el-option v-for="item in filterAttrList(eventForm.sobj)"
                       :key="item+'satt'"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label='Type'
                      prop="msgt">
          <el-select v-model="eventForm.msgt">
            <el-option v-for="item in Operator"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Object2'
                      prop="cobj">
          <el-select v-model="eventForm.cobj">
            <el-option v-for="item in objectList"
                       :key="item.name"
                       :label="item.name"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Attribute2'
                      prop="catt">
          <el-select v-model="eventForm.catt">
            <el-option v-for="item in filterAttrList(eventForm.cobj)"
                       :key="item+'catt'"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Category'
                      prop="catt">
          <el-select v-model="eventForm.acat">
            <el-option v-for="item in EventCategory"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='Subroutine'
                      prop="subr">
          <el-input-number v-model="eventForm.subr"
                           :controls='false'
                           :precision='0' />
        </el-form-item>
      </el-form>
      <span slot="footer"
          class="dialog-footer">
        <el-button @click='submitNewEvent'>submit</el-button>
      </span>
    </el-dialog>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { Operator, EventCategory } from '@/config/index'
import { clone } from '@/utils/index'
import { mapState, mapMutations } from 'vuex'
import EventTable from './components/eventTable'
export default {
  mixins: [indexMixin],
  data () {
    return {
      dialogTableVisible: false,
      eventForm: {},
      eventFormRules: {},
      objectList: [],
      Operator,
      EventCategory,
      multipleSelection: []
    }
  },
  created () {
    if (!this.resultData.length) {
      this.$message.error('please setup object!')
      this.$router.push({ name: 'Configuration-objectSetup' })
    }
    this.init()
  },
  computed: {
    ...mapState({
      resultData: state => state.SetUpData.objectData,
      msgd: state => state.SetUpData.eventData
    })
  },
  methods: {
    init () {
      this.buildObjectList()
    },
    handleSubmit () {
      this.$router.push({ name: 'Configuration-overview' })
    },
    addEvent () {
      this.dialogTableVisible = true
    },
    submitNewEvent () {
      this.$refs.eventForm.validate((valid) => {
        if (valid) {
          this.addEventData(clone(this.eventForm))
          this.dialogTableVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.eventForm = {}
      this.$refs.eventForm && this.$refs.eventForm.clearValidate()
    },
    buildObjectList () {
      let list = []

      for (let j = 0, jlen = this.resultData ? this.resultData.length : 0; j < jlen; j++) {
        const data = this.resultData[j]
        const { objn, preAndSuff, oatt } = data
        const attr = oatt.map(i => i.attn)
        for (let i = 0, psLen = preAndSuff.length; i < psLen; i++) {
          let { pref, suff } = preAndSuff[i]
          pref = pref ? pref + '_' : ''
          suff = suff ? '_' + suff : ''
          list.push({
            name: pref + objn + suff,
            attr
          })
        }
      }
      this.objectList = Object.freeze(list)
    },
    filterAttrList (val) {
      if (!val) return []
      for (let i = 0, len = this.objectList.length; i < len; i++) {
        const item = this.objectList[i]
        if (item.name === val) {
          return item['attr']
        }
      }
      return []
    },
    handleDelete () {
      if (!this.multipleSelection.length) return
      this.$confirm('Are you sure delete these event?', 'delete event', {
        type: 'warning'
      }).then(() => {
        this.deleteEventData(this.multipleSelection)
      }).catch(() => {
      })
    },
    ...mapMutations(['addEventData', 'deleteEventData'])
  },
  components: {
    EventTable
  }
}
</script>

<style scoped lang="scss">
.event-setup {
  .el-select {
    width: 100%;
  }
}
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
</style>
