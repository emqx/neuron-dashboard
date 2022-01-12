<template>
  <Container ref="container" type="card-full" :scorll="false">
    <div class="row flex">
      <div class="dd-title">{{ $t('status.dataMonitoring') }}</div>
      <div class="btnGroup">
        <span>{{ $t('status.objectName') }}: </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-select v-model="objName">
          <el-option v-for="item in objList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="handleShow(null, 'Current')">{{ $t('status.current') }}</el-button>
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
        <template slot="header">
          <el-checkbox @change="handleCheckAll"></el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            v-if="scope.row.prop !== 'Time'"
            @change="handleCheck($event, scope.row)"
          ></el-checkbox>
        </template>
      </vxe-table-column>
      <vxe-table-column field="prop" :title="$t('status.attribute')" min-width="180"> </vxe-table-column>
      <vxe-table-column field="val" :title="$t('status.value')" min-width="180"> </vxe-table-column>
      <vxe-table-column width="300">
        <template slot-scope="scope">
          <div class="btn" v-if="scope.row.prop !== 'Time'">
            <el-button type="text" v-if="scope.row.writable" @click="handleWrite(scope.row)">{{
              $t('status.write')
            }}</el-button>
            <el-button type="text" @click="handleShow(scope.row, 'History')">{{ $t('status.history') }}</el-button>
            <el-button type="text" @click="handleShow(scope.row, 'Current')">{{ $t('status.current') }}</el-button>
          </div>
        </template>
      </vxe-table-column>
      <div slot="empty">
        {{ $t('common.emptyData') }}
      </div>
    </vxe-table>
    <el-pagination
      hide-on-single-page
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="page"
      :page-size.sync="pageSize"
      :page-sizes="[500, 800, 1000]"
      :total="count"
    >
    </el-pagination>
    <CurrentChartDialog ref="CurrentChartDialog" :props="multipleSelection" :objName="objName" />
    <HistoryChartDialog ref="HistoryChartDialog" :props="multipleSelection" :objName="objName" />
    <WriteDialog ref="WriteDialog" :objName="objName" :attr="currentAttr" />
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import formatDate from '@/utils/formatDate'

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
  mixins: [Mixins],
  data() {
    return {
      objName: '',
      multipleSelection: [],
      checkedAll: true,
      count: 0,
      pageSize: 500,
      page: 1,
      currentAttr: {},
    }
  },
  computed: {
    ...mapState({
      dataList: (state) => state.Status.alarmList,
      objectData: (state) => state.SetUpData.objectData,
      writableList: (state) => state.Status.writableList,
    }),
    objList() {
      return this.dataList.map((i) => i.objn)
    },
    /**
     * The attribute list of the currently selected object,
     * in order to obtain the data type of the attribute.
     */
    currentAttrList() {
      const findResult = this.objectData.find(({ objn }) => objn === this.objName)
      if (findResult) {
        return findResult.oatt
      }
      return []
    },
    tableData() {
      return this.dataList
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
    tableKey() {
      return Object.keys(this.tableData[0])
    },
    currentWritableData() {
      if (this.writableList) {
        return this.writableList.find((j) => j.objn === this.objName) || {}
      }
    },
    data() {
      let data = []
      const tableKeyWithTimeStamp = this.tableKey.filter((i) => i !== 'objn')
      const canUseTableKey = tableKeyWithTimeStamp.filter((i) => i !== 'tstp')
      this.count = canUseTableKey.length
      const currentTableKey = paginateWithTimeStamp(tableKeyWithTimeStamp, this.pageSize, this.page)
      currentTableKey.forEach((key) => {
        const checked = this.multipleSelection.find((j) => j.prop === key)
        const type = (this.currentAttrList.find(({ attn }) => attn === key) || {}).attt || 'word'
        console.log(type)
        data.push({
          prop: key === 'tstp' ? 'Time' : key,
          val: this.tableData[0][key],
          writable: this.currentWritableData ? !!this.currentWritableData[key] : false,
          checked: checked ? checked.check : false,
          type,
        })
      })
      return data
    },
  },
  watch: {
    objList: {
      handler(val) {
        if (val.length && this.objName === '') {
          this.objName = val[0]
        }
      },
    },
    objName: {
      handler() {
        this.multipleSelection = this.tableKey.map((i) => ({
          prop: i,
          check: false,
        }))
      },
    },
  },
  methods: {
    handleWrite(row) {
      this.currentAttr = row
      this.$refs.WriteDialog.handleShow(row.prop)
    },
    handleShow(row, type) {
      this.$refs[type + 'ChartDialog'].handleShow(row)
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
    format: formatDate,
  },
  components: {
    CurrentChartDialog: () => import('./components/CurrentChartDialog'),
    HistoryChartDialog: () => import('./components/HistoryChartDialog'),
    WriteDialog: () => import('./components/WriteDialog'),
  },
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  margin-top: 20px;
}
.noData {
  text-align: center;
  margin: 50px;
}
.btnGroup {
  /deep/.el-select {
    width: 350px;
  }
}
</style>
