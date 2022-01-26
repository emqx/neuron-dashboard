import { AxiosResponse } from 'axios'
import { DriverDirection, NodeOperationCommand } from '@/types/enums'
import http from '@/utils/http'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import {
  CreatedPlugin,
  RawDriverData,
  GroupData,
  GroupForm,
  NodeForm,
  AllPluginConfigInfo,
  PluginForm,
  ResponseDriverListData,
  SubscriptionData,
  TagData,
  TagForm,
} from '@/types/config'

/* NODE(DRIVER & APP) */

const queryDriverList = (nodeType: number): Promise<AxiosResponse<ResponseDriverListData>> => {
  return http.get('/node', { params: { type: nodeType } })
}

const getDataFromResponse = (res: AxiosResponse<ResponseDriverListData>): Array<RawDriverData> => res?.data?.nodes || []

export const queryNorthDriverList = async (): Promise<Array<RawDriverData>> => {
  try {
    const retArr: Array<AxiosResponse<ResponseDriverListData>> = await Promise.all(
      NORTH_DRIVER_NODE_TYPE.map((code) => queryDriverList(code)),
    )
    return Promise.resolve(
      retArr.reduce((arr: Array<RawDriverData>, currentData) => arr.concat(getDataFromResponse(currentData)), []),
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const querySouthDriverList = async (): Promise<Array<RawDriverData>> => {
  const ret = await queryDriverList(DriverDirection.South as number)
  return getDataFromResponse(ret)
}

export const queryWebDriverList = async (): Promise<Array<RawDriverData>> => {
  const ret = await queryDriverList(DriverDirection.Web as number)
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

export const updateDriver = (data: { id: number; name: string }) => {
  return http.put('/node', data)
}

export const sendCommandToNode = (nodeID: number, command: NodeOperationCommand) => {
  return http.post('/node/ctl', { id: nodeID, cmd: command })
}

export const queryNodeState = (nodeID: number) => {
  return http.get('/node/state', { params: { node_id: nodeID } })
}

/* NORTH APP */
export const addSubscription = (data: SubscriptionData) => {
  return http.post('/subscribe', data)
}

export const deleteSubscription = (data: SubscriptionData) => {
  return http.delete('/subscribe', { data })
}

export const querySubscription = async (nodeID: number): Promise<Array<SubscriptionData>> => {
  try {
    const { data }: AxiosResponse<{ groups: Array<{ node_id: number; group_config_name: string }> }> = await http.get(
      '/subscribe',
      {
        params: { node_id: nodeID },
      },
    )
    return Promise.resolve(
      (data.groups || []).map(({ node_id, group_config_name }) => ({
        dst_node_id: nodeID,
        src_node_id: node_id,
        name: group_config_name,
      })),
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 * Obtain which fields need to be configured for each plugin
 * And specific information about these fields
 */
export const queryPluginConfigInfo = (): Promise<AxiosResponse<AllPluginConfigInfo>> => {
  return http.get('/schema/plugin')
}

export const submitNodeConfig = (nodeID: number, form: Record<string, any>) => {
  return http.post('/node/setting', {
    node_id: nodeID,
    params: form,
  })
}

export const queryNodeConfig = (nodeID: number) => {
  return http.get('/node/setting', { params: { node_id: nodeID } })
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
  const { data } = await http.get('/tags', { params: { node_id: nodeID, group_config_name: groupName } })
  return Promise.resolve(data.tags || [])
}

export const addTag = (data: { node_id: number; group_config_name: string; tags: Array<TagForm> }) => {
  return http.post('/tags', data)
}

export const deleteTag = (data: {
  node_id: number
  group_config_name: string
  ids: Array<number>
}): Promise<AxiosResponse> => {
  return http.delete('/tags', { data })
}

export const updateTag = (nodeID: number, group_config_name: string, tag: TagForm) => {
  return http.put('/tags', {
    node_id: nodeID,
    group_config_name,
    tags: [tag],
  })
}

/* PLUGIN */

export const queryPluginList = (): Promise<AxiosResponse<{ plugin_libs: Array<CreatedPlugin> }>> => {
  return http.get('/plugin')
}

export const addPlugin = (data: PluginForm) => {
  return http.post('/plugin', data)
}

export const updatePlugin = (data: PluginForm) => {
  return http.put('/plugin', data)
}

export const deletePlugin = (id: number) => {
  return http.delete('/plugin', { data: { id } })
}
