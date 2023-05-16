import http from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { RawTemplateDate } from '@/types/config'

export const queryTemplateList = async (): Promise<Array<RawTemplateDate>> => {
  const { data }: AxiosResponse<{ error: number; templates: Array<RawTemplateDate> }> = await http.get('/template')
  return Promise.resolve(data?.templates || [])
}
