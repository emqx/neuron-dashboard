<template>
  <Container type="card-full" :scorll="false">
    <div class="dd-mb">
      <span class="dd-title">{{ $t('status.currentAlarm') }}</span>
      <emqx-select v-model="action" @change="handleChange" class="dd-ml">
        <emqx-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val"> </emqx-option>
      </emqx-select>
    </div>
    <emqx-table :data="grow" style="width: 100%">
      <emqx-table-column min-width="130" prop="atim" :label="$t('status.time')">
        <template v-slot="scope">
          {{ format(scope.row.atim || '') }}
        </template>
      </emqx-table-column>
      <emqx-table-column min-width="60" prop="acat" :label="$t('status.category')" />
      <emqx-table-column prop="astt" :label="$t('status.state')" min-width="50" />
      <emqx-table-column prop="amod" :label="$t('status.remark')" min-width="50" />
      <emqx-table-column min-width="100" prop="comt" :label="$t('status.comment')"> </emqx-table-column>
      <emqx-table-column min-width="100" label="" align="right">
        <template v-slot="scope">
          <emqx-button v-if="actn !== 'acknowledge'" type="text" @click="handleClick(scope.row)">
            <!-- acknowledge or enable or disable -->
            {{ actn }}
          </emqx-button>
          <emqx-button v-else-if="scope.row.amod === 'UNACKALARM'" type="text" @click="handleClick(scope.row)">
            <!-- acknowledge or enable or disable -->
            {{ actn }}
          </emqx-button>
        </template>
      </emqx-table-column>
    </emqx-table>
  </Container>
</template>

<script>
import moment from 'moment'
import { getData, postData } from '@/api/data'
import Container from '@/components/core/Container/index.vue'

export default {
  components: { Container },
  data() {
    return {
      minWidth: 100,
      action: '',
      options: [
        {
          val: 'act_en',
          label: 'Active enabled alarms',
        },
        {
          val: 'act_unack',
          label: 'Active Unack alarms',
        },
        {
          val: 'act_all',
          label: 'Active all alarms',
        },
        {
          val: 'all_alm',
          label: 'All alarms',
        },
        {
          val: 'all_en',
          label: 'All enabled alarms',
        },
        {
          val: 'all_dis',
          label: 'All disabled alarms',
        },
      ],
    }
  },
  computed: {
    grow() {
      return this.$store.state.Status.status.grow || []
    },
    actn() {
      let res = 'acknowledge'
      res = this.action === 'all_en' ? 'disable' : res
      res = this.action === 'all_dis' ? 'enable' : res
      return res
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  created() {
    this.action = 'act_en'
    this.handleChange()
  },
  methods: {
    handleClick(row) {
      if (this.action === 'all_alm') return
      postData(this.nodeId, {
        func: 80,
        alid: row.alid,
        actn: this.actn,
        wtrm: 'neruon',
      }).then(() => {
        // TODO:
      })
    },
    handleChange() {
      getData(this.nodeId, {
        func: 79,
        actn: this.action,
        wtrm: 'neruon',
      }).then(() => {
        // TODO:
      })
    },
    format(time) {
      return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss">
.el-select.emqx-select.dd-ml {
  width: auto;
}
</style>
