<template>
  <div class="setup-item-card">
    <div class="setup-item-hd common-flex">
      <p class="setup-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <i class="iconfont iconsetting" @click="goGroupPage"></i>
        <i class="iconfont icondelete" @click="deleteDriver"></i>
      </div>
    </div>
    <div class="setup-item-info common-flex">
      <div class="common-flex">
        <label>{{ $t('config.workStatus') }}</label>
        <emqx-switch></emqx-switch>
      </div>
      <div class="common-flex">
        <svg class="iconfont icon-svg" aria-hidden="true">
          <use :xlink:href="`#${statusIconClassMap[Math.floor(Math.random() * 3)]}`" />
        </svg>
        <span>XXXX</span>
      </div>
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
import { DriverItem } from '@/types/config'
import { PropType, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useDriverStatus } from '@/composables/config/useDriver'

const emit = defineEmits(['deleted'])
const router = useRouter()
const { statusIconClassMap } = useDriverStatus()

const props = defineProps({
  data: { type: Object as PropType<DriverItem>, required: true },
})

const goGroupPage = () => {
  router.push({
    name: 'NorthDriverGroup',
    params: {
      nodeID: props.data?.id,
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
.setup-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f4f9fc;
  .setup-item-hd {
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
  .setup-item-info {
    span,
    label {
      line-height: 20px;
      height: 20px;
    }
    label {
      vertical-align: middle;
    }
    .iconfont {
      margin-right: 8px;
    }
  }
}
</style>
