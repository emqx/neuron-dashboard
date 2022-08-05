import type { Merge } from 'type-fest'
import type { DriverDirection, NodeLinkState, NodeState, ParamRequired, PluginKind, TypeOfPluginParam } from './enums'

/**
 * Params get from API
 */
type Parm = Array<{ vars: string; pars: string }>

export interface PluginForm {
  library: string
}

export interface CreatedPlugin extends PluginForm {
  kind: PluginKind | null
  node_type: DriverDirection | null
  name: string
  description: string
}

export interface NodeForm {
  name: string
  plugin: string
}

export interface SubscriptionDataForm {
  app: string | null
  driver: string | null
  group: string
}

export interface SubscriptionData extends SubscriptionDataForm {
  app: string
  driver: string
  group: string
}

export interface RawDriverData {
  name: string
  plugin: string
}

export interface DriverStateData {
  running: NodeState
  link: NodeLinkState
}

export type DriverItemInList = Merge<
  Merge<RawDriverData, DriverStateData>,
  {
    pluginKind: PluginKind
    plugin: string
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
    regex: string
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

interface TagRegex {
  type: number
  regex: string
}
export interface PluginInfo {
  tag_type: Array<TagType>
  tag_regex: Array<TagRegex>
  // TODO: delete params after api changed
  params: Array<string>
  /**
   * params items
   */
  [propName: string]: ParamInfo
}

export interface GroupForm {
  /**
   * Name
   */
  group: string
  interval: number | null
  node: string | null
}

export interface GroupData extends Omit<GroupForm, 'node'> {
  pipe_count: number
  tag_count: number
  name: string
}

export interface TagForm {
  name: string
  address: string
  attribute: number | undefined
  type: number | null
  description: string
}

export interface TagData extends TagForm {
  group: string
}
