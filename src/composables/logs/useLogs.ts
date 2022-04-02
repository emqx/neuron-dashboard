import { reactive, Ref, ref } from '@vue/reactivity'

interface PageMap {
  [key: number]: number
}

type HandleFunction = (callback: () => void) => void

export default function useLogs(): {
  page: Ref<number>
  offset: Ref<number>
  pageMap: PageMap
  hasnext: Ref<boolean>
  handleNextClick: HandleFunction
  handlePrevClick: HandleFunction
} {
  const page = ref(1)
  const offset = ref(0)
  const hasnext = ref(false)
  const pageMap: PageMap = reactive({})
  const handleNextClick = (callback: () => void) => {
    if (hasnext.value) {
      page.value += 1
      callback()
    }
  }
  const handlePrevClick = (callback: () => void) => {
    if (page.value !== 1) {
      page.value -= 1
      callback()
    }
  }
  return {
    page,
    offset,
    pageMap,
    hasnext,
    handleNextClick,
    handlePrevClick,
  }
}
