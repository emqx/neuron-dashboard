<template>
  <emqx-table :data="eventList" @selection-change="handleSelectionChange" style="width: 100%">
    <emqx-table-column type="selection" v-if="showBtn" width="55" />
    <emqx-table-column :min-width="minWidth" prop="sobj" label="Object1" />
    <emqx-table-column prop="satt" label="Attribute1" :min-width="minWidth" />
    <emqx-table-column prop="msgt" :min-width="minWidth" :label="$t('common.type')" />
    <emqx-table-column prop="cobj" :min-width="minWidth" label="Object2" />
    <emqx-table-column prop="catt" :min-width="minWidth" label="Attribute2" />
    <emqx-table-column prop="acat" :min-width="minWidth" :label="$t('status.category')" />
    <emqx-table-column
      prop="subr"
      :min-width="minWidth"
      :label="$t('configuration.subroutine')"
      :align="showBtn ? 'left' : 'right'"
    />
    <emqx-table-column :width="160" v-if="showBtn" align="right">
      <template v-slot="scope">
        <emqx-button type="text" @click="handleEdit(scope.row, scope.$index)">{{ $t('common.edit') }}</emqx-button>
        <emqx-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</emqx-button>
      </template>
    </emqx-table-column>
  </emqx-table>
</template>

<script>
import { clone } from '@/utils/index'

export default {
  props: {
    modelValue: {
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
    modelValue(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style scoped lang="scss"></style>
