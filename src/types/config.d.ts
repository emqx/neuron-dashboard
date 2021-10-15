import { Merge } from 'type-fest'
import { DriverDirection, PluginKind } from './enums'

/**
 * Params get from API
 */
type Parm = Array<{ vars: string; pars: string }>

export interface PluginForm {
  kind: PluginKind | null
  node_type: DriverDirection | null
  name: string
  lib_name: string
}

export interface CreatedPlugin extends PluginForm {
  id: number
}

export interface NodeForm {
  type: DriverDirection
  name: string
  plugin_name: string
}
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

export interface GroupForm {
  /**
   * Name
   */
  name: string
  interval: number | null
  node_id: number | null
}

export interface GroupData extends Omit<GroupForm, 'node_id'> {
  pipe_count: number
  tag_count: number
}

export interface TagForm {
  name: string
  address: string
  attribute: number | null
  type: number | null
}

export interface TagData extends TagForm {
  group_config_name: string
  tag_id: number
}
