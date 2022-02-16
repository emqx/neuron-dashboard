import { LogType } from '@/types/enums'
import http from '@/utils/http'

export const queryLog = (data: {
  since: number | undefined
  until: number | undefined
  level: LogType | ''
}): Promise<{ error: number; rows: Array<string> }> => {
  return http.get('/log', { data })
}
