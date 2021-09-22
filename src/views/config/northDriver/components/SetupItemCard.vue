<template>
  <div class="setup-item-card">
    <div class="setup-item-hd common-flex">
      <p class="setup-item-name ellipsis">{{ data.name }}</p>
      <div class="setup-item-handlers">
        <i class="iconfont iconattributed"></i>
        <i class="iconfont icondelete"></i>
      </div>
    </div>
    <div class="setup-item-info common-flex">
      <div class="common-flex">
        <label>{{ $t('config.workStatus') }}</label>
        <emqx-switch></emqx-switch>
      </div>
      <div class="common-flex">
        <i class="iconfont iconlanguage"></i>
        <span>XXXX</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DriverItem } from '@/types/config'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SetupItemCard',
})
</script>

<script lang="ts" setup>
const props = defineProps({
  data: Object as PropType<DriverItem>,
})
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
