<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="dd-title dd-mb">Agent Group</div>
    <el-table :data='tableData'
              style='width:100%;'>
      <el-table-column v-for='item in map'
                       :key='item.val'
                       :prop="item.val"
                       :min-width="item.minWidth"
                       :label="item.label" />
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
export default {
  mixins: [Mixins],
  data () {
    return {
      tableData: [],
      map: [
        {
          label: 'UUID',
          val: 'uuid',
          minWidth: '250'
        },
        {
          label: 'Report date',
          val: 'time',
          minWidth: '160'
        },
        {
          label: 'Expried data',
          val: 'expd',
          minWidth: '160'
        },
        {
          label: 'Remain time',
          val: 'rest',
          minWidth: '160'
        },
        {
          label: 'No. tags',
          val: 'natt',
          minWidth: '100'
        },
        {
          label: 'Total tags',
          val: 'tatt',
          minWidth: '120'
        },
        {
          label: 'Max tags',
          val: 'matt',
          minWidth: '120'
        },
        {
          label: 'No. alarms',
          val: 'nalr',
          minWidth: '120'
        },
        {
          label: 'Total alarms',
          val: 'talr',
          minWidth: '120'
        },
        {
          label: 'Max alarms',
          val: 'malr',
          minWidth: '120'
        },
        {
          label: 'Data usage',
          val: 'data',
          minWidth: '120'
        },
        {
          label: 'Total usage',
          val: 'tusg',
          minWidth: '120'
        },
        {
          label: 'Max usage',
          val: 'musg',
          minWidth: '120'
        },
        {
          label: 'S',
          val: 'self'
        },
        {
          label: 'N',
          val: 'mast'
        }
      ]
    }
  },
  methods: {
    setData (data) {
      if (data.func === 73) {
        this.tableData = data.agts
      }
    }
  },
  mounted () {
    this.$ws().set({ success: this.setData }).send({ func: 73 })
  }
}
</script>

<style scoped lang="scss">
</style>
