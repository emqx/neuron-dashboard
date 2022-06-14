import { querySouthDriverList } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { NodeLinkState, NodeState } from '@/types/enums'
import { onUnmounted, ref, Ref } from 'vue'
import usePaging from '../usePaging'
import { useFillNodeListStatusData } from './useNodeList'

export default (autoLoad = true, needRefreshStatus = false) => {
  const { fillNodeListStatusData } = useFillNodeListStatusData()

  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  const pageController = ref({
    pageNum: 1,
    pageSize: 30,
    total: 0,
  })
  const { setTotalData, getAPageData } = usePaging()

  let refreshStatusTimer: undefined | number = undefined

  const getSouthDriverList = async () => {
    isListLoading.value = true
    try {
      const driverList = await querySouthDriverList()
      const totalList = driverList.map((item) => {
        return {
          ...item,
          running: NodeState.Running,
          link: NodeLinkState.Connected,
        }
      })
      setTotalData(totalList)
      await getAPageTagData()
    } catch (error) {
      //
    } finally {
      isListLoading.value = false
    }
  }

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
    pageController,
    getAPageTagData,
    handleSizeChange,
    southDriverList,
    isListLoading,
    getSouthDriverList,
  }
}
