<template>
  <div class="data">
    <emqx-card>
      <h3 class="card-title">{{ $t('data.dataMonitoring') }}</h3>
      <emqx-row class="card-oper">
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
        <vxe-table-column field="val" :title="$t('data.value')" min-width="180">
          <template #default="scope">
            {{ scope.row.prop === 'Time' ? formatTime(scope.row.val) : scope.row.val }}
          </template>
        </vxe-table-column>
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
import { computed, defineComponent, onUnmounted, Ref, ref, watch } from 'vue'
import dayjs from 'dayjs'
import useWebsocket from '@/plugins/ws/useWebsocket'
import useTeleData from '@/composables/data/useTeleData'
import useMaxHeight from '@/composables/useMaxHeight'
import usePagination from '@/composables/usePagination'
import { ObjdModel, TeleData } from '@/types/neuron'
import { useStore } from 'vuex'
import useFunc from '@/composables/useFunc'
import { DataRow } from '@/composables/data/data'

export default defineComponent({
  name: 'Data',
  setup() {
    const data: Ref<DataRow[]> = ref([])
    const objName = ref('')
    const store = useStore()
    const { pageNum, pageSize, total } = usePagination()
    const { ws } = useWebsocket()
    const { maxTableHeight } = useMaxHeight()
    const setTeleData = (res: TeleData) => {
      if (!res.func && res.tele) {
        const { tableData } = useTeleData(res.tele)
        data.value = tableData.value
      }
    }
    const objList = computed(() => {
      const { objd }: { objd: ObjdModel[] } = store.state
      if (objd.length !== 0) {
        const names: string[] = []
        objd.forEach((obj: ObjdModel) => {
          if (obj.obsz > 1) {
            for (let i = 0; i < obj.obsz; i += 1) {
              names.push(`${obj.objn}[${i}]`)
            }
          } else {
            names.push(obj.objn)
          }
        })
        return names
      }
      return []
    })
    if (objList.value.length !== 0) {
      objName.value = objList.value[0]
    }
    const SEARCH_OBJECT = useFunc('searchObject')
    watch(
      objList,
      (val: Array<string>) => {
        objName.value = val[0]
      },
      { deep: true },
    )
    watch(objName, (val: string) => {
      data.value = []
      searchObject(val)
    })
    ws().test().set({
      success: setTeleData,
    })
    onUnmounted(() => {
      ws().remove(setTeleData)
    })
    const searchObject = (searchVal: string) => {
      const objn = searchVal.split('[')[0]
      const nameIndex = searchVal.match(/\d+/g)
      let obix = 0
      if (nameIndex) {
        obix = parseInt(nameIndex[0], 10)
      }
      ws().set().send({
        func: SEARCH_OBJECT,
        objn,
        obix,
        frix: 0,
        size: 10,
      })
    }
    const handleCheck = () => ({})
    const handleCheckAll = () => ({})
    const formatTime = (time: number) => {
      return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
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
      formatTime,
    }
  },
})
</script>
