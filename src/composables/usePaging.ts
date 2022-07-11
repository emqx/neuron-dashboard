import type { Ref } from 'vue'
import { ref } from 'vue'
import { orderBy, chunk } from 'lodash'

type ListData = Array<any>

interface PageMeta {
  pageNum: number
  pageSize: number
}

export interface FilterItem {
  key: string
  value: string
}

interface SortFrom {
  key: string
  type: 'asc' | 'desc'
}

const DEFAULT_PAGE_SIZE = 20

export default (): {
  totalData: Ref<ListData>
  setTotalData: (data: ListData) => void
  getAPageData: (
    pageMeta: PageMeta,
    filters?: Array<FilterItem>,
    sortFrom?: SortFrom | undefined,
  ) => {
    data: ListData
    meta: {
      total: number
      pageSize: number
      pageNum: number
    }
  }
} => {
  const totalData: Ref<ListData> = ref([])
  // Use the following six variables to do a cache-like operation to reduce computational overhead
  let latestFiltersString = ''
  const listAfterFilter: Ref<ListData> = ref([])
  let latestSortFromString: string | undefined
  const listAfterFilterNSort: Ref<ListData> = ref([])
  let currentPageSize = DEFAULT_PAGE_SIZE
  const currentChunks: Ref<Array<ListData>> = ref([])

  const setTotalData = (data: ListData) => {
    totalData.value = data
    filterList()
    sortList()
    chunkList()
  }

  const filterList = (filters: Array<FilterItem> = []) => {
    latestFiltersString = JSON.stringify(filters)
    if (filters.length === 0) {
      listAfterFilter.value = totalData.value
    } else {
      listAfterFilter.value = totalData.value.filter((item) =>
        filters.every(({ key, value }) => item[key]?.indexOf && item[key].indexOf(value) > -1),
      )
    }
  }

  const sortList = (sortFrom?: SortFrom) => {
    if (!sortFrom) {
      latestSortFromString = undefined
      listAfterFilterNSort.value = listAfterFilter.value
    } else {
      latestSortFromString = JSON.stringify(sortFrom)
      listAfterFilterNSort.value = orderBy(listAfterFilter.value, [sortFrom.key], [sortFrom.type])
    }
  }

  const chunkList = (pageSize = DEFAULT_PAGE_SIZE) => {
    currentPageSize = pageSize
    currentChunks.value = chunk(listAfterFilterNSort.value, currentPageSize)
  }

  const getAPageData = (pageMeta: PageMeta, filters: Array<FilterItem> = [], sortFrom?: SortFrom) => {
    if (latestFiltersString !== JSON.stringify(filters)) {
      filterList(filters)
      sortList(sortFrom)
      chunkList(pageMeta.pageSize)
    } else if ((!sortFrom && latestSortFromString) || (sortFrom && latestSortFromString !== JSON.stringify(sortFrom))) {
      sortList(sortFrom)
      chunkList(pageMeta.pageSize)
    } else if (pageMeta.pageSize !== currentPageSize) {
      chunkList(pageMeta.pageSize)
    }
    const retData = currentChunks.value.length === 0 ? [] : currentChunks.value[pageMeta.pageNum - 1] || []
    return {
      data: retData,
      meta: {
        total: listAfterFilterNSort.value.length,
        pageSize: pageMeta.pageSize,
        pageNum: pageMeta.pageNum,
      },
    }
  }

  return {
    totalData,
    setTotalData,
    getAPageData,
  }
}
