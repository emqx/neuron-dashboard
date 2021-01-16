<template>
  <Container ref="container" class="log-switch" type="card-full" :scorll="false">
    <div class="dd-title">{{ $t('status.logSwitch') }}</div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('status.serviceLog')" name="SERVICELOG"></el-tab-pane>
      <el-tab-pane :label="$t('status.driverLog')" name="DRIVERLOG"></el-tab-pane>
      <el-tab-pane :label="$t('status.scriptLog')" name="SCRIPTLOG"></el-tab-pane>
    </el-tabs>
    <div class="control">
      <label>{{ $t('status.maxLines') }}:</label>
      <el-input-number v-model="maxLines" :controls="false" :precision="0" :min="0" />
      <el-button @click="submit">{{ $t('common.submit') }}</el-button>
    </div>
    <el-table
      ref="logTable"
      v-if="maxTableHeight"
      :max-height="maxTableHeight - 82"
      :data="tableData"
      :empty-text="$t('common.emptyData')"
    >
      <el-table-column show-overflow-tooltip prop="content" :label="$t('status.log')"> </el-table-column>
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import moment from 'moment'

export default {
  name: 'LogSwitch',
  mixins: [Mixins],
  data() {
    return {
      activeName: 'SERVICELOG',
      maxLines: 100,
      tableData: [],
      SERVICELOG_Data: [],
      DRIVERLOG_Data: [],
      SCRIPTLOG_Data: [],
    }
  },
  watch: {
    activeName(val) {
      this.tableData = this[`${val}_Data`]
    },
  },
  methods: {
    sendData() {
      this.$ws().remove(this.setData)
      this.$ws().set({ success: this.setData }).send({
        func: 84,
        logn: this.activeName,
        vars: this.maxLines,
      })
    },
    setData(data) {
      if (data.logn === this.activeName) {
        const _rows = data.rows.map((row) => ({ content: row }))
        this.tableData.push(..._rows)
        this.$nextTick(() => {
          const { scrollHeight } = this.$refs.logTable.bodyWrapper
          this.$refs.logTable.bodyWrapper.scrollTop = scrollHeight
        })
        this[`${this.activeName}_Data`] = this.tableData
      }
    },
    submit() {
      this.sendData()
    },
  },
  mounted() {
    this.$ws().set({ success: this.setData })
  },
}
</script>

<style lang="scss">
.log-switch {
  .dd-title {
    margin-bottom: 20px;
  }
  .el-tabs {
    margin-bottom: 20px;
  }
  .control {
    position: absolute;
    top: 70px;
    right: 20px;
    .el-input-number {
      margin: 0px 20px;
    }
  }
}
</style>
