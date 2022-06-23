import { DriverDirection } from '@/types/enums'

/* Possible node type values for North Driver */
export const NORTH_DRIVER_NODE_TYPE = [DriverDirection.North]

export const SOUTH_DRIVER_NODE_TYPE = [DriverDirection.South]

export const HEXADECIMAL_PREFIX = '0x'

export const MAX_NUM_IN_A_ROW_ON_THE_OVERVIEW = 3

/**
 * When updating here, the @/i18n/error.ts file should be updated together.
 * doc: https://github.com/neugates/nep/blob/main/docs/Neuron%202.x%20ERROR%20CODE.md
 */
export const ERROR_CODE_ARR = [
  1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
  2010, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2201, 2202, 2203, 2204, 2205, 2301, 2302, 2303, 2304, 2305, 2306,
  2400, 2401, 2402, 2403, 2404, 2405, 3000, 3001, 3002, 3003, 3004, 3007, 3008,
]

export const FILLER_IN_TAG_ATTR = ' '

export const DASHBOARD_APP_NAME = 'default-dashboard-adapter'
export const APP_DO_NOT_NEED_SHOW = [DASHBOARD_APP_NAME, 'default-persist-adapter']
