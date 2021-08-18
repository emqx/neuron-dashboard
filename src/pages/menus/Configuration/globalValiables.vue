<template>
  <Container type="card-full" :scorll="false">
    <div class="flex dd-mb">
      <div class="dd-title">{{ $t('configuration.gValiables') }}</div>
      <div>
        <emqx-button @click="handleSubmit(null)">{{ $t('common.submit') }}</emqx-button>
      </div>
    </div>
    <emqx-table class="script-table" :data="varData">
      <emqx-table-column label="Variable G." min-width="120">
        <template v-slot="scope">
          <emqx-input placeholder="" @keyup.enter="add(scope.$index)" size="mini" v-model="scope.row.glov">
          </emqx-input>
        </template>
      </emqx-table-column>
      <emqx-table-column label="Nos" min-width="100">
        <template v-slot="scope">
          <emqx-input placeholder="" @keyup.enter="add(scope.$index)" size="mini" v-model="scope.row.leng" />
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('common.description')" min-width="300">
        <template v-slot="scope">
          <emqx-input placeholder="" size="mini" v-model="scope.row.comt"> </emqx-input>
        </template>
      </emqx-table-column>
      <emqx-table-column min-width="60">
        <template v-slot="scope">
          <div class="btn">
            <i class="el-icon-circle-plus plus" @click="add(scope.$index)"></i>&nbsp;
            <i class="el-icon-remove remove" @click="remove(scope.$index)"></i>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>
  </Container>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import { getData, postData } from '@/api/data'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

export default {
  components: { Container },
  data() {
    return {
      varData: [],
      oldVarData: [],
      func: 30,
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      getData(this.nodeId, { func: this.func, wtrm: 'neruon' }).then((res) => {
        this.readGlobalVariable(res.data)
      })
    },
    readGlobalVariable(data) {
      if (data.func === this.func) {
        this.varData = []
        this.varData = data.rows
        let i = 5
        while ((i -= 1)) {
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
        this.oldVarData = []
        this.oldVarData = _.cloneDeep(this.varData)
        EmqxMessage.success(this.$t('common.submitSuccess'))
      } else {
        EmqxMessage.error(data.emsg)
      }
    },
    handleSubmit(callback) {
      const sendData = () => {
        const res = _.cloneDeep(this.varData).filter((i) => {
          i.leng = +i.leng
          return i.glov && i.leng
        })
        postData(this.nodeId, {
          func: 31,
          nrow: res.length,
          rows: res,
          wtrm: 'neruon',
        }).then((res) => {
          this.setData(res.data)
        })
      }
      if (callback) {
        sendData()
        callback()
      } else {
        ElMessageBox(this.$t('configuration.confirmSubmitGVar'), this.$t('common.submit'), {
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
      ElMessageBox(this.$t('common.unsubmitAndSave'), this.$t('common.confirm'), {
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
  >>> input {
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
