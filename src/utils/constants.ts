/* Possible node type values for North Driver */
export const NORTH_DRIVER_NODE_TYPE = [3, 4, 5]

export const HEXADECIMAL_PREFIX = '0x'

export const MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW = 3

export const ERROR_CODE_MSG_MAP: Record<number, string> = {
  [1001]: 'Internal error',
  [1002]: 'Request body invalid',
  [1003]: 'Request param invalid',
  [2000]: 'Plugin name not found',
  [2001]: 'Node type invalid',
  [2002]: 'Node exist',
  [2003]: 'Node not exist',
  [2004]: 'Group config not exist',
  [2005]: 'Tag not exist',
  [2006]: 'Tag attribute not support',
  [2007]: 'Node setting invalid',
  [2008]: 'Node setting not exist',
  [2009]: 'Group config in use',
  [2010]: 'Node not ready',
  [2011]: 'Node is running',
  [2012]: 'Node not running',
  [2013]: 'Node is stoped',
}
