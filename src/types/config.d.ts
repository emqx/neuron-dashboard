import { Merge } from 'type-fest'

/**
 * Params get from API
 */
type Parm = Array<{ vars: 'TOPICHEADER'; pars: string }>

export interface SerialNorthDriversFormData {
  /**
   * Device name
   */
  ttyc: string
  /**
   * Baud rate
   */
  ttyb: number
  /**
   * Data bit
   */
  ttyd: number
  /**
   * Stop bit
   */
  ttys: string
  /**
   * Parity bit
   */
  ttyp: string
  parm: Parm
}

export type EthernetNorthDriversFormData = {
  /**
   * Host name
   */
  tcph: string
  /**
   * Port no
   */
  tcpp: number
  parm: Parm
}

export type NorthDriverFormData = Merge<
  {
    /**
     * north driver type
     */
    chdv: string
  },
  Merge<SerialNorthDriversFormData, EthernetNorthDriversFormData>
>

export interface DriverItem {
  name: string
  id: number
}

export interface ResponseDriverListData {
  function: number
  nodes: Array<DriverItem>
}

export interface GroupData {
  name: string
  read_interval: number
  pipe_count: number
  tag_count: number
}

export interface GroupForm {
  /**
   * Name
   */
  group_config: string
  read_interval: number | null
  src_node_id: number | null
}
