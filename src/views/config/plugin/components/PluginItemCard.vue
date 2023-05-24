<template>
  <div class="plugin-item-card">
    <div class="plugin-item-info">
      <div class="plugin-item-card-hd common-flex">
        <p class="plugin-item-name ellipsis">
          <!-- <img class="plugin-item-icon" :src="getPluginIcon(data.name)" height="36" /> -->
          <span>{{ data.name }}</span>
        </p>
        <div class="handlers">
          <!-- <AComWithDesc v-if="data.doc_link" :content="$t('common.document')">
            <a :href="data.doc_link" target="_blank" class="icon-plugin-link icon">
              <i class="el-icon-document" />
            </a>
          </AComWithDesc> -->
          <AComWithDesc v-if="data.kind === PluginKind.Custom" :content="$t('common.delete')">
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
        <span class="ellipsis">{{ data.kind ? PluginKind[data.kind] : '-' }}</span>
      </div>
      <!-- <div class="info-row">
        <label>{{ $t('config.libName') }}</label>
        <span class="ellipsis">{{ data.library }}</span>
      </div> -->
      <div class="info-row">
        <label>{{ $t('config.desc') }}</label>
        <EllipsisTooltip :text="nodeDesc"></EllipsisTooltip>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AComWithDesc from '@/components/AComWithDesc.vue'
import { useNodeType } from '@/composables/config/useDriver'
import { useDeletePlugin } from '@/composables/config/usePlugin'
import type { CreatedPlugin } from '@/types/config'
import { PluginKind } from '@/types/enums'
import type { PropType } from 'vue'
import { defineEmits, defineProps, computed } from 'vue'
import EllipsisTooltip from '@/components/EllipsisTooltip.vue'
import useLang from '@/composables/useLang'

const props = defineProps({
  data: {
    type: Object as PropType<CreatedPlugin>,
    required: true,
  },
})

const { currentLang } = useLang()

const nodeDesc = computed(() => {
  return currentLang.value === 'zh' ? props.data.description_zh : props.data.description
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
@import '~@/styles/mixins.scss';

.plugin-item-card {
  padding: 24px;
  border-radius: 4px;
  background-color: #f3f4fa;
  .plugin-item-icon {
    flex-basis: 60px;
    flex-grow: 0;
    margin-right: 16px;
  }
  .plugin-item-name {
    display: flex;
    align-items: center;
  }
  .plugin-item-icon {
    margin-right: 16px;
  }
  .plugin-item-info {
    flex-grow: 1;
  }
  .plugin-item-card-hd {
    margin-bottom: 16px;
    font-size: 16px;
  }
  .handlers {
    flex-shrink: 0;
    @include display-flex();
  }
  .icon {
    font-size: 20px;
    cursor: pointer;
    color: #20466c;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  .icon-plugin-link {
    font-size: 15px;
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
