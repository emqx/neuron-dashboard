<template>
  <Container class="data-monitoring" ref="container" type="card-full" :scorll="false">
    <template v-slot:default>
      <div class="row flex">
        <div class="dd-title">{{ $t('status.dataMonitoring') }}</div>
        <div class="btnGroup">
          <span class="object-name">{{ $t('status.objectName') }}: </span>
          <emqx-select v-model="objName">
            <emqx-option v-for="item in objList" :key="item" :label="item" :value="item"> </emqx-option>
          </emqx-select>
          <span class="btn-group">
            <emqx-button @click="handleShow(null, 'History')">{{ $t('status.history') }}</emqx-button>
            <emqx-button @click="handleShow(null, 'Current')">{{ $t('status.current') }}</emqx-button>
          </span>
        </div>
      </div>
      <vxe-table
        v-if="maxTableHeight"
        round
        show-overflow
        highlight-hover-row
        :max-height="maxTableHeight"
        :sort-config="{ trigger: 'cell' }"
        :data="tableData.length ? data : []"
        :empty-text="$t('common.emptyData')"
      >
        <vxe-table-column width="55">
          <template v-slot:header>
            <el-checkbox @change="handleCheckAll"></el-checkbox>
          </template>
          <template v-slot="scope">
            <el-checkbox
              v-model="scope.row.checked"
              v-if="scope.row.prop !== 'Time'"
              @change="handleCheck($event, scope.row)"
            ></el-checkbox>
          </template>
        </vxe-table-column>
        <vxe-table-column field="prop" :title="$t('status.attribute')" min-width="180"> </vxe-table-column>
        <vxe-table-column field="val" :title="$t('status.value')" min-width="180"> </vxe-table-column>
        <vxe-table-column width="300" header-class-name="is-right" class-name="is-right">
          <template v-slot="scope">
            <div class="btn" v-if="scope.row.prop !== 'Time'">
              <emqx-button type="text" v-if="scope.row.writable" @click="handleWrite(scope.row)">{{
                $t('status.write')
              }}</emqx-button>
              <emqx-button type="text" @click="handleShow(scope.row, 'History')">{{
                $t('status.history')
              }}</emqx-button>
              <emqx-button type="text" @click="handleShow(scope.row, 'Current')">{{
                $t('status.current')
              }}</emqx-button>
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <emqx-pagination
        hide-on-single-page
        background
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :page-sizes="[500, 800, 1000]"
        :total="count"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      >
      </emqx-pagination>
      <CurrentChartDialog ref="CurrentChartDialog" :props="multipleSelection" :objName="objName" />
      <HistoryChartDialog ref="HistoryChartDialog" :props="multipleSelection" :objName="objName" />
      <WriteDialog ref="WriteDialog" :objName="objName" />
    </template>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import moment from 'moment'
import { getData } from '@/api/data'
import paginate from '../../../utils/paginate'
import { ElCheckbox } from 'element-plus'
import CurrentChartDialog from './components/CurrentChartDialog'
import HistoryChartDialog from './components/HistoryChartDialog'
import WriteDialog from './components/WriteDialog'
import Container from '@/components/core/Container/index.vue'
import { EmqxMessage } from '@emqx/emqx-ui'

const paginateWithTimeStamp = (data, pageSize, pageNo) => {
  // Array<Array<data item>>
  let startIndex = 0
  const createOneGroup = () => {
    const thisPageData = []
    let index = startIndex
    let endIndex = startIndex + pageSize
    for (; index < endIndex; index++) {
      if (!data[index]) {
        break
      }
      if (data[index] === 'tstp') {
        endIndex++
      }
      thisPageData.push(data[index])
    }
    startIndex = index
    return thisPageData
  }
  for (let index = 1; index < pageNo + 1; index++) {
    if (index < pageNo) {
      createOneGroup()
    } else {
      return createOneGroup()
    }
  }
}

