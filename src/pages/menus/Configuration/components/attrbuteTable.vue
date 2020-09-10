<template>
  <div class="attrbute-table">
    <vxe-table
      v-if="maxTableHeight"
      round
      show-overflow
      highlight-hover-row
      :max-height="maxTableHeight"
      :sort-config="{ trigger: 'cell' }"
      :data="data"
      @checkbox-all="handleSelectionChange"
      @checkbox-change="handleSelectionChange"
    >
      <vxe-table-column v-if="showBtn" type="checkbox" width="55"></vxe-table-column>
      <vxe-table-column field="attn" :min-width="80" :title="$t('common.name')" />
      <vxe-table-column :title="`Object: ${$t('configuration.address')}`" min-width="250">
        <template slot-scope="scope">
          <div>
            <div v-for="item in scope.row.aadd" class="addrs" :key="getFullName(item.pref, item.suff)">
              {{ getFullName(item.pref, item.suff) }}: &nbsp;
              {{ item.addr }}
            </div>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="attt" :width="minWidth" :title="$t('common.type')" />
      <vxe-table-column field="deci" :width="minWidth" title="Decimal" />
      <vxe-table-column field="adis" :width="minWidth" title="Visible">
        <template slot-scope="scope">
          {{ scope.row.adis ? 'YES' : 'NO' }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="achg" :width="minWidth" title="Change">
        <template slot-scope="scope">
          {{ scope.row.achg ? 'YES' : 'NO' }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="attr" :width="minWidth" title="RW" />
      <vxe-table-column field="rtim" :width="minWidth" title="Rtime" />
      <vxe-table-column :width="250" v-if="showBtn">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button type="text" @click="addAddress(scope.row)">{{ $t('configuration.addr') }}</el-button>
          <el-button type="text" @click="handleDummy(scope.row)">Dummy</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-pagination
      hide-on-single-page
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="page"
      :page-size.sync="pageSize"
      :page-sizes="[500, 800, 1000]"
      :total="count"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import paginate from '../../../../utils/paginate'
import Mixins from '@/mixins'
import { clone } from '@/utils'

export default {
  name: 'AttrbuteTable',
  mixins: [Mixins],
  props: {
    value: {
      type: Array,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    attributeList: {
      type: Array,
      required: true,
    },
    objectName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minWidth: '90',
      multipleSelection: [],
      data: [],
      count: 0,
      pageSize: 500,
      page: 1,
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData() {
      this.count = this.attributeList.length
      this.data = paginate(this.attributeList, this.pageSize, this.page)
    },
    handlePageChange(val) {
      this.page = val
      this.setData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.setData()
    },
    addAddress(row) {
      this.$emit('add', row)
    },
    handleSelectionChange({ checked, records }) {
      this.multipleSelection = records
      this.$emit('input', this.multipleSelection)
    },
    getFullName(pref, suff) {
      // eslint-disable-next-line no-param-reassign
      pref = pref ? pref + '_' : ''
      // eslint-disable-next-line no-param-reassign
      suff = suff ? '_' + suff : ''
      return pref + this.objectName + suff
    },
    handleEdit(row) {
      this.$emit('edit', clone(row))
    },
    handleDummy(row) {
      this.$emit('dummy', row)
    },
    handleDelete(row) {
      this.$emit('delete', clone(row))
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public.scss';

.addrs {
  border-bottom: 1px solid $color-border-main;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
</style>
