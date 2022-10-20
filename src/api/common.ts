import type { AxiosResponse } from 'axios'
import http from '@/utils/http'

export const login = (data: { name: string; pass: string }): Promise<AxiosResponse<{ token: string }>> => {
  return http.post('/login', data)
}
export const changePassword = (data: {
  name: string
  old_pass: string
  new_pass: string
}): Promise<AxiosResponse<any>> => {
  return http.post('/password', data)
}
