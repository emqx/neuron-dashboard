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
export interface TeleData {
  func: number
  tele: {
    objn: string
    tstp: number
    temp: number
    energy: number
  }
}

export interface NeuronData {
  func: number
  wtrm: string
  data?: any
  errc?: string
}
