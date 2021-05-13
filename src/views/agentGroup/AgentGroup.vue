<template>
  <emqx-card class="agent-group">
    <h3 class="card-title">{{ $t('group.group') }}</h3>
    <emqx-table :data="tableData">
      <emqx-table-column
        v-for="item in map"
        :key="item.val"
        :prop="item.val"
        :min-width="item.minWidth"
        :label="item.label"
      />
    </emqx-table>
  </emqx-card>
</template>

<script lang="ts">
import useFunc from '@/composables/useFunc'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { InstanceInfoData, InstanceInfoModel } from '@/types/neuron'
import { defineComponent, onMounted, Ref, ref } from 'vue'

export default defineComponent({
  name: 'AgentGroup',
  setup() {
    const map = [
      {
        label: 'UUID',
        val: 'uuid',
        minWidth: '250',
      },
      {
        label: 'Report date',
        val: 'time',
        minWidth: '160',
      },
      {
        label: 'Expried data',
        val: 'expd',
        minWidth: '160',
      },
      {
        label: 'Remain time',
        val: 'rest',
        minWidth: '160',
      },
      {
        label: 'No. tags',
        val: 'natt',
        minWidth: '100',
      },
      {
        label: 'Total tags',
        val: 'tatt',
        minWidth: '120',
      },
      {
        label: 'Max tags',
        val: 'matt',
        minWidth: '120',
      },
      {
        label: 'No. alarms',
        val: 'nalr',
        minWidth: '120',
      },
      {
        label: 'Total alarms',
        val: 'talr',
        minWidth: '120',
      },
      {
        label: 'Max alarms',
        val: 'malr',
        minWidth: '120',
      },
      {
        label: 'Data usage',
        val: 'data',
        minWidth: '120',
      },
      {
        label: 'Total usage',
        val: 'tusg',
        minWidth: '120',
      },
      {
        label: 'Max usage',
        val: 'musg',
        minWidth: '120',
      },
      {
        label: 'S',
        val: 'self',
      },
      {
        label: 'N',
        val: 'mast',
      },
    ]
    const tableData: Ref<InstanceInfoModel[]> = ref([])
    const instanceInformation = useFunc('instanceInformation')
    const { ws } = useWebsocket()
    const setData = (data: InstanceInfoData) => {
      if (data.func === instanceInformation) {
        tableData.value = data.agts
      }
    }
    onMounted(() => {
      ws().set({ success: setData }).send({
        func: instanceInformation,
      })
    })
    return {
      map,
      tableData,
    }
  },
})
</script>
