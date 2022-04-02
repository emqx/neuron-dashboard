export interface TagDataInMonitoring {
  id: number
  value: any
  error: number
  name?: null | string
}

export interface WriteData {
  node_name: string
  group_config_name: string
  tags: Array<{ name: string; value: number | string }>
}
