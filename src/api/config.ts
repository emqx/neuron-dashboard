import { AxiosResponse } from 'axios'
import { DriverDirection } from '@/types/enums'
import http from '@/utils/http'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import {
  CreatedPlugin,
  DriverItem,
  GroupData,
  GroupForm,
  NodeForm,
  ResponseDriverListData,
  TagData,
  TagForm,
} from '@/types/config'

/* NODE(DRIVER & APP) */

const queryDriverList = (nodeType: number): Promise<AxiosResponse<ResponseDriverListData>> => {
  return http.get('/node', { params: { type: nodeType } })
}

const getDataFromResponse = (res: AxiosResponse<ResponseDriverListData>): Array<DriverItem> => res?.data?.nodes || []

export const queryNorthDriverList = async (): Promise<Array<DriverItem>> => {
  try {
    const request = await queryDriverList(DriverDirection.North)
    return Promise.resolve(getDataFromResponse(request))
  } catch (error) {
    return Promise.reject(error)
  }
}

export const querySouthDriverList = async (): Promise<Array<DriverItem>> => {
  const ret = await queryDriverList(DriverDirection.South as number)
  return getDataFromResponse(ret)
}

export const addDriver = (driverData: NodeForm, direction: DriverDirection) => {
  return http.post('/node', {
    ...driverData,
    node_type: direction,
  })
}

export const deleteDriver = (id: number) => {
  return http.delete('/node', { data: { id } })
}

/* GROUP */

export const queryGroupList = async (nodeID: number): Promise<Array<GroupData>> => {
  const { data }: AxiosResponse<{ error: number; group_configs: Array<GroupData> }> = await http.get('/gconfig', {
    params: { node_id: nodeID },
  })
  return Promise.resolve(data?.group_configs || [])
}

export const deleteGroup = async (nodeID: number, groupName: string): Promise<AxiosResponse> => {
  return http.delete('/gconfig', {
    data: { node_id: nodeID, name: groupName },
  })
}

export const addGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { name, interval, node_id } = data
  return http.post('/gconfig', {
    name,
    node_id,
    interval: Number(interval),
    dst_node_id: 1,
  })
}

export const updateGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { name, interval, node_id } = data
  return http.put('/gconfig', {
    name,
    node_id,
    interval: Number(interval),
    dst_node_id: 1,
  })
}

/* TAG */

export const queryTagList = async (nodeID: number, groupName: string): Promise<Array<TagData>> => {
  const { data } = await http.get('/tags', { params: { node_id: nodeID } })
  const tags: Array<TagData> = (data.tags || []).filter(
    ({ group_config_name }: TagData) => group_config_name === groupName,
  )
  return Promise.resolve(tags)
}

export const addTag = (data: { node_id: number; group_config_name: string; tags: Array<TagForm> }) => {
  return http.post('/tags', data)
}

export const deleteTag = (data: {
  node_id: number
  group_config_name: string
  tag_ids: Array<number>
}): Promise<AxiosResponse> => {
  return http.delete('/tags', { data })
}

export const updateTag = (nodeID: number, tag: TagForm) => {
  return http.put('/tags', {
    node_id: nodeID,
    tags: [tag],
  })
}

/* PLUGIN */

export const queryPluginList = (): Promise<AxiosResponse<{ plugin_libs: Array<CreatedPlugin> }>> => {
  return http.get('/plugin')
}
