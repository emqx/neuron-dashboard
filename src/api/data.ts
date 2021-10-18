import { TagDataInMonitoring, WriteData } from '@/types/data'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'

export const getMonitoringData = (
  nodeID: number,
  groupName: string,
): Promise<AxiosResponse<{ tags: Array<TagDataInMonitoring> }>> => {
  return http.post('/read', {
    node_id: nodeID,
    group_config_name: groupName,
  })
}

export const writeData = (data: AxiosResponse<{ tags: Array<TagDataInMonitoring> }>) => {
  return http.post('/write', data)
}
