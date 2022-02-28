<template>
  <el-table :data="eventList" @selection-change="handleSelectionChange" style="width: 100%;">
    <el-table-column type="selection" v-if="showBtn" width="55" />
    <el-table-column :min-width="minWidth" prop="sobj" :label="`${$t('configuration.object')} 1`" />
    <el-table-column prop="satt" :label="`${$t('configuration.attribute')} 1`" :min-width="minWidth" />
    <el-table-column prop="msgt" :min-width="minWidth" :label="$t('common.type')" />
    <el-table-column prop="cobj" :min-width="minWidth" :label="`${$t('configuration.object')} 2`" />
    <el-table-column prop="catt" :min-width="minWidth" :label="`${$t('configuration.attribute')} 2`" />
    <el-table-column prop="acat" :min-width="minWidth" :label="$t('status.category')" />
    <el-table-column prop="subr" :min-width="minWidth" :label="$t('configuration.subroutine')" />
    <el-table-column :width="160" v-if="showBtn">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.row, scope.$index)">{{ $t('common.edit') }}</el-button>
        <el-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Mixins from '@/mixins'
import { clone } from '@/utils/index'

export default {
  mixins: [Mixins],
  props: {
    value: {
      type: Array,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    eventList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      minWidth: '120',
      multipleSelection: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    handleDelete(row) {
      this.$emit('delete', row)
    },
    handleEdit(row, index) {
      this.$emit('edit', clone(row), index)
    },
  },
  watch: {
    value(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style scoped lang="scss"></style>
