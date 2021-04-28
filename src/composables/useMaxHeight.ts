import { computed, ComputedRef } from '@vue/runtime-core'

export default function useMaxHeight(): {
  maxTableHeight: ComputedRef<number>
} {
  const maxTableHeight = computed(() => {
    return window.innerHeight - 280
  })
  return {
    maxTableHeight,
  }
}
