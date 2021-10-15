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
}

export enum TagType {
  Int8 = 2,
  Int16,
  Int32,
  Int64,
  UInt8,
  UInt16,
  UInt32,
  UInt64,
  Float,
  Double,
  Bool,
  Bit,
  CSTR,
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
