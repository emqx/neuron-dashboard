<template>
  <div @mouseenter="visibilityChange($event)">
    <el-tooltip
      :content="tooltipContent"
      :disabled="!tooltipVisible"
      effect="dark"
      :placement="placement"
      popper-class="tooltip-popper"
    >
      <span class="tooltip-wrap">
        <slot>
          <span ref="textRef" :class="className" class="text">{{ text }}</span>
        </slot>
      </span>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, defineProps, ref } from 'vue'
import { ElTooltip } from 'element-plus'

export default defineComponent({
  name: 'EllipsisTooltip',
})
</script>

<script lang="ts" setup>
const props = defineProps({
  text: { type: String, default: '' },
  content: { type: String, default: '' },
  placement: { type: String, default: 'top' },
  className: { type: String, default: 'text' },
})

const textRef = ref()
const tooltipVisible = ref(false)

const tooltipContent = computed(() => {
  const { content } = props
  return !content ? props.text : content
})

const visibilityChange = (event: any) => {
  const ev = event.target
  const containerHeight = ev.offsetHeight
  const textHeight = textRef.value?.offsetHeight
  tooltipVisible.value = textHeight && containerHeight < textHeight ? true : !true
}
</script>

<style lang="scss" scoped>
.tooltip-wrap {
  display: inline-block;
  display: -webkit-box;
  line-height: inherit;
  word-break: break-all;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
span.text {
  white-space: initial;
}
</style>
<style lang="scss">
.tooltip-popper {
  max-width: 400px !important;
}
</style>
