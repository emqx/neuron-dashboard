import { TeleData } from '@/types/neuron'
import { Ref, ref } from '@vue/reactivity'
import { DataRow } from './data/data'

export default function useTeleData(
  tele: TeleData['tele'],
): {
  tableData: Ref<DataRow[]>
} {
  const tableData: Ref<DataRow[]> = ref([])
  tableData.value = Object.keys(tele)
    .filter((key) => key !== 'objn')
    .map((key) => {
      return {
        prop: key === 'tstp' ? 'Time' : key,
        val: tele[key],
        writable: false,
        checked: false,
      }
    })
  return {
    tableData,
  }
}
