import { querySouthDriverList } from '@/api/config'
import type { DriverItemInList, RawDriverData } from '@/types/config'
import { NodeLinkState, NodeState } from '@/types/enums'
import type { Ref } from 'vue'
import { onUnmounted, ref } from 'vue'
import usePaging from '../usePaging'
import { useFillNodeListStatusData } from './useNodeList'
import { debounce } from 'lodash'

export default (autoLoad = true, needRefreshStatus = false) => {
  const { fillNodeListStatusData } = useFillNodeListStatusData()

  // before pagination and without status data, for select
  const totalSouthDriverList: Ref<Array<RawDriverData>> = ref([])
  // after pagination, for show in list page
  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  const pageController = ref({
    pageNum: 1,
    pageSize: 30,
    total: 0,
  })
  const { setTotalData, getAPageData } = usePaging()

  const queryKeyword = ref({
    node: '',
    plugin: '',
  })

  let refreshStatusTimer: undefined | number

  const getAPageTagData = async () => {
    try {
      isListLoading.value = true
      const { data, meta } = getAPageData(pageController.value)
      southDriverList.value = await fillNodeListStatusData(data)
      pageController.value.total = meta.total
    } catch (error) {
      //
    } finally {
      isListLoading.value = false
    }
  }

  const getSouthDriverList = async () => {
    isListLoading.value = true
    try {
      const driverList = await querySouthDriverList(queryKeyword.value)
      const totalList = driverList.map((item) => {
        return {
          ...item,
          running: NodeState.Running,
          link: NodeLinkState.Connected,
        }
      })
      totalSouthDriverList.value = totalList
      setTotalData(totalList)
      await getAPageTagData()
    } catch (error) {
      //
    } finally {
      isListLoading.value = false
    }
  }
  // debounce
  const dbGetSouthDriverList = debounce(() => {
    getSouthDriverList()
  }, 500)

  const handleSizeChange = (size: number) => {
    pageController.value.pageSize = size
    pageController.value.pageNum = 1
    getAPageTagData()
  }

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      southDriverList.value = await fillNodeListStatusData(southDriverList.value)
    }, 15 * 1000)
  }

  if (autoLoad) {
    getSouthDriverList()
  }

  if (needRefreshStatus) {
    startTimer()
  }

  onUnmounted(() => {
    if (refreshStatusTimer) {
      window.clearInterval(refreshStatusTimer)
    }
  })

  return {
    queryKeyword,
    pageController,
    getAPageTagData,
    handleSizeChange,
    totalSouthDriverList,
    southDriverList,
    isListLoading,
    getSouthDriverList,
    dbGetSouthDriverList,
  }
}
