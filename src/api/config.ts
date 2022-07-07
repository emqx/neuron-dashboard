import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DriverDirection, NodeOperationCommand } from '@/types/enums'
import http from '@/utils/http'
import {
  APP_DO_NOT_NEED_SHOW,
  DASHBOARD_APP_NAME,
  NORTH_DRIVER_NODE_TYPE,
  SOUTH_DRIVER_NODE_TYPE,
} from '@/utils/constants'
import {
  CreatedPlugin,
  RawDriverData,
  GroupData,
  GroupForm,
  NodeForm,
  PluginInfo,
  PluginForm,
  ResponseDriverListData,
  SubscriptionData,
  TagData,
  TagForm,
} from '@/types/config'

/* NODE(DRIVER & APP) */

const queryDriverList = (nodeType: number): Promise<AxiosResponse<ResponseDriverListData>> => http.get('/node', { params: { type: nodeType } })

const getDataFromResponse = (res: AxiosResponse<ResponseDriverListData>): Array<RawDriverData> => res?.data?.nodes || []

export const queryNorthDriverList = async (): Promise<Array<RawDriverData>> => {
  try {
    const retArr: Array<AxiosResponse<ResponseDriverListData>> = await Promise.all(
      NORTH_DRIVER_NODE_TYPE.map((code) => queryDriverList(code)),
    )
    const northList = retArr
      .reduce((arr: Array<RawDriverData>, currentData) => arr.concat(getDataFromResponse(currentData)), [])
      .filter((item) => !APP_DO_NOT_NEED_SHOW.includes(item.name))
    return Promise.resolve(northList)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const querySouthDriverList = async (): Promise<Array<RawDriverData>> => {
  try {
    const retArr: Array<AxiosResponse<ResponseDriverListData>> = await Promise.all(
      SOUTH_DRIVER_NODE_TYPE.map((code) => queryDriverList(code)),
    )
    return Promise.resolve(
      retArr.reduce((arr: Array<RawDriverData>, currentData) => arr.concat(getDataFromResponse(currentData)), []),
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const queryWebDriver = async (): Promise<RawDriverData> => {
  try {
    const retArr: Array<AxiosResponse<ResponseDriverListData>> = await Promise.all(
      NORTH_DRIVER_NODE_TYPE.map((code) => queryDriverList(code)),
    )
    const webDriver = retArr
      .reduce((arr: Array<RawDriverData>, currentData) => arr.concat(getDataFromResponse(currentData)), [])
      .find((item) => item.name === DASHBOARD_APP_NAME)
    if (!webDriver) {
      throw new Error()
    }
    return Promise.resolve(webDriver)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const addDriver = (driverData: NodeForm) => http.post('/node', driverData)

export const deleteDriver = (node: string) => http.delete('/node', { data: { name: node } })

// USELESS
export const updateDriver = (data: { id: number; name: string }) => http.put('/node', data)

export const sendCommandToNode = (nodeName: string, command: NodeOperationCommand) => http.post('/node/ctl', { node: nodeName, cmd: command })

export const queryNodeState = (nodeName: string) => http.get('/node/state', { params: { node: nodeName } })

/* NORTH APP */
export const addSubscription = (data: SubscriptionData) => http.post('/subscribe', data)

export const deleteSubscription = (data: SubscriptionData) => http.delete('/subscribe', { data })

export const querySubscription = async (node: string): Promise<Array<SubscriptionData>> => {
  try {
    const { data }: AxiosResponse<{ groups: Array<{ driver: string; group: string }> }> = await http.get('/subscribe', {
      params: { app: node },
    })
    return Promise.resolve(
      (data.groups || []).map((item) => ({
        ...item,
        app: node,
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
export const queryPluginConfigInfo = (name: string): Promise<AxiosResponse<PluginInfo>> => http.get('/schema', { params: { plugin_name: name } })

export const submitNodeConfig = (node: string, form: Record<string, any>) => http.post('/node/setting', {
  node,
  params: form,
})

export const queryNodeConfig = async (node: string) => {
  try {
    const data = await http.get('/node/setting', {
      params: { node },
      _handleCustomError: true,
    } as AxiosRequestConfig)
    return Promise.resolve(data)
  } catch (error: any) {
    if (error.status === 200) {
      return Promise.resolve(error)
    }
    return Promise.reject(error)
  }
}

/* GROUP */

export const queryGroupList = async (node: string): Promise<Array<GroupData>> => {
  const { data }: AxiosResponse<{ error: number; groups: Array<GroupData> }> = await http.get('/group', {
    params: { node },
  })
  return Promise.resolve((data?.groups || []).map((item) => ({ ...item, group: item.name })))
}

export const deleteGroup = async (node: string, groupName: string): Promise<AxiosResponse> => http.delete('/group', {
  data: { node, group: groupName },
})

export const addGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { group, interval, node } = data
  return http.post('/group', {
    group,
    node,
    interval: Number(interval),
  })
}

export const updateGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { group, interval, node } = data
  return http.put('/group', {
    group,
    node,
    interval: Number(interval),
    app: 1,
  })
}

/* TAG */

export const queryTagList = async (node: string, groupName: string): Promise<Array<TagData>> => {
  const { data } = await http.get('/tags', { params: { node, group: groupName } })
  return Promise.resolve(data.tags || [])
}

export const addTag = (data: { node: string; group: string; tags: Array<TagForm> }) => http.post('/tags', data, { _handleCustomError: true } as AxiosRequestConfig)

export const deleteTag = (data: { node: string; group: string; tags: Array<string> }): Promise<AxiosResponse> => http.delete('/tags', { data })

export const updateTag = (node: string, group: string, tag: TagForm) => http.put('/tags', {
  node,
  group,
  tags: [tag],
})

/* PLUGIN */

export const queryPluginList = (): Promise<AxiosResponse<{ plugins: Array<CreatedPlugin> }>> => http.get('/plugin')

export const addPlugin = (data: PluginForm) => http.post('/plugin', data)

export const updatePlugin = (data: PluginForm) => http.put('/plugin', data)

export const deletePlugin = (pluginName: string) => http.delete('/plugin', { data: { plugin: pluginName } })
