<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex dd-mb">
      <div class="dd-title">Script Programming</div>
      <div class='row'>
        <ScriptTypeSelect v-model="type"
                          @delete='init'
                          @submit="submit" />
        &nbsp;&nbsp;
        <el-button class='dd-fr'
                   type="primary"
                   @click='handleSubmit'>Submit</el-button>
      </div>
    </div>
    <el-table class="script-table"
              :data='scriptData'>
      <el-table-column label="Comment"
                       min-width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.stmt"
                     @change="handleChange($event,scope.$index)"
                     clearable
                     style='width:100%;'
                     size="mini">
            <el-option v-for="item in scriptList"
                       :key="item.val"
                       :label="item.val"
                       :value="item.val">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Statement"
                       min-width="300">
        <template slot-scope="scope">
          <el-input placeholder=""
                    type="textarea"
                    size="mini"
                    :rows="1"
                    v-model="scope.row.expr">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label=" "
                       min-width="60">
        <template slot-scope="scope">
          <div class='btn'>
            <i class="el-icon-circle-plus plus"
               @click='add(scope.$index)'></i>&nbsp;
            <i class="el-icon-remove remove"
               @click='remove(scope.$index)'></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible"
               title='POS'
               width="300px"
               @closed='handleClosed'>
      <el-input-number v-model="pos"
                       :min="1"
                       :max="999"
                       :controls="false"
                       size="mini"></el-input-number>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">cancel</el-button>
        <el-button type="primary"
                   @click="handlePosSubmit">submit</el-button>
      </span>
    </el-dialog>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { ScriptList } from '@/config/index'
import ScriptTypeSelect from './components/scriptType'
import _ from 'lodash'

export default {
  mixins: [indexMixin],
  data () {
    return {
      scriptData: [],
      oldScriptData: [],
      scriptList: ScriptList,
      type: {
        name: '',
        subr: ''
      },
      dialogVisible: false,
      pos: 0,
      currentIndex: 0
    }
  },
  methods: {
    init () {
      this.scriptData = []
      let i = 6
      while (i--) {
        this.scriptData.push({
          stmt: '',
          expr: ''
        })
      }
      this.oldScriptData = _.cloneDeep(this.scriptData)
    },
    readSubroutine (subr) {
      this.$ws().set({ success: this.getData }).send({ func: 33, subr: +subr })
    },
    getData (data) {
      if (data.func === 33) {
        this.$ws().remove(this.getData)
        if (data.rows) {
          if (data.rows.length === 0) {
            this.init()
          } else {
            this.scriptData = data.rows
            this.oldScriptData = _.cloneDeep(this.scriptData)
          }
        } else {
          this.init()
        }
      }
    },
    handlePosSubmit () {
      this.scriptData[this.currentIndex].stmt = `POS${this.pos}`
      this.dialogVisible = false
    },
    handleChange (e, index) {
      if (e === 'POS') {
        this.currentIndex = index
        this.dialogVisible = true
      }
    },
    handleSubmit () {
      if (!this.type.subr) {
        this.$openMessage.error('select a routine')
        return
      }
      this.$confirm('Are you sure submit these script programming', 'Submit', {
        type: 'warning'
      }).then(() => {
        const rows = this.scriptData
        const { name, subr } = this.type
        this.submit(name, subr, rows)
      }).catch(() => {
      })
    },
    submit (name, subr, rows) {
      if (!rows) {
        rows = []
      }
      this.$ws().set({ success: this.setData }).send({
        func: 34,
        csub: 0,
        name,
        subr: +subr,
        nrow: rows.length,
        rows
      })
    },
    setData (data) {
      if (data.func === 34 && data.errc === 0) {
        this.$ws().remove(this.setData)
        this.oldScriptData = []
        this.oldScriptData = _.cloneDeep(this.scriptData)
      }
    },
    handleClosed () {
      this.currentIndex = 0
    },
    add (index) {
      this.scriptData.splice(index + 1, 0, { stmt: '', expr: '' })
    },
    remove (index) {
      this.scriptData.splice(index, 1)
    },
    promptUnsubmitted (callback) {
      this.$confirm('You have unsubmitted changes, submit and proceed? ', 'Confirm', {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Discard Changes'
      }).then(() => {
        const rows = this.scriptData
        const { name, subr } = this.type
        this.submit(name, subr, rows)
        callback()
      }).catch(() => {
        callback()
      })
    }
  },
  watch: {
    'type.subr' (val) {
      if (val) {
        this.readSubroutine(val)
      }
    }
  },
  components: {
    ScriptTypeSelect
  },
  beforeRouteLeave (to, from, next) {
    if (_.isEqual(this.oldScriptData, this.scriptData)) {
      next()
    } else {
      this.promptUnsubmitted(next)
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/style/public";
.script-table {
  /deep/td {
    padding: 10px 0;
  }
}
.btn {
  font-size: 24px;
  .plus {
    color: $color-primary;
    cursor: pointer;
  }
  .remove {
    color: $color-danger;
    cursor: pointer;
  }
}

/deep/.el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
  }
}
</style>
