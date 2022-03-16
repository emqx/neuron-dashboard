import { License } from '@/types/admin'
import { LogType } from '@/types/enums'
import http from '@/utils/http'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export const queryLog = (data: {
  since: number
  until: number
  level?: LogType
  page: number
  page_size: number
}): Promise<AxiosResponse<{ error: number; rows: Array<string> }>> => {
  return http.get('/log', { params: data })
}

export const queryLicense = (): Promise<AxiosResponse<License & { error: number }>> => {
  return http.get('/license', {
    _handleErrorSelf: true,
  } as AxiosRequestConfig)
}

export const uploadLicense = (license: string): Promise<AxiosResponse<{ error: 0 }>> => {
  return http.post('/license', {
    license,
  })
}
