<template>
  <Container ref="container" class="logs" type="card-full" :scorll="false">
    <div class="dd-title">{{ $t('status.logs') }}</div>
    <emqx-form>
      <emqx-row :gutter="20">
        <emqx-col :span="6">
          <emqx-form-item :label="$t('status.date')">
            <el-date-picker
              v-model="date"
              class="input"
              range-separator="-"
              start-placeholder="start"
              end-placeholder="end"
              type="datetimerange"
            >
            </el-date-picker>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="6">
          <emqx-form-item :label="$t('status.logType')">
            <emqx-select v-model="logType" class="input" clearable>
              <emqx-option v-for="item in logList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="6">
          <emqx-form-item :label="$t('status.proc')">
            <emqx-select v-model="proc" class="input" clearable>
              <emqx-option v-for="item in procList" :key="item" :label="item" :value="item"> </emqx-option>
            </emqx-select>
          </emqx-form-item>
        </emqx-col>
        <emqx-col :span="6">
          <emqx-button class="btn" @click="handleSubmit">{{ $t('common.submit') }}</emqx-button>
        </emqx-col>
      </emqx-row>
    </emqx-form>
    <emqx-table
      v-if="maxTableHeight"
      :max-height="maxTableHeight - 102"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <emqx-table-column prop="tstp" :label="$t('status.time')" width="300">
        <template v-slot="scope">
          {{ format(scope.row.tstp) }}
        </template>
      </emqx-table-column>
      <emqx-table-column prop="logl" :label="$t('status.level')" width="200"> </emqx-table-column>
      <emqx-table-column prop="proc" :label="$t('status.proc')" width="200"> </emqx-table-column>
      <emqx-table-column show-overflow-tooltip prop="data" :label="$t('status.content')"> </emqx-table-column>
    </emqx-table>
    <div class="custom-pagination">
      <a :class="['prev', page === 1 ? 'disabled' : '']" href="javascript:;" @click="handlePrevClick">
        <i class="el-icon-arrow-left"></i>
      </a>
      <a :class="['next', hasnext ? '' : 'disabled']" href="javascript:;" @click="handleNextClick">
        <i class="el-icon-arrow-right"></i>
      </a>
    </div>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { getData } from '@/api/data'
import moment from 'moment'
import { setOneHourTime, setTimeDate } from '@/utils/time'
import { ElDatePicker } from 'element-plus'
import Container from '@/components/core/Container/index.vue'

export default {
  name: 'Logs',
  components: {
    ElDatePicker,
    Container,
  },
  mixins: [Mixins],
  data() {
    return {
      date: 0,
      endTime: 0,
      tableData: [],
      page: 1,
      offset: 0,
      hasnext: false,
      pageMap: {},
      logType: 'all',
      proc: 'all',
      logList: ['all', 'debug', 'info', 'warning', 'err'],
      procList: ['all', 'WEBS', 'SERV', 'DRVR', 'CORE', 'TIMR'],
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  created() {
    this.date = setOneHourTime()
  },
  mounted() {
    this.sendData()
  },
  methods: {
    setData(data) {
      if (data.func === 83) {
        if (data.errc === 0) {
          this.tableData = []
          this.tableData = data.rows
          if (data.last !== -1) {
            this.offset = data.last
            this.pageMap[this.page] = this.offset
          }
          this.hasnext = data.nrow === 500 && data.last !== -1
        }
      }
    },
    sendData() {
      if (!this.date) {
        this.date = []
      }
      const srtt = setTimeDate(this.date[0])
      const stpt = setTimeDate(this.date[1])
      const srtl = this.pageMap[this.page - 1] || 0
      getData(this.nodeId, {
        func: 83,
        wtrm: 'neuron',
        srtt,
        stpt,
        srtl,
        logl: this.logType,
        proc: this.proc,
      }).then(res => {
        this.setData(res.data)
      })
    },
    format(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSubmit() {
      this.sendData()
    },
    handleNextClick() {
      if (this.hasnext) {
        this.page += 1
        this.sendData()
      }
    },
    handlePrevClick() {
      if (this.page !== 1) {
        this.page -= 1
        this.sendData()
      }
    },
  },
}
</script>

<style lang="scss">
.logs {
  .el-row {
    margin-top: 20px;
    .btn {
      float: right;
      position: relative;
      top: 38px;
    }
  }
  .el-select,
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .custom-pagination {
    margin-top: 10px;
    text-align: right;
    a {
      border: 1px solid #495062;
      transition: all 0.3s ease;
      color: #fff;
      margin-right: 10px;
      background: #34c388;
      display: inline-block;
      border-radius: 4px;
      padding: 4px 8px;
      &:hover {
        color: #fff;
      }
    }
    a.disabled {
      transition: all 0.3s ease;
      color: #495062;
      background: transparent;
      cursor: not-allowed;
    }
  }
}
.table {
  width: 100%;
  margin-top: 20px;
}
.noData {
  text-align: center;
  margin: 50px;
}
</style>
