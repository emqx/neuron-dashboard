interface Status {
  func: number
  tstp: number
  type: string
  comm: string
  mach: string
  mode: string
  mqcn: string
  galm: string
}

export interface NeuronData {
  func: number
  wtrm: string
  data?: any
  errc?: string
}
