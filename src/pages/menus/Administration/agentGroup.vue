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
          minWidth: '300'
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
          label: 'no. tags',
          val: 'natt',
          minWidth: '100'
        },
        {
          label: 'total tags',
          val: 'tatt',
          minWidth: '100'
        },
        {
          label: 'max tags',
          val: 'matt',
          minWidth: '100'
        },
        {
          label: 'no. alarms',
          val: 'nalr',
          minWidth: '100'
        },
        {
          label: 'total alarms',
          val: 'talr',
          minWidth: '100'
        },
        {
          label: 'max alarms',
          val: 'malr',
          minWidth: '100'
        },
        {
          label: 'data usage',
          val: 'data',
          minWidth: '120'
        },
        {
          label: 'total usage',
          val: 'tusg',
          minWidth: '120'
        },
        {
          label: 'max usage',
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
