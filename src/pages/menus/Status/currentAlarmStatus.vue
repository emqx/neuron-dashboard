<template>
  <Container type="card-full" :scorll="false">
    <div class="dd-mb">
      <span class="dd-title">{{ $t('status.currentAlarm') }}</span>
      <el-select v-model="action" @change="handleChange" class="dd-ml">
        <el-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val"> </el-option>
      </el-select>
    </div>
    <el-table :data="grow" style="width: 100%;">
      <el-table-column min-width="130" prop="atim" :label="$t('status.time')">
        <template slot-scope="scope">
          {{ format(scope.row.atim || '') }}
        </template>
      </el-table-column>
      <el-table-column min-width="60" prop="acat" :label="$t('status.category')" />
      <el-table-column prop="astt" :label="$t('status.state')" min-width="50" />
      <el-table-column prop="amod" :label="$t('status.remark')" min-width="50" />
      <el-table-column min-width="100" prop="comt" :label="$t('status.comment')"> </el-table-column>
      <el-table-column min-width="100" label="">
        <template slot-scope="scope">
          <el-button v-if="actn !== 'acknowledge'" type="text" @click="handleClick(scope.row)">
            <!-- acknowledge or enable or disable -->
            {{ actnLabel }}
          </el-button>
          <el-button v-else-if="scope.row.amod === 'UNACKALARM'" type="text" @click="handleClick(scope.row)">
            <!-- acknowledge or enable or disable -->
            {{ actnLabel }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import formatDate from '@/utils/formatDate'

export default {
  mixins: [Mixins],
  data() {
    return {
      minWidth: 100,
      action: '',
      options: [
        {
          val: 'act_en',
          label: this.$t('status.activeEnabledAlarms'),
        },
        {
          val: 'act_unack',
          label: this.$t('status.activeUnackAlarms'),
        },
        {
          val: 'act_all',
          label: this.$t('status.activeAllAlarms'),
        },
        {
          val: 'all_alm',
          label: this.$t('status.allAlarms'),
        },
        {
          val: 'all_en',
          label: this.$t('status.allEnabledAlarms'),
        },
        {
          val: 'all_dis',
          label: this.$t('status.allDisabledAlarms'),
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
    actnLabel() {
      return this.$t(`status.${this.actn}`)
    },
  },
  created() {
    this.action = 'act_en'
    this.handleChange()
  },
  methods: {
    handleClick(row) {
      if (this.action === 'all_alm') return
      this.$ws().send({
        func: 80,
        alid: row.alid,
        actn: this.actn,
      })
    },
    handleChange() {
      this.$ws().send({
        func: 79,
        actn: this.action,
      })
    },
    format: formatDate,
  },
}
</script>

<style lang="scss" scoped></style>
