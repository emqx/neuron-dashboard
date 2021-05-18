<template>
  <el-dialog v-model="showDialog" :title="$t('config.dataAddrSetup')" custom-class="addr-dialog">
    <addr-edit-table v-model="tableData" ref="table"></addr-edit-table>
    <template #footer>
      <emqx-button type="primary" @click="submit">{{ $t('common.submit') }}</emqx-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue'
import { ElDialog } from 'element-plus'
import AddrEditTable from './AddrEditTable.vue'
import { AaddModel, OattModel } from '@/types/neuron'
import { cloneDeep } from 'lodash'
import useAPI from '@/composables/useAPI'

export default defineComponent({
  components: { ElDialog, AddrEditTable },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    addressArr: {
      type: Array,
      default: () => [],
    },
    objectName: {
      type: String,
      required: true,
    },
    attr: {
      type: Object,
    },
  },
  setup(props, ctx) {
    const table = ref()
    const tableData: Ref<Array<AaddModel>> = ref([])
    const showDialog = computed({
      get: () => props.modelValue,
      set: (val) => {
        ctx.emit('update:modelValue', val)
      },
    })
    watch(showDialog, (val) => {
      if (val) {
        tableData.value = cloneDeep(props.addressArr as Array<AaddModel>)
      }
    })
    const { updateAttr } = useAPI()
    const submit = () => {
      if (!table.value.checkForm()) {
        return
      }
      let attr = cloneDeep(props.attr as OattModel)
      attr.aadd = tableData.value
      updateAttr(attr, props.objectName)
      showDialog.value = false
    }

    return {
      table,
      showDialog,
      tableData,
      submit,
    }
  },
})
</script>
