<template>
  <el-table :data='eventList'
            @selection-change="handleSelectionChange"
            style="width: 100%">
    <el-table-column type="selection"
                     v-if='showBtn'
                     width="55" />
    <el-table-column :min-width="minWidth"
                     prop="sobj"
                     label="Object1" />
    <el-table-column prop="satt"
                     label="Attribute1"
                     :min-width="minWidth" />
    <el-table-column prop="msgt"
                     :min-width="minWidth"
                     label="Type" />
    <el-table-column prop="cobj"
                     :min-width="minWidth"
                     label="Object2" />
    <el-table-column prop="catt"
                     :min-width="minWidth"
                     label="Attribute2" />
    <el-table-column prop="acat"
                     :min-width="minWidth"
                     label="Category" />
    <el-table-column prop="subr"
                     :min-width="minWidth"
                     label="Subroutine" />
     <el-table-column :width="100"
                     v-if="showBtn">
        <template slot-scope="scope">
          <el-button type="text"
                    @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
  </el-table>
</template>

<script>
import Mixins from '@/mixins'

export default {
  mixins: [Mixins],
  props: {
    value: {
      type: Array
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    eventList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      minWidth: '120',
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    handleDelete (row) {
      this.$emit('delete', row)
    }
  },
  watch: {
    value (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="scss">
</style>
