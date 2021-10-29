<template>
  <div class="setup-item-card" @click="goGroupPage">
    <div class="setup-item-hd common-flex">
      <p class="setup-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <i class="iconfont iconsetting" @click.stop="goNodeConfig"></i>
        <i
          class="iconfont icondelete"
          :class="{ disabled: data.pluginKind === PluginKind.Static }"
          @click.stop="deleteDriver"
        ></i>
      </div>
    </div>
    <div class="setup-item-info common-flex">
      <div class="common-flex">
        <label>{{ $t('config.workStatus') }}</label>
        <emqx-switch v-model="getNodeStartStopStatus" @change="toggleStatus" @click.stop />
      </div>
      <div class="common-flex">
        <svg class="iconfont icon-svg" aria-hidden="true">
          <use :xlink:href="`#${statusIcon}`" />
        </svg>
        <span>{{ statusText }}</span>
      </div>
    </div>
    <div class="setup-item-info">
      <label>{{ $t('config.connectionStatus') }}</label>
      <span>{{ connectionStatusText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SetupItemCard',
})
</script>

<script lang="ts" setup>
import { DriverItemInList } from '@/types/config'
import { PropType, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useDriverStatus, useNodeStartStopStatus } from '@/composables/config/useDriver'
import { PluginKind } from '@/types/enums'

const emit = defineEmits(['deleted', 'updated'])
const router = useRouter()

const props = defineProps({
  data: { type: Object as PropType<DriverItemInList>, required: true },
})

const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props.data)

const { getNodeStartStopStatus, setNodeStartStopStatus } = useNodeStartStopStatus(props.data)

const goGroupPage = () => {
  router.push({
    name: 'NorthDriverGroup',
    params: {
      nodeID: props.data?.id,
    },
  })
}

const goNodeConfig = () => router.push({ name: 'NorthDriverConfig', params: { nodeID: props.data.id } })

const { delDriver } = useDeleteDriver()
const deleteDriver = async () => {
  if (props.data.pluginKind === PluginKind.Static) {
    return
  }
  await delDriver(props.data)
  emit('deleted')
}
const toggleStatus = async (val: boolean) => {
  try {
    await setNodeStartStopStatus(val)
    emit('updated')
  } catch (error) {
    //
  }
}
</script>

<style lang="scss">
.setup-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f4f9fc;
  cursor: pointer;
  .setup-item-hd {
    margin-bottom: 24px;
    font-size: 16px;
  }
  .iconfont {
    display: inline-block;
    vertical-align: top;
    font-size: 20px;
    line-height: 1;
  }
  .setup-item-handlers {
    flex-shrink: 0;
    .iconfont {
      color: #20466c;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 16px;
      }
      &.disabled {
        opacity: 0.2;
        cursor: not-allowed;
      }
    }
  }
  .setup-item-info {
    span,
    label {
      line-height: 20px;
      height: 20px;
    }
    label,
    span {
      vertical-align: middle;
    }
    .iconfont {
      margin-right: 8px;
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>
