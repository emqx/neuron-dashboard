import { AxiosResponse } from 'axios'
import http, { handleError } from '@/utils/http'

export const login = (data: { name: string; pass: string }): Promise<AxiosResponse<{ token: string }>> => {
  return http.post('/login', data)
}
