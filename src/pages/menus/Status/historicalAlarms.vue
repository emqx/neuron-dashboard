<template>
  <Container type="card-full" class="historical-alarms" :scorll="false">
    <div class="dd-title">{{ $t('status.historicalAlarms') }}</div>
    <emqx-form>
      <emqx-row :gutter="20">
        <emqx-col :span="7">
          <emqx-form-item :label="$t('status.date')">
            <el-date-picker
              v-model="time"
              class="input"
              range-separator="-"
              start-placeholder="start"
              end-placeholder="end"
              type="datetimerange"
            >
            </el-date-picker>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="7">
          <emqx-form-item :label="$t('status.pattern')">
            <emqx-input v-model="patn" class="input"></emqx-input>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="7">
          <emqx-form-item :label="$t('status.category')">
            <emqx-select v-model="cate" class="input" clearable>
              <emqx-option v-for="item in cateList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="3">
          <emqx-form-item>
            <emqx-button class="btn filter" @click="handleSubmit('')">{{ $t('common.submit') }}</emqx-button>
          </emqx-form-item>
        </emqx-col>
      </emqx-row>
    </emqx-form>
    <emqx-table :data="data" style="width: 100%; margin-top: 20px">
      <emqx-table-column min-width="130" prop="anum" :label="$t('status.index')" />
      <emqx-table-column min-width="130" :label="$t('status.time')">
        <template v-slot="scope">
          {{ format(scope.row.tstp || '') }}
        </template>
      </emqx-table-column>
      <emqx-table-column min-width="130" prop="cate" :label="$t('status.category')" />
      <emqx-table-column prop="stat" :label="$t('status.state')" min-width="130" />
      <emqx-table-column prop="uack" min-width="130" :label="$t('status.remark')"> </emqx-table-column>
      <emqx-table-column prop="comt" min-width="380" :label="$t('status.alarmMessage')" align="right" />
    </emqx-table>
  </Container>
</template>

<script>
import moment from 'moment'
import { getData } from '@/api/data'
import { setOneHourTime, setTimeDate } from '@/utils/time'
import { ElDatePicker } from 'element-plus'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'

export default {
  components: {
    ElDatePicker,
    Container,
  },
  data() {
    return {
      data: [],
      params: {},
      time: [],
      srch: '',
      cate: '',
      cateList: ['critical', 'alarm', 'warning', 'event', 'view'],
      patn: '',
      sett: '',
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  created() {
    this.time = setOneHourTime()
  },
  methods: {
    handleSubmit(tokn) {
      if (tokn === '') {
        this.data = []
      }
      if (!this.time) {
        this.time = []
      }
      const { srch, cate, patn } = this
      const frti = setTimeDate(this.time[0])
      const toti = setTimeDate(this.time[1])
      this.params = {
        func: 81,
        srch,
        tokn,
        ofst: 0,
        frti,
        toti,
        cate,
        patn,
        wtrm: 'neuron',
      }
      getData(this.nodeId, this.params).then(res => {
        this.setData(res.data)
      })
    },
    setData(data) {
      if (data.func === 81) {
        if (data.errc !== 0) {
          EmqxMessage.error(data.emsg)
        } else {
          if (data.rows) {
            data.rows.forEach(i => this.data.push(i))
          }
          if (data.tokn) {
            if (data.tokn !== '-1') {
              this.handleSubmit(data.tokn)
            }
          }
        }
      }
    },
    format(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss">
.historical-alarms {
  .el-row {
    margin-top: 20px;
  }
  .btn.filter {
    float: right;
    position: relative;
    top: 38px;
  }
  .el-select,
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
  }
}
</style>
