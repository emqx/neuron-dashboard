<template>
  <emqx-table :data="objectList" @selection-change="handleSelectionChange" style="width: 100%">
    <emqx-table-column type="expand" v-if="showAttr">
      <template v-slot="props">
        <AttributeTable
          :class="showAttr ? 'attribute-table--overview' : ''"
          :attributeList="props.row.oatt || []"
          :objectName="props.row.objn || ''"
        />
      </template>
    </emqx-table-column>
    <emqx-table-column v-if="showSelection" type="selection" width="55"> </emqx-table-column>
    <emqx-table-column type="index" width="100" label="No" />
    <emqx-table-column prop="objn" :label="$t('status.objectName')" min-width="230" />
    <emqx-table-column prop="obsz" :min-width="100" label="Size" />
    <emqx-table-column prop="updt" :min-width="110" label="Update Time" />
    <emqx-table-column prop="logt" :min-width="110" label="Log Time" />
    <emqx-table-column prop="tstd" :min-width="100" label="Timestamp" :align="showBtn ? 'left' : 'right'">
      <template v-slot="scope">
        {{ scope.row.tstd ? 'YES' : 'NO' }}
      </template>
    </emqx-table-column>
    <emqx-table-column :width="200" v-if="showBtn" align="right">
      <template v-slot="scope">
        <emqx-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</emqx-button>
        <emqx-button type="text" @click="goToAttrPage(scope.row)">{{ $t('status.attribute') }}</emqx-button>
        <emqx-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</emqx-button>
      </template>
    </emqx-table-column>
  </emqx-table>
</template>

<script>
import { mapState } from 'vuex'
import { clone } from '@/utils'
import AttributeTable from './attributeTable'

export default {
  props: {
    modelValue: {
      type: Array,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    showAttr: {
      type: Boolean,
      default: false,
    },
    showSelection: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      objectList: state => state.SetUpData.objectData,
    }),
  },
  data() {
    return {
      minWidth: '100px',
      multipleSelection: [],
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    goToAttrPage(row) {
      this.$router.push({ name: 'Configuration-attributeSetup', params: { data: row.objn } })
    },
    handleEdit(row) {
      this.$emit('edit', clone(row))
    },
    handleDelete(row) {
      this.$emit('delete', clone(row))
    },
  },
  watch: {
    modelValue(val) {
      this.multipleSelection = val
    },
  },
  components: {
    AttributeTable,
  },
}
</script>

<style scoped lang="scss"></style>