export default {
  components: {
    ElCheckbox,
    CurrentChartDialog,
    HistoryChartDialog,
    WriteDialog,
    Container,
  },
  mixins: [Mixins],
  data() {
    return {
      objName: '',
      multipleSelection: [],
      objList: [],
      tableData: [],
      tableKey: [],
      currentWritableData: {},
      data: [],
      dataList: [],
      alarmList: [],
      writableList: [],
      checkedAll: true,
      count: 0,
      pageSize: 500,
      page: 1,
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  watch: {
    objName: {
      handler(val) {
        this.multipleSelection = this.tableKey.map((i) => ({
          prop: i,
          check: false,
        }))
        if (val) {
          this.getObjRegister()
        }
      },
    },
  },
  mounted() {
    this.getObjTele()
  },
  methods: {
    getObjRegister() {
      getData(this.nodeId, {
        func: 50,
        wtrm: 'neuron',
        srcn: this.objName,
      }).then((res) => {
        this.dataList = res.data.tele
        this.setTableData()
        this.setTableKey()
        this.setCurrentWritableData()
        this.setData()
      })
    },
    getObjTele() {
      if (this.$store.state.Status.status.mode === 'INACTIVE') {
        return
      }
      getData(this.nodeId, {
        func: 60,
        wtrm: 'neuron',
      }).then((res) => {
        if (res.data.errc !== 0) {
          EmqxMessage.error(res.data.emsg)
        }
        if (res.data.tele) {
          this.writableList = res.data.tele
          this.alarmList = res.data.tele
          this.setObjList()
        }
      })
    },
    setObjList() {
      this.objList = this.alarmList.map((i) => i.objn)
      if (this.objList.length && this.objName === '') {
        this.objName = this.objList[0]
      }
    },
    setTableData() {
      this.tableData = this.dataList
        .filter((i) => i.objn === this.objName)
        .map((i) => {
          if (i && i.tstp) {
            if (typeof i.tstp === 'number') {
              i.tstp = this.format(i.tstp)
            }
          }
          return i
        })
    },
    setTableKey() {
      this.tableKey = Object.keys(this.tableData[0])
    },
    setCurrentWritableData() {
      if (this.writableList) {
        this.currentWritableData = this.writableList.find((j) => j.objn === this.objName) || {}
      }
    },
    setData() {
      const data = []
      const tableKeyWithTimeStamp = this.tableKey.filter((i) => i !== 'objn')
      const canUseTableKey = tableKeyWithTimeStamp.filter((i) => i !== 'tstp')
      this.count = canUseTableKey.length
      const currentTableKey = paginateWithTimeStamp(tableKeyWithTimeStamp, this.pageSize, this.page)
      currentTableKey.forEach((i) => {
        const checked = this.multipleSelection.find((j) => j.prop === i)
        data.push({
          prop: i === 'tstp' ? 'Time' : i,
          val: this.tableData[0][i],
          writable: this.currentWritableData ? !!this.currentWritableData[i] : false,
          checked: checked ? checked.check : false,
        })
      })
      this.data = data
    },
    handleWrite(row) {
      this.$refs.WriteDialog.handleShow(row.prop)
    },
    handleShow(row, type) {
      this.$refs[`${type}ChartDialog`].handleShow(row)
    },
    handleCheck(e, row) {
      this.multipleSelection.forEach((i) => {
        if (i.prop === row.prop) {
          i.check = e
        }
      })
    },
    handleCheckAll(val) {
      this.multipleSelection.forEach((i) => {
        i.check = val
      })
    },
    format(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    handlePageChange() {
      this.setData()
    },
    handleSizeChange() {
      this.setData()
    },
  },
}
</script>

<style lang="scss" scoped>
.data-monitoring {
  .object-name {
    margin-right: 20px;
  }
  .btn-group {
    margin-left: 44px;
  }
  .emqx-select.el-select {
    width: 200px;
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
.btnGroup {
  width: 720px;
  text-align: right;
  >>> .el-select {
    width: 350px;
  }
}
</style>
