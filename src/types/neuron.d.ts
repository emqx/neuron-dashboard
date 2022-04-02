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

export interface ChnlData extends NeuronData {
  chnl: Array<ChnlModel> //channel data
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

export interface LogModel {
  data: string
  logl: string
  proc: string
  tstp: number
}

export interface LogData extends NeuronData {
  last: number
  nrow: number
  rows: Array<LogModel>
}

interface DeviceModel {
  name: string
  fdrw: number
}

export interface DeviceData extends NeuronData {
  rows: Array<DeviceModel>
}

interface ParamModel {
  vars: string
  pars: string
}

export interface ParamData extends NeuronData {
  parm: Array<ParamModel>
}

export interface ChnlModel {
  chdv: string
  tcph: string
  tcpp: number
  ttyc: string
  ttyb: number
  ttyd: number
  ttys: string
  ttyp: string
  parm: Array<ParamModel>
}

export interface ChanelData extends NeuronData {
  chnl: Array<ChanelModel>
}

interface DeviceModel {
  name: string
  fdrw: number
}

export interface DeviceData extends NeuronData {
  rows: Array<DeviceModel>
}

interface ParamModel {
  vars: string
  pars: string
}

export interface ParamData extends NeuronData {
  parm: Array<ParamModel>
}

export interface ChanelModel {
  chdv: string
  tcph: string
  tcpp: number
  ttyc: string
  ttyb: number
  ttyd: number
  ttys: string
  ttyp: string
  parm: Array<ParamModel>
}

export interface ChanelData extends NeuronData {
  chnl: Array<ChanelModel>
}

export interface LogSwitchModel {
  content: string
}

export interface LogSwitchData extends NeuronData {
  logn: string
  rows: Array<string>
}

export interface InstanceInfoModel {
  uuid: string
  time: string
  expd: string
  rest: string
  data: string
  natt: string
  nalr: string
  tatt: string
  talr: string
  tusg: string
  matt: string
  malr: string
  musg: string
  self: string
}

export interface InstanceInfoData extends NeuronData {
  agts: Array<InstanceInfoModel>
}

export interface HistoricalAlarmModel {
  anum: number
  tstp: number
  uack: string
  cate: string
  stat: string
  comt: string
}

export interface HistoricalAlarmData extends NeuronData {
  frti: number
  toti: number
  nalm: number
  ordr: string
  tokn: string
  rows: Array<HistoricalAlarmModel>
}
