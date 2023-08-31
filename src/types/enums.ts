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
 * in fact, the node type value of the north node can be 3, 5
 * but we use 5 when add or query node
 * the node type value of the south node can be 1, 4
 * but we use 1 when add or query node
 */
export enum DriverDirection {
  North = 2,
  South = 1,
  // now seem useless
  Web = 2,
}
export enum NodeCatogery {
  South = 'driver',
  North = 'app',
  GLOBAL = 'global',
}

export enum TypeOfPluginParam {
  Int = 'int',
  String = 'string',
  Boolean = 'bool',
  Enum = 'enum',
  Map = 'map',
  File = 'file',
  Array = 'array',
}

export enum TagType {
  INT8 = 1,
  UINT8,
  INT16,
  UINT16,
  INT32,
  UINT32,
  INT64,
  UINT64,
  FLOAT,
  DOUBLE,
  BIT,
  BOOL,
  STRING,
  BYTES,
  WORD = 16,
  DWORD,
  LWORD,
}

export enum TagAttributeType {
  Read = 1,
  Write = 2,
  Subscribe = 4,
  Static = 8,
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
  Init = 1,
  Ready,
  Running,
  Stopped,
}

export enum NodeLinkState {
  Disconnected,
  // Connecting,
  Connected,
}

export enum ParamRequired {
  True = 'required',
  False = 'optional',
}

export enum LogType {
  All = '',
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal',
}

export enum FileType {
  Text = 'text',
  Binary = 'binary',
}

export enum PluginType {
  EthernetIp = 'ethernet-ip-cip',
  ADS = 'ads',
  A1E = 'mitsubishi-melsec-q-a1e',
  Focas = 'cnc-fanuc-focas',
  MQTT = 'MQTT',
  Modbus = 'Modbus',
  OPCUA = 'OPC UA',
  SiemensS7ISOTCP = 'Siemens S7 ISOTCP',
  OmronFinsOnTCP = 'OMRON FINS on TCP',
  MitsubishiMelsecQE71 = 'Mitsubishi MELSEC-Q E71',
  IEC608705104 = 'IEC 60870-5-104',
  KNXnetIP = 'KNXnet IP',
  BACnetIP = 'BACnet IP',
  DLT6452007 = 'DL T645-2007',
  SparkplugB = 'Sparkplug B',
  zhNoA11 = '非 A11',
  enNoA11 = 'Non A11',
}
export enum SchameBase {
  decimal = 10,
  hexadecimal = 16,
}
