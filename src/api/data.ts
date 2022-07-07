import { AxiosResponse } from 'axios'
import { TagDataInMonitoring, WriteData } from '@/types/data'
import http from '@/utils/http'

export const getMonitoringData = (
  nodeName: string,
  groupName: string,
): Promise<AxiosResponse<{ tags: Array<TagDataInMonitoring> }>> => http.post('/read', {
  node: nodeName,
  group: groupName,
})

export const writeData = (data: WriteData) => http.post('/write', data)
