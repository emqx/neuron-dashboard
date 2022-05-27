<template>
  <emqx-select v-model="selected" :popper-class="popperClass" @visible-change="popperVisibleChanged">
    <emqx-option v-for="{ value, label } in options" :key="value" :label="label" :value="value" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, Ref, nextTick, PropType } from 'vue'
import { createRandomString } from '@/utils/utils'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array as PropType<Array<{ label: any; value: any }>>,
  },
  loadOptMethod: {
    type: Function,
  },
})
const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const popperClass = `popper${createRandomString()}`

let timer: undefined | number = undefined
const scrollHandler = () => {
  const popper = document.querySelector(`.${popperClass}`)
  const parent: HTMLElement | null = popper?.querySelector('.el-select-dropdown__wrap') as HTMLElement | null
  const child: HTMLElement | null = parent?.querySelector('.el-scrollbar__view') as HTMLElement | null
  if (!parent || !child) {
    return
  }
  if (parent.scrollTop > child.offsetHeight - parent.offsetHeight - 50 && props.loadOptMethod) {
    props.loadOptMethod()
  }
}
const handleScroll = () => {
  if (timer) {
    window.clearTimeout(timer)
  }
  timer = window.setTimeout(scrollHandler, 200)
}

const popperVisibleChanged = async (val: boolean) => {
  if (val) {
    await nextTick()
  }
  if (!props.loadOptMethod || typeof props.loadOptMethod !== 'function') {
    return
  }
  const wrap = document.querySelector(`.${popperClass} .el-select-dropdown__wrap`)
  if (val) {
    wrap?.addEventListener('scroll', handleScroll)
  } else {
    wrap?.removeEventListener('scroll', handleScroll)
  }
}
</script>
