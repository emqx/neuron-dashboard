<template>
  <emqx-card class="current-alarms">
    <h3 class="card-title">{{ $t('alarm.currentAlarms') }}</h3>
    <emqx-row class="card-oper">
      <emqx-col :span="8">
        <emqx-select v-model="action">
          <emqx-option v-for="item in options" :key="item.val" :label="item.label" :value="item.val"> </emqx-option>
        </emqx-select>
      </emqx-col>
    </emqx-row>
    <emqx-table :data="[]">
      <emqx-table-column min-width="130" prop="atim" :label="$t('common.time')">
        <template #default="scope">
          {{ formatTime(scope.row.atim || '') }}
        </template>
      </emqx-table-column>
      <emqx-table-column min-width="60" prop="acat" :label="$t('alarm.category')" />
      <emqx-table-column prop="astt" :label="$t('alarm.state')" min-width="50" />
      <emqx-table-column prop="amod" :label="$t('alarm.remark')" min-width="50" />
      <emqx-table-column min-width="100" prop="comt" :label="$t('alarm.comment')"> </emqx-table-column>
    </emqx-table>
  </emqx-card>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import useFunc from '@/composables/useFunc'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { formatTime } from '@/utils/time'

export default defineComponent({
  name: 'CurrentAlarms',
  setup() {
    const action = ref('act_en')
    const options = ref([
      {
        val: 'act_en',
        label: 'Active enabled alarms',
      },
      {
        val: 'act_unack',
        label: 'Active Unack alarms',
      },
      {
        val: 'act_all',
        label: 'Active all alarms',
      },
      {
        val: 'all_alm',
        label: 'All alarms',
      },
      {
        val: 'all_en',
        label: 'All enabled alarms',
      },
      {
        val: 'all_dis',
        label: 'All disabled alarms',
      },
    ])
    const showAlarms = useFunc('showAlarms')
    const { ws } = useWebsocket()
    const handleChange = () => {
      ws().send({
        func: showAlarms,
        actn: action.value,
      })
    }
    handleChange()
    return {
      action,
      options,
      handleChange,
      formatTime,
    }
  },
})
</script>
