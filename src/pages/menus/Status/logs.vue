<template>
  <Container ref="container" class="logs" type="card-full" :scorll="false">
    <div class="dd-title">{{ $t('status.logs') }}</div>
    <el-row :gutter="20">
      <el-form>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item :label="$t('status.logType')">
            <el-select v-model="logType" class="input" clearable>
              <el-option v-for="item in logList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button class="btn" @click="handleSubmit">{{ $t('common.submit') }}</el-button>
        </el-col>
      </el-form>
    </el-row>
    <vxe-table
      v-if="maxTableHeight"
      round
      show-overflow
      highlight-hover-row
      :max-height="maxTableHeight - 102"
      :sort-config="{ trigger: 'cell' }"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <vxe-table-column field="tstp" :title="$t('status.time')" width="300">
        <template slot-scope="scope">
          {{ format(scope.row.tstp) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="logl" :title="$t('status.level')" width="280"> </vxe-table-column>
      <vxe-table-column field="data" :title="$t('status.content')"> </vxe-table-column>
      <div slot="empty">
        {{ $t('common.emptyData') }}
      </div>
    </vxe-table>
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
import paginate from '../../../utils/paginate'
import Mixins from '@/mixins'
import moment from 'moment'

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
      logList: ['all', 'debug', 'info', 'warning', 'err'],
    }
  },
  methods: {
    setData(data) {
      if (data.func === 83) {
        console.log(data)
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
      const setDate = (time) => Math.floor(time / 1000)
      if (!this.date) {
        this.date = []
      }
      const srtt = setDate(this.date[0])
      const stpt = setDate(this.date[1])
      const srtl = this.pageMap[this.page - 1] || 0
      this.$ws().set({ success: this.setData }).send({
        func: 83,
        srtt,
        stpt,
        srtl,
        logl: this.logType,
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
  created() {
    const date = new Date()
    const now = date.getTime()
    const hour = now - 1 * 60 * 60 * 1000
    this.date = [hour, now]
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
