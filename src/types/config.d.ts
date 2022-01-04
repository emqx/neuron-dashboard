import { Merge } from 'type-fest'
import { DriverDirection, NodeLinkState, NodeState, ParamRequired, PluginKind, TypeOfPluginParam } from './enums'

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

export interface SubscriptionDataForm {
  dst_node_id: number | null
  src_node_id: number | null
  name: string
}

export interface SubscriptionData extends SubscriptionDataForm {
  dst_node_id: number
  src_node_id: number
  name: string
}

export interface RawDriverData {
  name: string
  id: number
  plugin_id: number
}

export interface DriverStateData {
  running: NodeState
  link: NodeLinkState
}

export type DriverItemInList = Merge<
  Merge<RawDriverData, DriverStateData>,
  {
    pluginKind: PluginKind
  }
>

export interface ResponseDriverListData {
  function: number
  nodes: Array<RawDriverData>
}

interface ParamBaseInfo {
  description: string
  name: string
  attribute: ParamRequired
  condition?: {
    field: string
    value: boolean | number | string
  }
}

export interface NumberParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Int
  default?: number
  valid: {
    min: number
    max: number
  }
}

export interface StringParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.String
  default?: string
  valid: {
    length: number
  }
}

interface BoolParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Boolean
  default?: boolean
  valid: Record<string, never>
}

interface FileParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.File
  default?: string
  valid: Record<string, never>
}

interface MapItem {
  key: string
  value: number
}
interface MapParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Map
  default?: number
  valid: {
    map: Array<MapItem>
  }
}

export type ParamInfo = NumberParamInfo | StringParamInfo | BoolParamInfo | MapParamInfo | FileParamInfo

export interface PluginInfo {
  tag_type: Array<TagType>
  // TODO: delete params after api changed
  params: Array<string>
  /**
   * params items
   */
  [propName: string]: ParamInfo
}

interface AllPluginConfigInfo {
  plugins: Array<string>
  /**
   * plugins items
   */
  [propName: string]: PluginInfo
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
