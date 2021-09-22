export interface SerialNorthDriversFormData {
  chdv: string
  tcph: string
  tcpp: number
  ttyc: string
  ttyb: number
  ttyd: number
  ttys: string
  ttyp: string
}

export type EthernetNorthDriversFormData = [
  { vars: 'TCPSERVER'; pars: string },
  { vars: 'BYTEORDER'; pars: string },
  { vars: 'DLYCRESOCKAFTCLOSE'; pars: string },
  { vars: 'TORECEIVETCP'; pars: string },
  { vars: 'NAPTIMEREAD'; pars: string },
  { vars: 'NAPTIMEWRITE'; pars: string },
]

export interface NorthDriverFormData extends SerialNorthDriversFormData {
  parm: EthernetNorthDriversFormData
}

export interface DriverItem {
  name: string
  id: number
}

export interface ResponseDriverListData {
  function: number
  nodes: Array<DriverItem>
}
