import { LogType } from '@/types/enums'
import http from '@/utils/http'
import { AxiosResponse } from 'axios'

export const queryLog = (data: {
  since: number
  until: number
  level?: LogType
  page: number
  page_size: number
}): Promise<AxiosResponse<{ error: number; rows: Array<string> }>> => {
  return http.get('/log', { params: data })
}
