import http from '@/utils/http'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import type { RawTemplateData, TemplateFormData, GroupData, TemplateGroupForm, TagData, TagForm } from '@/types/config'

/**
 * Template
 */
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

/**
 * Group
 */
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

export const addGroup = async (data: TemplateGroupForm): Promise<AxiosResponse> => {
  const { group, interval, template } = data
  return http.post('/template/group', {
    group,
    template,
    interval: Number(interval),
  })
}

export const updateGroup = async (data: TemplateGroupForm): Promise<AxiosResponse> => {
  const { group, interval, template } = data
  return http.put('/template/group', {
    group,
    template,
    interval: Number(interval),
  })
}

/**
 * Tags
 */
export const queryTagList = async (params = {}): Promise<Array<TagData>> => {
  const { data } = await http.get('/template/tag', { params })
  return Promise.resolve(data.tags || [])
}

export const deleteTag = (data: { template: string; group: string; tags: Array<string> }): Promise<AxiosResponse> => {
  return http.delete('/template/tag', { data })
}

export const addTag = (data: { template: string; group: string; tags: Array<TagForm> }) => {
  return http.post('/template/tag', data, { _handleCustomError: true } as AxiosRequestConfig)
}
