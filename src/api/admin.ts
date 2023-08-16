import type { License } from '@/types/admin'
import type { LogType } from '@/types/enums'
import http from '@/utils/http'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export const queryLog = (data: {
  since: number
  until: number
  level?: LogType
  page: number
  page_size: number
}): Promise<AxiosResponse<{ error: number; rows: Array<string>; page_count: number }>> => {
  return http.get('/log', { params: data })
}

export const queryLicense = (): Promise<AxiosResponse<License & { error: number }>> => {
  return http.get('/license', {
    _handleErrorSelf: true,
  } as AxiosRequestConfig)
}

/**
 * To use `_compatibleErrorCode`, please update @/utils/constants.ts file  `SELF_HANDLE_ERROR_CODES`,
 *   and use `compatible{errorCode}` to update @i18n/error.ts file.
 *  */
export const uploadLicense = (license: string): Promise<AxiosResponse<{ error: 0 }>> => {
  return http.post(
    '/license',
    {
      license,
    },
    {
      _compatibleErrorCode: true,
      name: 'uploadLicense',
    } as AxiosRequestConfig,
  )
}

export const queryVersion = (): Promise<AxiosResponse<any>> => {
  return http.get('/version')
}
export const queryHardwareToken = (): Promise<AxiosResponse<any>> => {
  return http.get('/hwtoken')
}

export const downloadLogs = (): Promise<AxiosResponse<any>> => {
  return http({
    url: '/logs',
    method: 'get',
    responseType: 'blob',
    timeout: 1800000,
  })
}
