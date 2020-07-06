<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="row flex">
      <div class="dd-title">Data Monitoring</div>
      <div class="btnGroup">
        <span>Object Name: </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="objName">
          <el-option v-for="item in objList"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click='handleShow(null,"History")'>history</el-button>
        <el-button @click='handleShow(null,"Current")'>current</el-button>
      </div>
    </div>
    <el-table :data="tableData.length ? data: []"
              class="table">
      <el-table-column width="55">
        <template slot="header">
          <el-checkbox @change='handleCheckAll'></el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"
                       v-if='scope.row.prop!=="Time"'
                       @change='handleCheck($event,scope.row)'></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="prop"
                       label="attrbute"
                       min-width="180">
      </el-table-column>
      <el-table-column prop="val"
                       label="value"
                       min-width="180">
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <div class='btn'
               v-if="scope.row.prop!=='Time'">
            <el-button type="text"
                       v-if="scope.row.writable"
                       @click='handleWrite(scope.row)'>write</el-button>
            <el-button type="text"
                       @click='handleShow(scope.row,"History")'>history</el-button>
            <el-button type="text"
                       @click='handleShow(scope.row,"Current")'>current</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <CurrentChartDialog ref='CurrentChartDialog'
                        :props='multipleSelection'
                        :objName='objName' />
    <HistoryChartDialog ref='HistoryChartDialog'
                        :props='multipleSelection'
                        :objName='objName' />
    <WriteDialog ref='WriteDialog'
                 :objName='objName' />
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  mixins: [Mixins],
  data () {
    return {
      objName: '',
      multipleSelection: [],
      checkedAll: true
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.Status.alarmList,
      objectData: state => state.SetUpData.objectData,
      writableList: state => state.Status.writableList
    }),
    objList () {
      return this.dataList.map(i => i.objn)
    },
    tableData () {
      return this.dataList.filter(i => i.objn === this.objName).map(i => {
        if (i && i.tstp) {
          if (typeof i.tstp === 'number') {
            i.tstp = this.format(i.tstp)
          }
        }
        return i
      })
    },
    tableKey () {
      return Object.keys(this.tableData[0])
    },
    currentWritableData () {
      return this.writableList.find(j => j.objn === this.objName) || {}
    },
    data () {
      let data = []
      this.tableKey.forEach(i => {
        if (i !== 'objn') {
          const checked = this.multipleSelection.find(j => j.prop === i)
          data.push({
            prop: i === 'tstp' ? 'Time' : i,
            val: this.tableData[0][i],
            writable: !!this.currentWritableData[i],
            checked: checked ? checked.check : false
          })
        }
      })
      return data
    }
  },
  watch: {
    objList: {
      handler (val) {
        if (val.length && this.objName === '') {
          this.objName = val[0]
        }
      }
    },
    objName: {
      handler () {
        this.multipleSelection = this.tableKey.map(i => ({
          prop: i,
          check: false
        }))
      }
    }
  },
  methods: {
    handleWrite (row) {
      this.$refs.WriteDialog.handleShow(row.prop)
    },
    handleShow (row, type) {
      this.$refs[type + 'ChartDialog'].handleShow(row)
    },
    handleCheck (e, row) {
      this.multipleSelection.forEach(i => {
        if (i.prop === row.prop) {
          i.check = e
        }
      })
    },
    handleCheckAll (val) {
      this.multipleSelection.forEach(i => {
        i.check = val
      })
    },
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    CurrentChartDialog: () => import('./components/CurrentChartDialog'),
    HistoryChartDialog: () => import('./components/HistoryChartDialog'),
    WriteDialog: () => import('./components/WriteDialog')
  }
}
</script>

<style lang='scss' scoped>
.table {
  width: 100%;
  margin-top: 20px;
}
.noData {
  text-align: center;
  margin: 50px;
}
.btnGroup {
  width: 700px;
  /deep/.el-select {
    width: 350px;
  }
}
</style>
