<template>
  <vxe-table
    v-if="maxTableHeight"
    class="attr-table"
    ref="table"
    round
    show-overflow
    highlight-hover-row
    :max-height="maxTableHeight"
    :sort-config="{ trigger: 'cell' }"
    :data="data"
    :empty-text="$t('common.emptyData')"
  >
    <vxe-table-column v-if="showBtn" type="checkbox" width="55"></vxe-table-column>
    <vxe-table-column field="attn" :min-width="80" :title="$t('common.name')" />
    <vxe-table-column :title="`Object: ${$t('config.address')}`" min-width="250">
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
        <emqx-button type="text" @click="editAttr(scope.row)">{{ $t('common.edit') }}</emqx-button>
        <emqx-button type="text" @click="editAddress(scope.row)">{{ $t('config.addr') }}</emqx-button>
        <emqx-button type="text" @click="handleDummy(scope.row)">Dummy</emqx-button>
        <el-popconfirm :title="$t('common.confirmDelete')" @confirm="delAttr(scope.row)">
          <template #reference>
            <emqx-button type="text">{{ $t('common.delete') }}</emqx-button>
          </template>
        </el-popconfirm>
      </template>
    </vxe-table-column>
    <template #empty>
      <div>
        {{ $t('common.emptyData') }}
      </div>
    </template>
  </vxe-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useMaxHeight from '@/composables/useMaxHeight'
import { OattModel } from '@/types/neuron'
import { ElPopconfirm } from 'element-plus'

export default defineComponent({
  components: {
    ElPopconfirm,
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['edit-attr', 'edit-addr', 'del-attr', 'on-dummy'],
  setup(props, ctx) {
    const { maxTableHeight } = useMaxHeight()
    const minWidth = 90
    const table = ref()
    const getFullName = () => {
      //
    }
    const editAttr = (attr: OattModel) => {
      ctx.emit('edit-attr', attr)
    }
    const editAddress = (attr: OattModel) => {
      ctx.emit('edit-addr', attr)
    }
    const handleDummy = (attr: OattModel) => {
      ctx.emit('on-dummy', attr)
    }
    const delAttr = (attr: OattModel) => {
      ctx.emit('del-attr', attr)
    }
    const getCheckedItems = () => {
      return table.value.getCheckboxRecords()
    }

    return {
      maxTableHeight,
      minWidth,
      table,

      getFullName,
      editAttr,
      editAddress,
      handleDummy,
      delAttr,
      getCheckedItems,
    }
  },
})
</script>

<style lang="scss">
.attr-table {
  .addrs {
    border-bottom: 1px solid #ebeef5;
    padding: 5px;
  }
  &.vxe-table .vxe-header--column.col--ellipsis > .vxe-cell,
  &.vxe-table .vxe-body--column.col--ellipsis > .vxe-cell,
  &.vxe-table .vxe-footer--column.col--ellipsis > .vxe-cell {
    max-height: unset;
  }
}
</style>
