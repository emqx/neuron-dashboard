<template>
  <Container type="card-full" :scorll="false">
    <div class="flex dd-mb">
      <div class="dd-title">{{ $t('configuration.scriptProgramming') }}</div>
      <div class="row">
        <ScriptTypeSelect v-model="type" @delete="init" @submit="submit" />
        <emqx-button class="dd-fr" type="primary" @click="handleSubmit">{{ $t('common.submit') }}</emqx-button>
      </div>
    </div>
    <emqx-table class="script-table" :data="scriptData">
      <emqx-table-column :label="$t('status.comment')" min-width="120">
        <template v-slot="scope">
          <emqx-select
            v-model="scope.row.stmt"
            @change="handleChange($event, scope.$index)"
            clearable
            style="width: 100%"
            size="mini"
          >
            <emqx-option v-for="item in scriptList" :key="item.val" :label="item.val" :value="item.val"> </emqx-option>
          </emqx-select>
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('common.statement')" min-width="300">
        <template v-slot="scope">
          <emqx-input placeholder="" type="textarea" size="mini" :rows="1" v-model="scope.row.expr"> </emqx-input>
        </template>
      </emqx-table-column>
      <emqx-table-column label=" " min-width="60">
        <template v-slot="scope">
          <div class="btn">
            <i class="el-icon-circle-plus plus" @click="add(scope.$index)"></i>&nbsp;
            <i class="el-icon-remove remove" @click="remove(scope.$index)"></i>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>
    <el-dialog v-model="dialogVisible" title="POS" width="300px" @closed="handleClosed">
      <el-input-number
        class="emqx-input-number"
        v-model="pos"
        :min="1"
        :max="999"
        :controls="false"
        size="mini"
      ></el-input-number>
      <template #footer>
        <span class="dialog-footer">
          <emqx-button @click="dialogVisible = false">{{ $t('common.cancel') }}</emqx-button>
          <emqx-button type="primary" @click="handlePosSubmit">{{ $t('common.submit') }}</emqx-button>
        </span>
      </template>
    </el-dialog>
  </Container>
</template>

<script>
/* eslint-disable */
import { ScriptList } from '@/config/index'
import _ from 'lodash'
import ScriptTypeSelect from './components/scriptType'
import { getData, postData } from '@/api/data'
import { ElDialog, ElInputNumber } from 'element-plus'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

export default {
  components: {
    ElDialog,
    ElInputNumber,
    ScriptTypeSelect,
    Container,
  },
  data() {
    return {
      scriptData: [],
      oldScriptData: [],
      scriptList: ScriptList,
      type: {
        name: '',
        subr: '',
      },
      dialogVisible: false,
      pos: 0,
      currentIndex: 0,
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  watch: {
    'type.subr': function (val) {
      if (val) {
        this.readSubroutine(val)
      }
    },
  },
  methods: {
    init() {
      this.scriptData = []
      let i = 6
      while ((i -= 1)) {
        this.scriptData.push({
          stmt: '',
          expr: '',
        })
      }
      this.oldScriptData = _.cloneDeep(this.scriptData)
    },
    readSubroutine(subr) {
      getData(this.nodeId, { func: 33, subr: +subr, wtrm: 'neruon' }).then((res) => {
        this.getSubroutine(res.data)
      })
    },
    getSubroutine(data) {
      if (data.func === 33) {
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
    handlePosSubmit() {
      this.scriptData[this.currentIndex].stmt = `POS${this.pos}`
      this.dialogVisible = false
    },
    handleChange(e, index) {
      if (e === 'POS') {
        this.currentIndex = index
        this.dialogVisible = true
      }
    },
    handleSubmit() {
      if (!this.type.subr) {
        EmqxMessage.error('select a routine')
        return
      }
      ElMessageBox('Are you sure submit these script programming', this.$t('common.submit'), {
        type: 'warning',
      })
        .then(() => {
          const rows = this.scriptData
          const { name, subr } = this.type
          this.submit(name, subr, rows)
        })
        .catch(() => {})
    },
    submit(name, subr, rows) {
      if (!rows) {
        rows = []
      }
      // Remove prefix SR[1-999]
      const _name = name.replace(/^SR([1-9][0-9]{0,2})\s-\s/g, '')
      postData(this.nodeId, {
        func: 34,
        csub: 0,
        name: _name,
        subr: +subr,
        nrow: rows.length,
        rows,
        wtrm: 'neruon',
      }).then((res) => {
        this.setData(res.data)
      })
    },
    setData(data) {
      if (data.func === 34 && data.errc === 0) {
        this.oldScriptData = []
        this.oldScriptData = _.cloneDeep(this.scriptData)
        EmqxMessage.success(this.$t('common.addSuccess'))
      } else {
        EmqxMessage.error(data.emsg)
      }
    },
    handleClosed() {
      this.currentIndex = 0
    },
    add(index) {
      this.scriptData.splice(index + 1, 0, { stmt: '', expr: '' })
    },
    remove(index) {
      this.scriptData.splice(index, 1)
    },
    promptUnsubmitted(callback) {
      ElMessageBox(this.$t('common.unsubmitAndSave'), this.$t('common.confirm'), {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.discardChanges'),
      })
        .then(() => {
          const rows = this.scriptData
          const { name, subr } = this.type
          this.submit(name, subr, rows)
          callback()
        })
        .catch(() => {
          callback()
        })
    },
  },
  beforeRouteLeave(to, from, next) {
    if (_.isEqual(this.oldScriptData, this.scriptData)) {
      next()
    } else {
      this.promptUnsubmitted(next)
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public';
.script-table {
  >>> td {
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

>>> .el-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
  }
}
</style>
