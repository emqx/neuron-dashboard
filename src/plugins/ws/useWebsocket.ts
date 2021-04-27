import { getCurrentInstance } from '@vue/runtime-core'
import { DataSource } from '.'
import { DataSourceConfig } from './ws'

export default function useWebsocket(): {
  ws: (config?: DataSourceConfig) => DataSource
} {
  const app = getCurrentInstance()
  const ws = app?.appContext.config.globalProperties.$ws
  return {
    ws,
  }
}
