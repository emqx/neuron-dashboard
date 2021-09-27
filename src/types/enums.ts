export const enum GatewayAction {
  Restart = 'restart',
  Restartnew = 'restartnew',
  Shutdown = 'shutdown',
}

export enum SystemStatus {
  STANDBY = 'STANDBY',
  ACTIVE = 'ACTIVE',
}

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
