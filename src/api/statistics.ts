import http from '@/utils/http'
import type { AxiosResponse } from 'axios'
import type { NodeCatogery } from '@/types/enums'

/**
 *  Get Statistic（general | south node | north node）
 *  param { String } type: 'app'(north node) | 'driver'(south node) | 'global'(general)
 *  param { String } node: Optional, if you want to get the data statisctics of a node, pass in the parameter node name
 *  */
export const getStatisticByType = (
  type: NodeCatogery[keyof NodeCatogery] = 'driver',
  params = {},
): Promise<AxiosResponse<string>> => {
  return http.get(`/metrics?category=${type}`, { params })
}
