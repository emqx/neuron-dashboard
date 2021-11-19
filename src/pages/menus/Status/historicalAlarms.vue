<template>
  <Container type="card-full" class="historical-alarms" :scorll="false">
    <div class="dd-title">{{ $t('status.historicalAlarms') }}</div>
    <el-row :gutter="20">
      <el-form>
        <el-col :span="7">
          <el-form-item :label="$t('status.date')">
            <el-date-picker
              v-model="time"
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
        <el-col :span="7">
          <el-form-item :label="$t('status.pattern')">
            <el-input v-model="patn" class="input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('status.category')">
            <el-select v-model="cate" class="input" clearable>
              <el-option v-for="item in cateList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button class="btn filter" @click="handleSubmit('')">{{ $t('common.submit') }}</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="data" style="width: 100%; margin-top: 20px;">
      <el-table-column min-width="130" prop="anum" :label="$t('status.index')" />
      <el-table-column min-width="130" :label="$t('status.time')">
        <template slot-scope="scope">
          {{ format(scope.row.tstp || '') }}
        </template>
      </el-table-column>
      <el-table-column min-width="130" prop="cate" :label="$t('status.category')" />
      <el-table-column prop="stat" :label="$t('status.state')" min-width="130" />
      <el-table-column prop="uack" min-width="130" :label="$t('status.remark')"> </el-table-column>
      <el-table-column prop="comt" min-width="400" :label="$t('status.alarmMessage')" />
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import formatDate from '@/utils/formatDate'
import { setOneHourTime, setTimeDate } from '@/utils/time'

export default {
  mixins: [Mixins],
  data() {
    return {
      data: [],
      params: {},
      time: [],
      srch: '',
      cate: '',
      cateList: ['critical', 'alarm', 'warning', 'event', 'view'],
      patn: '',
    }
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
      }
      this.$ws().set({ success: this.setData }).send(this.params)
    },
    setData(data) {
      if (data.func === 81) {
        if (data.rows) {
          data.rows.forEach((i) => this.data.push(i))
        }
        if (data.tokn) {
          if (data.tokn === '-1') {
            this.$ws().remove(this.setData)
          } else {
            this.handleSubmit(data.tokn)
          }
        }
      }
    },
    format: formatDate,
  },
  created() {
    this.time = setOneHourTime()
  },
}
</script>

<style lang="scss" scoped>
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
}
</style>
