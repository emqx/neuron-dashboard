import { AxiosResponse } from 'axios'
import { DriverDirection } from '@/types/enums'
import http from '@/utils/http'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { DriverItem, GroupData, ResponseDriverListData } from '@/types/config'

type DriverData = Record<string, string | number>

const UUID = 'whatever'

const queryDriverList = (nodeType: number): Promise<AxiosResponse<ResponseDriverListData>> => {
  return http.get('/node', { params: { node_type: nodeType } })
}

const getDataFromResponse = (res: AxiosResponse<ResponseDriverListData>): Array<DriverItem> => res?.data?.nodes || []

export const queryNorthDriverList = async (): Promise<Array<DriverItem>> => {
  try {
    const request = await Promise.all(NORTH_DRIVER_NODE_TYPE.map((type) => queryDriverList(type)))
    const ret = request.reduce((pre, curr) => pre.concat(getDataFromResponse(curr)), [] as Array<DriverItem>)
    return Promise.resolve(ret)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const querySouthDriverList = async (): Promise<Array<DriverItem>> => {
  const ret = await queryDriverList(DriverDirection.South as number)
  return getDataFromResponse(ret)
}

const addDriver = (driverData: DriverData, direction: DriverDirection) => {
  return http.post('/node', {
    ...driverData,
    function: 35,
    uuid: UUID,
    node_type: direction,
  })
}

export const addNorthDriver = (driverData: DriverData) => {
  return addDriver(driverData, DriverDirection.North)
}

export const addSouthDriver = (driverData: DriverData) => {
  return addDriver(driverData, DriverDirection.South)
}

export const queryGroupList = async (nodeID: number): Promise<Array<GroupData>> => {
  const { data }: AxiosResponse<{ function: number; error: number; group_configs: Array<GroupData> }> = await http.get(
    '/gconfig',
    {
      params: { node_id: nodeID },
    },
  )
  return Promise.resolve(data?.group_configs || [])
}

export const deleteGroup = async (nodeID: number, groupName: string): Promise<AxiosResponse> => {
  return http.delete('/gconfig', {
    data: { function: 92, uuid: UUID, node_id: nodeID, group_config: groupName },
  })
}
