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
  1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 2002, 2003, 2004, 2005,
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2201, 2202, 2203, 2204, 2205,
  2206, 2207, 2208, 2209, 2301, 2302, 2303, 2304, 2305, 2306, 2307, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407,
  3000, 3001, 3002, 3003, 3004, 3007, 3008, 3009, 3010, 3011, 3012, 10101, 10103, 10105, 10106, 10107, 10110, 10150,
  10151, 10200, 10400, 10500, 10501, 10502, 10503, 10504, 10505, 10506, 10507, 10508, 10509, 10510, 10511, 10512, 10513,
  10514, 10515, 10516, 10517, 10001, 10002, 10003, 10004, 10005, 10006, 10701, 10702, 10703, 10704, 10705, 10706, 10707,
  10708, 10709, 10710, 10711, 10712, 10713, 10714, 10715, 10716, 10717, 10718, 10719, 10720, 10721, 10722, 10723, 10724,
  10725, 10726, 10727, 10728, 10729, 10730, 10731, 10732, 10733, 10734, 10735, 10736, 10737, 10738, 10739, 10740, 10741,
  10742, 10743, 10744, 10744, 10798, 10799,
]

export const FILLER_IN_TAG_ATTR = ' '

export const DASHBOARD_APP_NAME = 'default-dashboard-adapter'
export const APP_DO_NOT_NEED_SHOW = [DASHBOARD_APP_NAME, 'default-persist-adapter']

export const PLUGIN_TYPES = 'default-dashboard-adapter'
