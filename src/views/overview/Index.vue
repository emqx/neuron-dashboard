<template>
  <emqx-card class="overview" v-emqx-loading="isLoading">
    <div class="block">
      <div class="block-hd">
        <h3 class="card-title">Neuron Gateway</h3>
        <!-- <span class="sub-title">{{ $t('config.runningTime') }}: 12</span> -->
      </div>
      <!-- <emqx-row class="charts-container" :gutter="32">
        <emqx-col :span="16">
          <MessageChart class="chart" />
        </emqx-col>
        <emqx-col :span="8">
          <ConfigDataCard class="chart" />
        </emqx-col>
      </emqx-row> -->
    </div>
    <div class="block">
      <div class="block-hd common-flex">
        <h3 class="card-title">{{ $t('config.northApp') }}</h3>
        <div>
          <emqx-button class="btn-link" size="small">
            <router-link :to="{ name: 'NorthDriver' }">{{ $t('config.viewAll') }}</router-link>
          </emqx-button>
          <emqx-button size="small" type="primary" @click="showNorthDialog = true">{{
            $t('config.addApplication')
          }}</emqx-button>
        </div>
      </div>
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="(item, index) in showList(northDriverList)" :key="item.id">
          <SetupItemCard
            :data="item"
            @deleted="getNorthDriverList"
            @updated="getNorthDriverList"
            @toggle-status="setNorthNodeStartStopStatus(item, $event, index)"
          />
        </emqx-col>
      </emqx-row>
    </div>
    <div class="block">
      <div class="block-hd common-flex">
        <h3 class="card-title">{{ $t('config.southDevice') }}</h3>
        <div>
          <emqx-button class="btn-link" size="small">
            <router-link :to="{ name: 'SouthDriver' }">{{ $t('config.viewAll') }}</router-link>
          </emqx-button>
          <emqx-button size="small" type="primary" @click="showSouthDialog = true">{{
            $t('config.addDevice')
          }}</emqx-button>
        </div>
      </div>
      <emqx-row :gutter="24">
        <emqx-col :span="8" v-for="(item, index) in showList(southDriverList)" :key="item.id">
          <SouthDriveItemCard
            :data="item"
            @deleted="getSouthDriverList"
            @updated="getSouthDriverList"
            @toggle-status="setSouthNodeStartStopStatus(item, $event, index)"
          />
        </emqx-col>
      </emqx-row>
    </div>
  </emqx-card>
  <DriverDialog v-model="showNorthDialog" :type="DriverDirection.North" @submitted="getNorthDriverList" />
  <DriverDialog v-model="showSouthDialog" :type="DriverDirection.South" @submitted="getSouthDriverList" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import useNorthDriver from '@/composables/config/useNorthDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import MessageChart from './components/MessageChart.vue'
import ConfigDataCard from './components/ConfigDataCard.vue'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import { DriverItemInList } from '@/types/config'
import SetupItemCard from '@/views/config/northDriver/components/SetupItemCard.vue'
import SouthDriveItemCard from '@/views/config/southDriver/components/SouthDriveItemCard.vue'
import { MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW } from '@/utils/constants'
import { DriverDirection } from '@/types/enums'
import { useToggleNodeStartStopStatus } from '@/composables/config/useDriver'

const { northDriverList, getNorthDriverList } = useNorthDriver(false)
const { southDriverList, getSouthDriverList } = useSouthDriver(false)
const isLoading = ref(false)

const showNorthDialog = ref(false)
const showSouthDialog = ref(false)

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const setNorthNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    if (typeof ret === 'object') {
      northDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getNorthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}
const setSouthNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    if (typeof ret === 'object') {
      southDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getSouthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}

const showList = (list: Array<DriverItemInList>) => list.slice(0, MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW)

onMounted(async () => {
  isLoading.value = true
  await Promise.all([getSouthDriverList(), getNorthDriverList()])
  isLoading.value = false
})
</script>

<style lang="scss">
.overview {
  .block {
    margin-bottom: 32px;
  }

  .block-hd {
    margin-bottom: 16px;
    .card-title {
      display: inline-block;
      margin-bottom: 0;
      margin-right: 24px;
    }
    .sub-title {
      position: relative;
      padding-left: 10px;
      color: #343741;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: block;
        width: 1px;
        height: 14px;
        background-color: #343741;
      }
    }
  }

  .btn-link {
    padding: 0;
    a {
      display: block;
      height: 100%;
      line-height: 32px;
      padding-left: 15px;
      padding-right: 15px;
      text-decoration: none;
      color: inherit;
      height: 100%;
    }
  }

  .charts-container {
    min-height: 230px;
    .chart {
      height: 100%;
    }
  }
}
</style>
