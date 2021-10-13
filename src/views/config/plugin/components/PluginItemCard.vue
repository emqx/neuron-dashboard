<template>
  <div class="plugin-item-card">
    <div class="plugin-item-card-hd common-flex">
      <p class="plugin-item-name">{{ data.name }}</p>
      <div class="handlers">
        <i class="icon-edit el-icon-edit-outline" @click="editPlugin"></i>
        <i class="iconfont icondelete" @click="deletePlugin" />
      </div>
    </div>
    <div class="info-row">
      <label>{{ $t('common.type') }}</label>
      <span>{{ PluginKind[data.kind] }}</span>
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

const props = defineProps({
  data: {
    type: Object as PropType<CreatedPlugin>,
    required: true,
  },
})
const emit = defineEmits(['deleted', 'edit'])
const { delPlugin } = useDeletePlugin()
const deletePlugin = async () => {
  await delPlugin(props.data)
  emit('deleted')
}

const editPlugin = async () => {
  emit('edit')
}
</script>

<style lang="scss">
.plugin-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f4f9fc;
  .plugin-item-card-hd {
    margin-bottom: 16px;
  }
  .iconfont {
    font-size: 20px;
  }
  .icon-edit {
    position: relative;
    top: -1px;
    font-size: 17px;
    margin-right: 8px;
    opacity: 0.9;
  }
  .iconfont,
  .icon-edit {
    cursor: pointer;
    color: #20466c;
  }
  .info-row:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
