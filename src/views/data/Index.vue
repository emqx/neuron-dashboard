<template>
  <div class="data">
    <emqx-card>
      <h3 class="card-title">{{ $t('data.dataMonitoring') }}</h3>
      <emqx-row class="obj-name-select">
        <emqx-col :span="8">
          <emqx-select v-model="objName" :placeholder="$t('data.objName')">
            <emqx-option v-for="item in objList" :key="item" :label="item" :value="item"> </emqx-option>
          </emqx-select>
        </emqx-col>
      </emqx-row>
      <vxe-table
        v-if="maxTableHeight"
        round
        show-overflow
        highlight-hover-row
        class="table-with-pagination"
        :max-height="maxTableHeight"
        :sort-config="{ trigger: 'cell' }"
        :data="data"
      >
        <vxe-table-column width="55">
          <template #header>
            <emqx-checkbox @change="handleCheckAll"></emqx-checkbox>
          </template>
          <template #default="scope">
            <emqx-checkbox
              v-model="scope.row.checked"
              v-if="scope.row.prop !== 'Time'"
              @change="handleCheck($event, scope.row)"
            ></emqx-checkbox>
          </template>
        </vxe-table-column>
        <vxe-table-column field="prop" :title="$t('data.attribute')" min-width="180"> </vxe-table-column>
        <vxe-table-column field="val" :title="$t('data.value')" min-width="180"> </vxe-table-column>
        <vxe-table-column width="300">
          <template #default="scope">
            <div class="btn" v-if="scope.row.prop !== 'Time'">
              <emqx-button type="text" v-if="scope.row.writable" @click="handleWrite(scope.row)">{{
                $t('data.write')
              }}</emqx-button>
              <emqx-button type="text" @click="handleShow(scope.row, 'History')">{{ $t('data.history') }}</emqx-button>
              <emqx-button type="text" @click="handleShow(scope.row, 'Current')">{{ $t('data.current') }}</emqx-button>
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
      <div class="pagination-container">
        <emqx-pagination
          v-if="data.length"
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          v-model:current-page="pageNum"
        >
        </emqx-pagination>
      </div>
    </emqx-card>
  </div>
</template>

<script lang="ts">
import useWebsocket from '@/plugins/ws/useWebsocket'
import useTeleData from '@/composables/useTeleData'
import useMaxHeight from '@/composables/useMaxHeight'
import usePagination from '@/composables/usePagination'
import { TeleData } from '@/types/neuron'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Data',
  setup() {
    const data = ref([])
    const objName = ref('')
    const objList = ref([])
    const { pageNum, pageSize, total } = usePagination()
    const { ws } = useWebsocket()
    const { maxTableHeight } = useMaxHeight()
    const setTeleData = (data: TeleData) => {
      if (!data.func && data.tele) {
        useTeleData(data.tele)
      }
    }
    ws().test().set({
      success: setTeleData,
    })
    const handleCheck = () => ({})
    const handleCheckAll = () => ({})
    return {
      data,
      objName,
      pageNum,
      pageSize,
      total,
      objList,
      handleCheck,
      handleCheckAll,
      maxTableHeight,
    }
  },
})
</script>

<style lang="scss">
.data {
  .obj-name-select {
    margin-bottom: 24px;
  }
}
</style>
