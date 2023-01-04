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

        <AComWithDesc v-if="isDataStreamProcessingNode(data.name)" :content="$t('config.updateDebugLogLevel')">
          <img
            class="img-debug-log-large"
            src="~@/assets/images/debug-log-icon.png"
            alt="debug-log"
            width="16"
            @click.stop="modifyNodeLogLevel"
          />
        </AComWithDesc>
        <emqx-dropdown v-else trigger="click" @command="handleClickOperator">
          <AComWithDesc :content="$t('common.more')">
            <span class="el-dropdown-link" @click.stop>
              <i class="el-icon-more" />
            </span>
          </AComWithDesc>
          <template #dropdown>
            <emqx-dropdown-menu>
              <emqx-dropdown-item command="debugLogLevel">
                <img class="img-debug-log" src="~@/assets/images/debug-log-icon.png" alt="debug-log" width="14" />
                <span>{{ $t(`config.updateDebugLogLevel`) }}</span>
              </emqx-dropdown-item>
              <emqx-dropdown-item
                command="delete"
                :disabled="data.pluginKind === PluginKind.Static"
                icon="iconfont icondelete"
              >
                <span>{{ $t(`common.delete`) }}</span>
              </emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
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
import {
  useDriverStatus,
  useNodeStartStopStatus,
  dataStatistics,
  useNodeDebugLogLevel,
  useDriverName,
} from '@/composables/config/useDriver'
import { PluginKind } from '@/types/enums'
import type { DriverItemInList } from '@/types/config'
import AComWithDesc from '@/components/AComWithDesc.vue'
import DataStatisticsDrawer from '../../components/dataStatisticsDrawer.vue'

const emit = defineEmits(['reload', 'updated', 'toggleStatus'])
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

// dataStatistics
const { isShowDataStatistics, dataStatisticsVisiable } = dataStatistics()

// more operators
const { delDriver } = useDeleteDriver()
const { modifyNodeLogLevelToDebug } = useNodeDebugLogLevel()

const deleteDriver = async () => {
  if (props.data.pluginKind === PluginKind.Static) {
    return
  }
  await delDriver(props.data)
  emit('reload')
}
const modifyNodeLogLevel = async () => {
  await modifyNodeLogLevelToDebug(props.data.name)
  emit('reload')
}

const handleClickOperator = (command: string) => {
  if (command === 'delete') {
    deleteDriver()
  } else if (command === 'debugLogLevel') {
    modifyNodeLogLevel()
  }
}

const { isDataStreamProcessingNode } = useDriverName()
</script>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';

.setup-item-card {
  background-color: #f4f9fc;
}
.img-debug-log {
  margin-right: 8px;
  position: relative;
  top: 2px;
}
.setup-item-handlers {
  @include display-flex();
}
</style>
