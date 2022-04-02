import { ref, Ref } from '@vue/reactivity'

export default function useOneHourTime(): {
  oneHourRange: Ref<number[]>
} {
  const oneHourRange: Ref<number[]> = ref([])
  const date = new Date()
  const now = date.getTime()
  const before = now - 1 * 60 * 60 * 1000
  oneHourRange.value = [before, now]
  return {
    oneHourRange,
  }
}
