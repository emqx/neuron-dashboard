<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-mb">
      <span class="dd-title">Current Alarm</span>
      <el-select v-model="action"
                 @change="handleChange"
                 class="dd-ml">
        <el-option v-for="item in options"
                   :key="item.val"
                   :label="item.label"
                   :value="item.val">
        </el-option>
      </el-select>
    </div>
    <el-table :data='grow'
              style="width: 100%">
      <el-table-column min-width="130"
                       prop="atim"
                       label="Time">
        <template slot-scope="scope">
          {{format(scope.row.atim||'')}}
        </template>
      </el-table-column>
      <el-table-column min-width="60"
                       prop="acat"
                       label="Categ" />
      <el-table-column prop="astt"
                       label="State"
                       min-width="50" />
      <el-table-column prop="amod"
                       label="Remark"
                       min-width="50" />
      <el-table-column min-width="100"
                       prop="comt"
                       label="Comment">
      </el-table-column>
      <el-table-column min-width="100"
                       label="">
        <template slot-scope="scope">
          <el-button type='text'
                     @click="handleClick(scope.row)">
            <!-- acknowledge or enable or disable -->
            {{actn}}
          </el-button>
        </template>
      </el-table-column>
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
      minWidth: 100,
      action: '',
      options: [
        {
          val: 'act_en',
          label: 'Active enabled alarms'
        },
        {
          val: 'act_unack',
          label: 'Active Unack alarms'
        },
        {
          val: 'act_all',
          label: 'Active all alarms'
        },
        {
          val: 'all_alm',
          label: 'All alarms'
        },
        {
          val: 'all_en',
          label: 'All enabled alarms'
        },
        {
          val: 'all_dis',
          label: 'All disabled alarms'
        }
      ]
    }
  },
  computed: {
    grow () {
      return this.$store.state.Status.status.grow || []
    },
    actn () {
      let res = 'acknowledge'
      res = this.action === 'all_en' ? 'disable' : res
      res = this.action === 'all_dis' ? 'enable' : res
      return res
    }
  },
  methods: {
    handleClick (row) {
      if (this.action === 'all_alm') return
      this.$ws().send({
        func: 80,
        alid: row.alid,
        actn: this.actn
      })
    },
    handleChange (e) {
      this.$ws().send({
        func: 79,
        actn: this.action
      })
    },
    format (time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
