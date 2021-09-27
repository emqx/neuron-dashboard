import { AxiosResponse } from 'axios'
import { DriverDirection } from '@/types/enums'
import http from '@/utils/http'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { DriverItem, GroupData, GroupForm, ResponseDriverListData, TagData, TagForm } from '@/types/config'

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

export const addGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { group_config, read_interval, src_node_id } = data
  return http.post('/gconfig', {
    group_config,
    src_node_id,
    read_interval: Number(read_interval),
    function: 90,
    uuid: UUID,
    dst_node_id: 1,
  })
}

export const updateGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { group_config, read_interval, src_node_id } = data
  return http.put('/gconfig', {
    group_config,
    src_node_id,
    read_interval: Number(read_interval),
    function: 90,
    uuid: UUID,
    dst_node_id: 1,
  })
}

export const queryTagList = async (nodeID: number, groupName: string): Promise<Array<TagData>> => {
  const { data } = await http.get('/tags', { params: { node_id: nodeID } })
  const tags: Array<TagData> = (data.tags || []).filter(
    ({ group_config_name }: TagData) => group_config_name === groupName,
  )
  return Promise.resolve(tags)
}

export const addTag = (data: { node_id: number; group_config_name: string; tags: Array<TagForm> }) => {
  return http.post('/tags', {
    ...data,
    function: 31,
    uuid: UUID,
  })
}

export const deleteTag = (data: {
  node_id: number
  group_config_name: string
  tag_ids: Array<number>
}): Promise<AxiosResponse> => {
  return http.delete('/tags', { data: { ...data, function: 33, uuid: UUID } })
}

export const updateTag = (nodeID: number, tag: TagForm) => {
  return http.put('/tags', {
    function: 34,
    uuid: UUID,
    node_id: nodeID,
    tags: [tag],
  })
}
