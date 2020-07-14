<template>
  <Container type="card-full"
              class="historical-alarms"
             :scorll='false'>
    <div class="dd-title">Historical Alarms</div>
    <el-row :gutter="20">
      <el-form>
        <el-col :span="7">
          <el-form-item label="Date:">
            <el-date-picker
              v-model="time"
              class="input"
              range-separator="-"
              start-placeholder="start"
              end-placeholder="end"
              type="datetimerange">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Pattern:">
            <el-input v-model="patn"
                      class="input"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="Category:">
            <el-select
              v-model="cate"
              class="input"
              clearable>
              <el-option
                v-for="item in cateList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button
              class="btn filter"
              @click='handleSubmit("")'>submit</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data='data'
              style="width: 100%;margin-top:20px;">
      <el-table-column min-width="130"
                       prop="anum"
                       label="Index" />
      <el-table-column min-width="130"
                       label="Time">
        <template slot-scope="scope">
          {{format(scope.row.tstp||'')}}
        </template>
      </el-table-column>
      <el-table-column min-width="130"
                       prop="cate"
                       label="Category" />
      <el-table-column prop="stat"
                       label="State"
                       min-width="130" />
      <el-table-column prop="uack"
                       min-width="130"
                       label="Remark">
      </el-table-column>
      <el-table-column prop="comt"
                       min-width="400"
                       label="Alarm message" />
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import moment from 'moment'
export default {
  mixins: [Mixins],
  data () {
    return {
      data: [],
      params: {},
      time: [moment().subtract(1, 'hours'), moment()],
      srch: 'FromFirst',
      cate: '',
      cateList: ['critical', 'alarm', 'warning', 'event', 'view'],
      patn: ''
    }
  },
  methods: {
    handleSubmit (tokn) {
      if (tokn === '') this.data = []
      let [start, end] = this.time
      const { srch, sett, cate, patn } = this
      start = moment(start)
      end = moment(end)
      this.params = {
        'func': 81,
        srch,
        sett,
        'ofst': 0,
        'tokn': tokn,
        cate,
        patn,
        'fryr': start.year(),
        'frmo': start.month() + 1,
        'frda': start.date(),
        'frhr': start.hour(),
        'frmi': start.minute(),
        'toyr': end.year(),
        'tomo': end.month() + 1,
        'toda': end.date(),
        'tohr': end.hour(),
        'tomi': end.minute()
      }
      this.$ws().set({ success: this.setData }).send(this.params)
    },
    setData (data) {
      if (data.func === 81) {
        if (data.rows) {
          data.rows.forEach(i => this.data.push(i))
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
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang='scss' scoped>
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
