import type { ComputedRef } from 'vue'
import { computed } from 'vue'

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
