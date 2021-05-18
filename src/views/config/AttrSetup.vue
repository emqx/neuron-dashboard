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
          <emqx-button type="danger">{{ $t('common.delete') }}</emqx-button>
        </div>
      </h3>
    </div>
    <attr-table :data="tableData" show-btn @edit-attr="editAttr"></attr-table>
    <attr-dialog
      v-model="showAttrDialog"
      :object-size="objSize"
      :object-name="objName"
      :editing-attr="editingAttr"
    ></attr-dialog>
  </emqx-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import AttrTable from './components/AttrTable.vue'
import AttrDialog from './components/AttrDialog.vue'
import { useAttrSetup } from '@/composables/config/useConfig'
import { OattModel } from '@/types/neuron'

export default defineComponent({
  components: { AttrTable, AttrDialog },
  setup() {
    const { tableData, objSize, objName } = useAttrSetup()
    const showAttrDialog = ref(false)
    const editingAttr: Ref<undefined | OattModel> = ref(undefined)
    const createAttr = () => {
      editingAttr.value = undefined
      showAttrDialog.value = true
    }
    const editAttr = (attr: OattModel) => {
      editingAttr.value = attr
      showAttrDialog.value = true
    }
    return {
      tableData,
      objSize,
      objName,
      showAttrDialog,
      editingAttr,

      createAttr,
      editAttr,
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
  .handlers {
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
