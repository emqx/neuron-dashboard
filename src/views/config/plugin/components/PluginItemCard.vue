<template>
  <div class="plugin-item-card">
    <div class="plugin-item-card-hd common-flex">
      <p class="plugin-item-name ellipsis">{{ data.name }}</p>
      <div class="handlers">
        <AComWithDesc :content="$t('common.delete')">
          <i class="iconfont icon icondelete" @click="deletePlugin" />
        </AComWithDesc>
      </div>
    </div>
    <div class="info-row">
      <label>{{ $t('config.useFor') }}</label>
      <span class="ellipsis">{{ getNodeTypeLabelByValue(data.node_type) }}</span>
    </div>
    <div class="info-row">
      <label>{{ $t('config.pluginKind') }}</label>
      <span class="ellipsis">{{ PluginKind[data.kind] }}</span>
    </div>
    <div class="info-row">
      <label>{{ $t('config.libName') }}</label>
      <span class="ellipsis">{{ data.lib_name }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDeletePlugin } from '@/composables/config/usePlugin'
import { CreatedPlugin } from '@/types/config'
import { PluginKind } from '@/types/enums'
import { defineProps, PropType, defineEmits } from 'vue'
import { useNodeType } from '@/composables/config/useDriver'
import AComWithDesc from '@/components/AComWithDesc.vue'

const props = defineProps({
  data: {
    type: Object as PropType<CreatedPlugin>,
    required: true,
  },
})
const emit = defineEmits(['deleted'])
const { getNodeTypeLabelByValue } = useNodeType()
const { delPlugin } = useDeletePlugin()
const deletePlugin = async () => {
  await delPlugin(props.data)
  emit('deleted')
}
</script>

<style lang="scss">
.plugin-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f4f9fc;
  .plugin-item-card-hd {
    margin-bottom: 16px;
    font-size: 16px;
  }
  .handlers {
    flex-shrink: 0;
  }
  .icon {
    font-size: 20px;
    cursor: pointer;
    color: #20466c;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .info-row {
    display: flex;
    > label {
      flex-shrink: 0;
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>