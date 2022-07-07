import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { License } from '@/types/admin'
import { LogType } from '@/types/enums'
import http from '@/utils/http'

export const queryLog = (data: {
  since: number
  until: number
  level?: LogType
  page: number
  page_size: number
}): Promise<AxiosResponse<{ error: number; rows: Array<string>; page_count: number }>> => http.get('/log', { params: data })

export const queryLicense = (): Promise<AxiosResponse<License & { error: number }>> => http.get('/license', {
  _handleErrorSelf: true,
} as AxiosRequestConfig)

export const uploadLicense = (license: string): Promise<AxiosResponse<{ error: 0 }>> => http.post('/license', {
  license,
})

export const queryVersion = (): Promise<AxiosResponse<any>> => http.get('/version')
