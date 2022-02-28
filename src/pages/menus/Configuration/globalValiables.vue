<template>
  <Container type="card-full" :scorll="false">
    <div class="flex dd-mb">
      <div class="dd-title">{{ $t('configuration.gValiables') }}</div>
      <div>
        <el-button @click="handleSubmit(null)">{{ $t('common.submit') }}</el-button>
      </div>
    </div>
    <el-table class="script-table" :data="varData">
      <el-table-column :label="$t('configuration.variableG')" min-width="120">
        <template slot-scope="scope">
          <el-input placeholder="" @keyup.enter.native="add(scope.$index)" size="mini" v-model="scope.row.glov">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('configuration.nos')" min-width="100">
        <template slot-scope="scope">
          <el-input placeholder="" @keyup.enter.native="add(scope.$index)" size="mini" v-model="scope.row.leng" />
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.description')" min-width="300">
        <template slot-scope="scope">
          <el-input placeholder="" size="mini" v-model="scope.row.comt"> </el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="60">
        <template slot-scope="scope">
          <div class="btn">
            <i class="el-icon-circle-plus plus" @click="add(scope.$index)"></i>&nbsp;
            <i class="el-icon-remove remove" @click="remove(scope.$index)"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import _ from 'lodash'

export default {
  mixins: [Mixins],
  data() {
    return {
      varData: [],
      oldVarData: [],
      func: 30,
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.$ws().set({ success: this.readGlobalVariable }).send({ func: this.func })
    },
    readGlobalVariable(data) {
      if (data.func === this.func) {
        this.$ws().remove(this.readGlobalVariable)
        this.varData = []
        this.varData = data.rows
        let i = 5
        while (i--) {
          this.varData.push({
            glov: '',
            leng: '',
            comt: '',
          })
        }
        this.oldVarData = _.cloneDeep(this.varData)
      }
    },
    setData(data) {
      if (data.func === 31 && data.errc === 0) {
        this.$ws().remove(this.setData)
        this.oldVarData = []
        this.oldVarData = _.cloneDeep(this.varData)
      }
    },
    handleSubmit(callback) {
      const sendData = () => {
        const res = _.cloneDeep(this.varData).filter((i) => {
          i.leng = +i.leng
          return i.glov && i.leng
        })
        this.$ws().set({ success: this.setData }).send({
          func: 31,
          nrow: res.length,
          rows: res,
        })
      }
      if (callback) {
        sendData()
        callback()
      } else {
        this.$confirm(this.$t('configuration.confirmSubmitGVar'), this.$t('common.submit'), {
          type: 'warning',
        })
          .then(() => {
            sendData()
          })
          .catch(() => {})
      }
    },
    add(index) {
      this.varData.splice(index + 1, 0, {
        glov: '',
        leng: '',
        comt: '',
      })
    },
    remove(index) {
      this.varData.splice(index, 1)
    },
  },
  beforeRouteLeave(to, from, next) {
    if (_.isEqual(this.oldVarData, this.varData)) {
      next()
    } else {
      this.$confirm(this.$t('common.unsubmitAndSave'), this.$t('common.confirm'), {
        type: 'warning',
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('common.submit'),
        cancelButtonText: this.$t('common.discardChanges'),
      })
        .then(() => {
          this.handleSubmit(next)
        })
        .catch(() => {
          next()
        })
    }
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public';
.input-number {
  /deep/input {
    text-align: left;
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
</style>
