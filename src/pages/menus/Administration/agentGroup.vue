<template>
  <Container type="card-full" :scorll="false">
    <div class="dd-title dd-mb">{{ $t('administration.agentGroup') }}</div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        v-for="item in map"
        :key="item.val"
        :prop="item.val"
        :min-width="item.minWidth"
        :label="item.label"
      />
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
export default {
  mixins: [Mixins],
  data() {
    return {
      tableData: [],
      map: [
        {
          label: this.$t('administration.uuid'),
          val: 'uuid',
          minWidth: '250',
        },
        {
          label: this.$t('administration.reportDate'),
          val: 'time',
          minWidth: '160',
        },
        {
          label: this.$t('administration.expriedDate'),
          val: 'expd',
          minWidth: '160',
        },
        {
          label: this.$t('administration.remainTime'),
          val: 'rest',
          minWidth: '160',
        },
        {
          label: this.$t('administration.noTags'),
          val: 'natt',
          minWidth: '100',
        },
        {
          label: this.$t('administration.totalTags'),
          val: 'tatt',
          minWidth: '120',
        },
        {
          label: this.$t('administration.maxTags'),
          val: 'matt',
          minWidth: '120',
        },
        {
          label: this.$t('administration.noAlarms'),
          val: 'nalr',
          minWidth: '120',
        },
        {
          label: this.$t('administration.totalAlarms'),
          val: 'talr',
          minWidth: '120',
        },
        {
          label: this.$t('administration.maxAlarms'),
          val: 'malr',
          minWidth: '120',
        },
        {
          label: this.$t('administration.dataUsage'),
          val: 'data',
          minWidth: '120',
        },
        {
          label: this.$t('administration.totalUsage'),
          val: 'tusg',
          minWidth: '120',
        },
        {
          label: this.$t('administration.maxUsage'),
          val: 'musg',
          minWidth: '120',
        },
        {
          label: 'S',
          val: 'self',
        },
        {
          label: 'N',
          val: 'mast',
        },
      ],
    }
  },
  methods: {
    setData(data) {
      if (data.func === 73) {
        this.tableData = data.agts
      }
    },
  },
  mounted() {
    this.$ws().set({ success: this.setData }).send({ func: 73 })
  },
}
</script>

<style scoped lang="scss"></style>
