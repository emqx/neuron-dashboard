import { Ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { ObjdModel } from '@/types/neuron'
import { computed } from '@vue/runtime-core'

export default function useConfig(): {
  tableData: Ref<ObjdModel[]>
} {
  const store = useStore()
  const tableData = computed(() => {
    const { objd }: { objd: ObjdModel[] } = store.state
    return objd
  })
  return {
    tableData,
  }
}
