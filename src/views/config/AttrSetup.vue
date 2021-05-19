<template>
  <emqx-card class="attr-setup">
    <div class="attr-setup-hd">
      <h3 class="card-title">
        <emqx-breadcrumb separator-class="el-icon-arrow-right">
          <emqx-breadcrumb-item :to="{ name: 'Configuration' }">
            {{ $t('config.objectSetup') }}
          </emqx-breadcrumb-item>
          <emqx-breadcrumb-item>
            {{ $t('config.attributeSetup') }}
          </emqx-breadcrumb-item>
        </emqx-breadcrumb>
        <div class="handlers">
          <emqx-button type="primary" @click="createAttr">{{ $t('common.create') }}</emqx-button>
          <!-- <emqx-button :disabled="!multipleSelection.length" type="danger">{{ $t('common.delete') }}</emqx-button> -->
          <emqx-button type="danger" @click="batchDeleteAttr">{{ $t('common.delete') }}</emqx-button>
        </div>
      </h3>
    </div>
    <attr-table
      show-btn
      ref="attrTable"
      :data="tableData"
      @edit-attr="editAttr"
      @edit-addr="editAddr"
      @del-attr="deleteAttr"
    ></attr-table>

    <attr-dialog
      v-model="showAttrDialog"
      :object-size="objSize"
      :object-name="objName"
      :editing-attr="editingAttr"
    ></attr-dialog>
    <addr-dialog
      v-model="showAddrDialog"
      :object-name="objName"
      :attr="editingAttr"
      :address-arr="editingAddressArr"
    ></addr-dialog>
  </emqx-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import AttrTable from './components/AttrTable.vue'
import AttrDialog from './components/AttrDialog.vue'
import AddrDialog from './components/AddrDialog.vue'
import { ElMessageBox } from 'element-plus'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useAttrSetup } from '@/composables/config/useConfig'
import { useI18n } from 'vue-i18n'
import useAPI from '@/composables/useAPI'
import { AaddModel, OattModel } from '@/types/neuron'

export default defineComponent({
  components: { AttrTable, AttrDialog, AddrDialog },
  setup() {
    const { tableData, objSize, objName } = useAttrSetup()
    const showAttrDialog = ref(false)
    const showAddrDialog = ref(false)
    const editingAttr: Ref<undefined | OattModel> = ref(undefined)
    const editingAddressArr: Ref<Array<AaddModel>> = ref([])
    const attrTable = ref()
    const { delAttr, batchDelAttr } = useAPI()
    const { t } = useI18n()
    const createAttr = () => {
      editingAttr.value = undefined
      showAttrDialog.value = true
    }
    const editAttr = (attr: OattModel) => {
      editingAttr.value = attr
      showAttrDialog.value = true
    }
    const editAddr = (attr: OattModel) => {
      editingAttr.value = attr
      editingAddressArr.value = attr.aadd
      showAddrDialog.value = true
    }
    const deleteAttr = (attr: OattModel) => {
      delAttr(attr.attn, objName.value)
    }
    const batchDeleteAttr = async () => {
      let checkedItems: Array<OattModel> = attrTable.value.getCheckedItems()
      if (!checkedItems.length) {
        EmqxMessage.warning(t('common.batchDeleteError'))
        return
      }
      await ElMessageBox.confirm(t('common.confirmDelete'), t('common.delete'))
      batchDelAttr(
        checkedItems.map(({ attn }) => attn),
        objName.value,
      )
    }

    return {
      tableData,
      objSize,
      objName,
      showAttrDialog,
      showAddrDialog,
      editingAttr,
      editingAddressArr,
      attrTable,

      createAttr,
      editAttr,
      editAddr,
      deleteAttr,
      batchDeleteAttr,
    }
  },
})
</script>

<style lang="scss">
.attr-setup {
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .emqx-breadcrumb {
    font-size: inherit;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: inherit;
    font-weight: inherit;
  }
}
</style>
