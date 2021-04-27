import { NeuronData } from '@/types/neuron'

export interface DataSourceConfig {
  func?: number
  name?: string
  pass?: string
  success?: (data: NeuronData) => void
}
