export interface TagDataInMonitoring {
  id: number
  value: any
  name?: null | string
}

export interface WriteData {
  node_id: number
  group_config_name: string
  tags: Array<TagDataInMonitoring>
}
