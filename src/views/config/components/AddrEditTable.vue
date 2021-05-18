<template>
  <emqx-table :data="tableData">
    <emqx-table-column label="Index" :width="minWidth">
      <template #default="scope">
        {{ scope.row.obix + 1 }}
      </template>
    </emqx-table-column>
    <emqx-table-column :label="$t('common.description')" prop="suff">
      <template #default="scope">
        <emqx-input v-model="scope.row.desc" size="mini" />
      </template>
    </emqx-table-column>
    <emqx-table-column :label="$t('config.address')">
      <template #default="scope">
        <emqx-input v-model="scope.row.addr" size="mini" />
      </template>
    </emqx-table-column>
  </emqx-table>
</template>

<script lang="ts">
import { AaddModel } from '@/types/neuron'
import { computed, defineComponent } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const minWidth = 80
    const { t } = useI18n()
    const tableData = computed({
      get: () => {
        return props.modelValue as Array<AaddModel>
      },
      set: (val) => {
        ctx.emit('update:modelValue', val)
      },
    })
    const checkForm = () => {
      let checkResult = tableData.value.every(({ addr }: AaddModel) => !!addr)
      if (!checkResult) {
        EmqxMessage.warning(t('config.addressRequired'))
      }
      return checkResult
    }

    return {
      minWidth,
      tableData,
      checkForm,
    }
  },
})
</script>
