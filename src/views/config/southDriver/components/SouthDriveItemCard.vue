<template>
  <div class="south-drive-item-card" @click="goGroupPage">
    <div class="south-drive-item-card-hd common-flex">
      <p class="south-drive-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <AComWithDesc :content="$t('config.deviceConfig')">
          <i class="iconfont iconsetting" @click.stop="goNodeConfig"></i>
        </AComWithDesc>
        <AComWithDesc :content="$t('common.delete')">
          <i class="iconfont icondelete" @click.stop="deleteDriver"></i>
        </AComWithDesc>
      </div>
    </div>
    <div class="south-drive-item-info">
      <div class="common-flex">
        <div class="common-flex">
          <label>{{ $t('config.workStatus') }}</label>
          <emqx-switch v-model="getNodeStartStopStatus" @click.stop @change="setNodeStartStopStatus" />
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
      <div>
        <label>点数统计信息</label>
        <span>233</span>
      </div>
      <div>
        <label>运行时长</label>
        <span>66</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SouthDriveItemCard',
})
</script>

<script lang="ts" setup>
import { PropType, defineEmits } from 'vue'
import { DriverItemInList } from '@/types/config'
import { useRouter } from 'vue-router'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useDriverStatus, useNodeStartStopStatus } from '@/composables/config/useDriver'
import AComWithDesc from '@/components/AComWithDesc.vue'

const props = defineProps({
  data: {
    type: Object as PropType<DriverItemInList>,
    required: true,
  },
})

const emit = defineEmits(['deleted', 'updated'])
const router = useRouter()
const { getNodeStartStopStatus, setNodeStartStopStatus } = useNodeStartStopStatus(props.data)
const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props.data)

const goGroupPage = () => {
  router.push({
    name: 'SouthDriverGroup',
    params: {
      nodeID: props.data.id,
    },
  })
}

const { delDriver } = useDeleteDriver()
const deleteDriver = async () => {
  await delDriver(props.data)
  emit('deleted')
}
const goNodeConfig = () => router.push({ name: 'SouthDriverConfig', params: { nodeID: props.data.id } })
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
.south-drive-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f3f3ff;
  cursor: pointer;
  .south-drive-item-card-hd {
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
    }
  }
  .south-drive-item-info {
    span,
    label {
      line-height: 20px;
      height: 20px;
    }
    .iconfont {
      margin-right: 8px;
    }
    > div:not(:last-child) {
      margin-bottom: 16px;
    }
  }
}
</style>
