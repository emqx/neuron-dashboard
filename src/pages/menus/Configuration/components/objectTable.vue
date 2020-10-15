<template>
  <el-table :data="objectList" @selection-change="handleSelectionChange" style="width: 100%;">
    <el-table-column type="expand" v-if="showAttr">
      <template slot-scope="props">
        <AttributeTable
          :class="showAttr ? 'attribute-table--overview' : ''"
          :attributeList="props.row.oatt || []"
          :objectName="props.row.objn"
        />
      </template>
    </el-table-column>
    <el-table-column v-if="showSelection" type="selection" width="55"> </el-table-column>
    <el-table-column type="index" width="100" label="No" />
    <el-table-column prop="objn" :label="$t('status.objectName')" min-width="250" />
    <el-table-column prop="obsz" :min-width="100" label="Size" />
    <el-table-column prop="updt" :min-width="100" label="Update Time" />
    <el-table-column prop="logt" :min-width="100" label="Log Time" />
    <el-table-column prop="tstd" :min-width="100" label="Timestamp">
      <template slot-scope="scope">
        {{ scope.row.tstd ? 'YES' : 'NO' }}
      </template>
    </el-table-column>
    <el-table-column :width="200" v-if="showBtn">
      <template slot-scope="scope">
        <el-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
        <el-button type="text" @click="goToAttrPage(scope.row)">{{ $t('status.attribute') }}</el-button>
        <el-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Mixins from '@/mixins'
import { mapState } from 'vuex'
import AttributeTable from './attributeTable'
import { clone } from '@/utils'

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
      objectList: (state) => state.SetUpData.objectData,
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
    value(val) {
      this.multipleSelection = val
    },
  },
  components: {
    AttributeTable,
  },
}
</script>

<style scoped lang="scss"></style>
