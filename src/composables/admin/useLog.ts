import { computed, Ref, ref, WritableComputedRef } from 'vue'
import { LogType } from '@/types/enums'
import { queryLog } from '@/api/admin'

export default () => {
  const startTime: Ref<string | undefined> = ref('')
  const endTime: Ref<string | undefined> = ref('')
  const logType: Ref<LogType> = ref(LogType.All)
  const logTypeOptions: Array<{ label: string; value: string }> = []
  const tableData: Ref<Array<string>> = ref([])

  const timeRange: WritableComputedRef<[string | undefined, string | undefined]> = computed({
    get() {
      return [startTime.value, endTime.value]
    },
    set([start, end]) {
      startTime.value = start
      endTime.value = end
    },
  })

  const initLogTypeOptions = () => {
    const keyReg = /^[A-Z][a-z]+$/
    Object.keys(LogType).forEach((key) => {
      if (keyReg.test(key)) {
        logTypeOptions.push({
          value: LogType[key as keyof typeof LogType],
          label: key,
        })
      }
    })
  }

  const getTimeStampByDateStr = (date: string): number => parseInt((new Date(date).getTime() / 1000).toString())

  const getLogs = async () => {
    const data = {
      since: startTime.value ? getTimeStampByDateStr(startTime.value) : undefined,
      until: endTime.value ? getTimeStampByDateStr(endTime.value) : undefined,
      level: (logType.value === LogType.All ? '' : logType.value) as '' | LogType,
    }
    const { rows } = await queryLog(data)
    tableData.value = rows
  }

  initLogTypeOptions()
  getLogs()

  return {
    timeRange,
    logType,
    logTypeOptions,
    tableData,
    getLogs,
  }
}
