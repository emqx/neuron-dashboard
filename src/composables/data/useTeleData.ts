import { Ref, ref } from '@vue/reactivity'
import { TeleData } from '@/types/neuron'
import { DataRow } from './data'

export default function useTeleData(tele: TeleData['tele']): {
  tableData: Ref<DataRow[]>
} {
  const tableData: Ref<DataRow[]> = ref([])
  tableData.value = Object.keys(tele)
    .filter((key) => key !== 'objn')
    .map((key) => ({
      prop: key === 'tstp' ? 'Time' : key,
      val: tele[key],
      writable: false,
      checked: false,
    }))
  return {
    tableData,
  }
}
