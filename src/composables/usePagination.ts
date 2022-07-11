import type { Ref } from 'vue'
import { ref } from 'vue'

// interface PaginationModel {
//   pageNum: number
//   pageSize: number
// }

export default function usePagination(): {
  pageNum: Ref<number>
  pageSize: Ref<number>
  total: Ref<number>
} {
  const pageNum = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  // const pageParams: PaginationModel = reactive({
  //   pageNum,
  //   pageSize,
  // })
  // /**
  //  * reset
  //  */
  // const resetPageNum = (tableData: Array<{}>, pageNum: number) => {
  //   if (tableData.length === 1 && pageNum !== 1) {
  //     return pageNum - 1
  //   }
  //   return pageNum
  // }
  // const isLoading = ref(false)
  return {
    pageNum,
    pageSize,
    total,
    // pageParams,
    // isLoading,
    // resetPageNum,
  }
}
