<template>
  <Container ref="container" class="logs" type="card-full" :scorll="false">
    <div class="dd-title">{{ $t('status.logs') }}</div>
    <el-row :gutter="20">
      <el-form>
        <el-col :span="6">
          <el-form-item :label="$t('status.date')">
            <el-date-picker
              v-model="date"
              class="input"
              range-separator="-"
              start-placeholder="start"
              end-placeholder="end"
              type="datetimerange"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('status.logType')">
            <el-select v-model="logType" class="input" clearable>
              <el-option v-for="item in logList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('status.proc')">
            <el-select v-model="proc" class="input" clearable>
              <el-option v-for="item in procList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button class="btn" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-table
      v-if="maxTableHeight"
      :max-height="maxTableHeight - 102"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <el-table-column prop="tstp" :label="$t('status.time')" width="300">
        <template slot-scope="scope">
          {{ format(scope.row.tstp) }}
        </template>
      </el-table-column>
      <el-table-column prop="logl" :label="$t('status.level')" width="200"> </el-table-column>
      <el-table-column prop="proc" :label="$t('status.proc')" width="200"> </el-table-column>
      <el-table-column show-overflow-tooltip prop="data" :label="$t('status.content')"> </el-table-column>
    </el-table>
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
import formatDate from '@/utils/formatDate'
import { setOneHourTime, setTimeDate } from '@/utils/time'

export default {
  name: 'Logs',
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
      this.$ws().set({ success: this.setData }).send({
        func: 83,
        srtt,
        stpt,
        srtl,
        proc: this.proc,
        logl: this.logType,
      })
    },
    format: formatDate,
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
  created() {
    this.date = setOneHourTime()
  },
  mounted() {
    this.sendData()
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
      border: 1px solid #e2e7ea;
      transition: all 0.3s ease;
      color: #fff;
      margin-right: 10px;
      background: #189bfe;
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
