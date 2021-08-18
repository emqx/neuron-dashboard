<template>
  <div class="attribute-table">
    <vxe-table
      v-if="maxTableHeight"
      round
      show-overflow
      highlight-hover-row
      :max-height="maxTableHeight"
      :sort-config="{ trigger: 'cell' }"
      :data="data"
      :empty-text="$t('common.emptyData')"
      @checkbox-all="handleSelectionChange"
      @checkbox-change="handleSelectionChange"
    >
      <vxe-table-column v-if="showBtn" type="checkbox" width="55"></vxe-table-column>
      <vxe-table-column field="attn" :min-width="80" :title="$t('common.name')" />
      <vxe-table-column :title="`Object: ${$t('configuration.address')}`" min-width="250">
        <template v-slot="scope">
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
        <template v-slot="scope">
          {{ scope.row.adis ? 'YES' : 'NO' }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="achg" :width="minWidth" title="Change">
        <template v-slot="scope">
          {{ scope.row.achg ? 'YES' : 'NO' }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="attr" :width="minWidth" title="RW" />
      <vxe-table-column field="rtim" :width="minWidth" title="Rtime" />
      <vxe-table-column :width="250" v-if="showBtn">
        <template v-slot="scope">
          <emqx-button type="text" @click="handleEdit(scope.row)">{{ $t('common.edit') }}</emqx-button>
          <emqx-button type="text" @click="addAddress(scope.row)">{{ $t('configuration.addr') }}</emqx-button>
          <emqx-button type="text" @click="handleDummy(scope.row)">Dummy</emqx-button>
          <emqx-button type="text" @click="handleDelete(scope.row)">{{ $t('common.delete') }}</emqx-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <emqx-pagination
      hide-on-single-page
      background
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="page"
      v-model:page-size="pageSize"
      :page-sizes="[500, 800, 1000]"
      :total="count"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    >
    </emqx-pagination>
  </div>
</template>

<script>
import Mixins from '@/mixins'
import { clone } from '@/utils'
import paginate from '../../../../utils/paginate'

export default {
  name: 'AttributeTable',
  mixins: [Mixins],
  props: {
    modelValue: {
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
      type: [String],
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
    handleSelectionChange({ records }) {
      this.multipleSelection = records
      this.$emit('input', this.multipleSelection)
    },
    getFullName(pref, suff) {
      // eslint-disable-next-line no-param-reassign
      pref = pref ? `${pref}_` : ''
      // eslint-disable-next-line no-param-reassign
      suff = suff ? `_${suff}` : ''
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

<style lang="scss">
@import '@/assets/style/public.scss';
.attribute-table .vxe-cell {
  max-height: fit-content !important;
}
.attribute-table--overview {
  .vxe-header--column {
    background-color: #414756;
    padding: 0px !important;
    .vxe-cell--title {
      color: #96999c;
    }
  }
}
.addrs {
  border-bottom: 1px solid $color-border-main;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
</style>
