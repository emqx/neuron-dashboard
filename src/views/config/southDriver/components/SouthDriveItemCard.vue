<template>
  <div class="south-drive-item-card">
    <div class="south-drive-item-card-hd common-flex">
      <p class="south-drive-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <i class="iconfont iconattributed" @click="goGroupPage"></i>
        <i class="iconfont icondelete" @click="deleteDriver"></i>
      </div>
    </div>
    <div class="south-drive-item-info">
      <div class="common-flex">
        <div class="common-flex">
          <label>{{ $t('config.workStatus') }}</label>
          <emqx-switch></emqx-switch>
        </div>
        <div class="common-flex">
          <i class="iconfont iconlanguage"></i>
          <span>XXXX</span>
        </div>
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
import { DriverItem } from '@/types/config'
import { useRouter } from 'vue-router'
import useDeleteDriver from '@/composables/config/useDeleteDriver'

const props = defineProps({
  data: {
    type: Object as PropType<DriverItem>,
    required: true,
  },
})
const emit = defineEmits(['deleted'])
const router = useRouter()

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
</script>

<style lang="scss">
.south-drive-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f3f3ff;
  .south-drive-item-card-hd {
    margin-bottom: 28px;
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
      margin-bottom: 20px;
    }
  }
}
</style>
