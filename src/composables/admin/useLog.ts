import type { Ref, WritableComputedRef } from 'vue'
import { computed, ref } from 'vue'
import { LogType } from '@/types/enums'
import { queryLog } from '@/api/admin'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { UPPER_LOWERCASE_REGEX } from '@/utils/regexps'

export default () => {
  const startTime: Ref<number | undefined> = ref(new Date(Date.now() - 1000 * 60 * 60 * 24).getTime())
  const endTime: Ref<number | undefined> = ref(new Date().getTime())
  const logType: Ref<LogType> = ref(LogType.All)
  const logTypeOptions: Array<{ label: string; value: string }> = []
  const tableData: Ref<Array<string>> = ref([])

  const pageController = ref({
    num: 1,
    size: 200,
    totalPageNum: 0,
  })

  const { t } = useI18n()

  const getTimestampFromStr = (str: string | undefined) => {
    if (!str) {
      return undefined
    }
    return new Date(str).getTime()
  }

  const timeRange: WritableComputedRef<[string | undefined, string | undefined]> = computed({
    get() {
      return [
        startTime.value ? new Date(startTime.value).toString() : undefined,
        endTime.value ? new Date(endTime.value).toString() : undefined,
      ]
    },
    set([start, end]) {
      startTime.value = getTimestampFromStr(start)
      endTime.value = getTimestampFromStr(end)
    },
  })

  const initLogTypeOptions = () => {
    const keyReg = UPPER_LOWERCASE_REGEX
    Object.keys(LogType).forEach((key) => {
      if (keyReg.test(key)) {
        logTypeOptions.push({
          value: LogType[key as keyof typeof LogType],
          label: key,
        })
      }
    })
  }

  const getLogs = async () => {
    if (!startTime.value || !endTime.value) {
      EmqxMessage.error(t('admin.timeRangeRequired'))
      return
    }
    const { size, num } = pageController.value
    const data: {
      since: number
      until: number
      level?: LogType
      page: number
      page_size: number
    } = {
      since: Math.floor(startTime.value / 1000),
      until: Math.floor(endTime.value / 1000),
      page: num - 1,
      page_size: size,
    }
    if (logType.value) {
      data.level = logType.value
    }
    tableData.value = []
    const { data: ret } = await queryLog(data)
    tableData.value = ret.rows
    pageController.value.totalPageNum = ret.page_count
  }

  const handleSizeChange = (size: number) => {
    pageController.value = {
      size,
      num: 1,
      totalPageNum: 1,
    }
    getLogs()
  }

  const refreshData = () => {
    const { size } = pageController.value
    pageController.value = {
      size,
      num: 1,
      totalPageNum: 1,
    }
    getLogs()
  }

  initLogTypeOptions()
  getLogs()

  return {
    timeRange,
    logType,
    logTypeOptions,
    pageController,
    tableData,
    getLogs,
    refreshData,
    handleSizeChange,
  }
}
