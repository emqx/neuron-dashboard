<template>
  <div class="node-card setup-item-card" @click="goGroupPage">
    <div class="node-item-hd common-flex">
      <p class="setup-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <AComWithDesc :content="$t('config.appConfig')">
          <i class="iconfont iconsetting" @click.stop="goNodeConfig"></i>
        </AComWithDesc>
        <AComWithDesc :content="$t('config.dataStatistics')">
          <i class="iconfont iconstatus" @click.stop="isShowDataStatistics()"></i>
        </AComWithDesc>
        <AComWithDesc :content="$t('common.delete')">
          <i
            class="iconfont icondelete"
            :class="{ disabled: data.pluginKind === PluginKind.Static }"
            @click.stop="deleteDriver"
          />
        </AComWithDesc>
      </div>
    </div>
    <div class="node-item-info-row common-flex">
      <div class="common-flex">
        <label>{{ $t('config.workStatus') }}</label>
        <div>
          <svg class="iconfont icon-svg" aria-hidden="true">
            <use :xlink:href="`#${statusIcon}`" />
          </svg>
          <span>{{ statusText }}</span>
        </div>
      </div>
      <div class="common-flex">
        <emqx-switch v-model="nodeStartStopStatus" @click.stop />
      </div>
    </div>
    <div class="node-item-info-row">
      <label>{{ $t('config.connectionStatus') }}</label>
      <span>{{ connectionStatusText }}</span>
    </div>
    <div class="node-item-info-row">
      <label>Plugin: </label>
      <span>{{ data.plugin }}</span>
    </div>
  </div>

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="'app'"
    :node-name="data.name"
  ></DataStatisticsDrawer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useDriverStatus, useNodeStartStopStatus, dataStatistics } from '@/composables/config/useDriver'
import { PluginKind } from '@/types/enums'
import type { DriverItemInList } from '@/types/config'
import AComWithDesc from '@/components/AComWithDesc.vue'
import DataStatisticsDrawer from '../../components/dataStatisticsDrawer.vue'

const emit = defineEmits(['deleted', 'updated', 'toggleStatus'])
const router = useRouter()

const props = defineProps({
  data: { type: Object as PropType<DriverItemInList>, required: true },
})

const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props)

const { countNodeStartStopStatus } = useNodeStartStopStatus()

const nodeStartStopStatus = computed({
  get() {
    return countNodeStartStopStatus(props.data)
  },
  set(val) {
    emit('toggleStatus', val)
  },
})

const goGroupPage = () => {
  router.push({
    name: 'NorthDriverGroup',
    params: {
      node: props.data?.name,
    },
  })
}

const goNodeConfig = () => router.push({ name: 'NorthDriverConfig', params: { node: props.data.name } })

const { delDriver } = useDeleteDriver()
const deleteDriver = async () => {
  if (props.data.pluginKind === PluginKind.Static) {
    return
  }
  await delDriver(props.data)
  emit('deleted')
}

// dataStatistics
const { isShowDataStatistics, dataStatisticsVisiable } = dataStatistics()
</script>

<style lang="scss">
.setup-item-card {
  background-color: #f4f9fc;
}
</style>
