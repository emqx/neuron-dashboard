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

export interface SubscriptionData {
  dst_node_id: number
  src_node_id: number
  name: string
}

export interface DriverItem {
  name: string
  id: number
  plugin_id: number
}

export interface DirverItemWithPluginKind extends DriverItem {
  pluginKind: PluginKind
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
  attribute: number | undefined
  type: number | null
}

export interface TagData extends TagForm {
  group_config_name: string
  id: number
}
