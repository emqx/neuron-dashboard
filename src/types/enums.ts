export const enum GatewayAction {
  Restart = 'restart',
  Restartnew = 'restartnew',
  Shutdown = 'shutdown',
}

export enum SystemStatus {
  STANDBY = 'STANDBY',
  ACTIVE = 'ACTIVE',
}

/**
 * infact, the node type value of the north node can be 3, 4, 5
 * but we use 5 when add or query node
 */
export enum DriverDirection {
  North = 5,
  South = 1,
  Web = 2,
}

export enum TypeOfPluginParam {
  Int = 'int',
  String = 'string',
  Boolean = 'bool',
  Enum = 'enum',
  Map = 'map',
  File = 'file',
}

export enum TagType {
  BYTE = 2,
  INT8,
  INT16,
  INT32,
  INT64,
  UINT8,
  UINT16,
  UINT32,
  UINT64,
  FLOAT,
  DOUBLE,
  BOOL,
  BIT,
  CSTRING,
}

export enum TagAttrbuteType {
  Read = 1,
  Write = 2,
  Subscribe = 4,
}

export enum PluginKind {
  Static,
  System,
  Custom,
}

export enum DriverStatus {
  Stop,
  Standby,
  Activate,
}

export enum NodeOperationCommand {
  Start,
  Stop,
}

export enum NodeState {
  Idle,
  Init,
  Ready,
  Running,
  Stopped,
}

export enum NodeLinkState {
  Disconnected,
  Connecting,
  Connected,
}

export enum ParamRequired {
  True = 'required',
  False = 'optional',
}
