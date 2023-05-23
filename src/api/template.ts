import http from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { RawTemplateData, TemplateFormData, GroupData } from '@/types/config'

export const queryTemplateList = async (): Promise<Array<RawTemplateData>> => {
  const { data }: AxiosResponse<{ error: number; templates: Array<RawTemplateData> }> = await http.get('/template')
  return Promise.resolve(data?.templates || [])
}

// without name，delete all
export const deleteTemplate = async (templateName?: string): Promise<AxiosResponse> => {
  return http.delete('/template', {
    params: { name: templateName },
  })
}

export const createTemplate = async (data: TemplateFormData): Promise<AxiosResponse> => {
  return http.post('/template', data)
}

export const updateTemplate = async (data: TemplateFormData): Promise<AxiosResponse> => {
  return http.post('/template', data)
}

export const getTemplateDetailByName = async (templateName: string): Promise<AxiosResponse> => {
  return http.get('/template', { params: { name: templateName } })
}

/* GROUP */
export const queryGroupList = async (templateName: string): Promise<Array<GroupData>> => {
  const { data }: AxiosResponse<{ error: number; groups: Array<GroupData> }> = await http.get('/template/group', {
    params: { name: templateName },
  })
  return Promise.resolve((data?.groups || []).map((item) => ({ ...item, group: item.name })))
}

export const deleteGroup = async (templateName: string, groupName: string): Promise<AxiosResponse> => {
  return http.delete('/template/group', {
    data: { template: templateName, group: groupName },
  })
}
