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
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  setup(props, ctx) {
    const minWidth = 80
    const tableData = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        ctx.emit('update:modelValue', val)
      },
    })
    return {
      minWidth,
      tableData,
    }
  },
})
</script>
