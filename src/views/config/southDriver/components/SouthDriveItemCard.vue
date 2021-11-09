<template>
  <div class="node-card south-drive-item-card" @click="goGroupPage">
    <div class="node-item-hd common-flex">
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
    <div>
      <div class="node-item-info-row common-flex">
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
      <div class="node-item-info-row">
        <label>{{ $t('config.connectionStatus') }}</label>
        <span>{{ connectionStatusText }}</span>
      </div>
      <div class="node-item-info-row">
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
import { PropType, defineEmits, defineProps } from 'vue'
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
  background-color: #f3f3ff;
}
</style>
