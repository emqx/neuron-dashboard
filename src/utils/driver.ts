import { NodeLinkState, NodeState, DriverDirection } from '@/types/enums'

export const statusIconClassMap = {
  [NodeState.Init]: 'iconinit',
  [NodeState.Ready]: 'iconready',
  [NodeState.Running]: 'iconrunning',
  [NodeState.Stopped]: 'iconstopped',
}
export const statusTextMap = {
  [NodeState.Init]: 'config.init',
  [NodeState.Ready]: 'config.ready',
  [NodeState.Running]: 'config.running',
  [NodeState.Stopped]: 'config.stopped',
}
// [NodeLinkState.Connecting]: 'config.connecting',
export const connectionStatusTextMap = {
  [NodeLinkState.Disconnected]: 'config.disconnected',
  [NodeLinkState.Connected]: 'config.connected',
}

export const nodeTypeClassMap = {
  [DriverDirection.South]: 'config.driver',
  [DriverDirection.North]: 'config.app',
}
