export interface Status {
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
  tele: T
}

export interface NeuronData {
  func: number
  wtrm?: string
  errc?: number | string
}

export interface OdesModel {
  odix: number
  otxt: string
}

export interface AaddModel {
  obix: number
  desc: string
  addr: string
}

export interface OattModel {
  attn: string
  attt: string
  deci: number
  attr: string
  rtim: number
  unit: string
  aadd: Array<AaddModel>
}

export interface ObjdModel extends NeuronData {
  logt: number
  oatt: Array<OattModel>
  objn: string
  obsz: number
  odes: Array<OdesModel>
  updt: number
}

export interface ObjdData extends NeuronData {
  objd: Array<ObjdModel>
}

interface DriverModel {
  name: string
  desc: string
  type: string
}

export interface DriverData extends NeuronData {
  rows: Array<DriverModel>
}
