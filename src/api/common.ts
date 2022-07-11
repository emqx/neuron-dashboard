import type { AxiosResponse } from 'axios'
import http from '@/utils/http'

export const login = (data: { name: string; pass: string }): Promise<AxiosResponse<{ token: string }>> => {
  return http.post('/login', data)
}
