<template>
  <div class="attrbute-table">
    <el-table
      v-if="maxTableHeight"
      :data="data"
      @selection-change="handleSelectionChange"
      style="width: 100%;"
      :max-height="maxTableHeight"
    >
      <el-table-column type="selection" v-if="showBtn" width="55"> </el-table-column>
      <el-table-column prop="attn" :min-width="80" :label="$t('common.name')" />
      <el-table-column :label="`Object: ${$t('configuration.address')}`" min-width="250">
        <template slot-scope="scope">
          <div>
            <div v-for="item in scope.row.aadd" class="addrs" :key="getFullName(item.pref, item.suff)">
              {{ getFullName(item.pref, item.suff) }}: &nbsp;
              {{ item.addr }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="attt" :width="minWidth" :label="$t('common.type')" />
      <el-table-column prop="deci" :width="minWidth" label="Decimal" />
      <el-table-column prop="adis" :width="minWidth" label="Visible">
        <template slot-scope="scope">
          {{ scope.row.adis ? 'YES' : 'NO' }}
        </template>
      </el-table-column>
      <el-table-column prop="achg" :width="minWidth" label="Change">
        <template slot-scope="scope">
          {{ scope.row.achg ? 'YES' : 'NO' }}
        </template>
      </el-table-column>
      <el-table-column prop="attr" :width="minWidth" label="RW" />
      <el-table-column prop="rtim" :width="minWidth" label="Rtime" />
      <el-table-column :width="250" v-if="showBtn">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button type="text" @click="addAddress(scope.row)">{{ $t('configuration.addr') }}</el-button>
          <el-button type="text" @click="handleDummy(scope.row)">Dummy</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      hide-on-single-page
      background
      layout="sizes, prev, pager, next"
      :current-page.sync="page"
      :page-size.sync="pageSize"
      :page-sizes="[100, 300, 500]"
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
      pageSize: 100,
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
    handleSelectionChange(val) {
      this.multipleSelection = val
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
  watch: {
    value(val) {
      this.multipleSelection = val
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
