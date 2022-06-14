import { TagDataInMonitoring, WriteData } from '@/types/data'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'

export const getMonitoringData = (
  nodeName: string,
  groupName: string,
): Promise<AxiosResponse<{ tags: Array<TagDataInMonitoring> }>> => {
  return http.post('/read', {
    node: nodeName,
    group: groupName,
  })
}

export const writeData = (data: WriteData) => {
  return http.post('/write', data)
}
