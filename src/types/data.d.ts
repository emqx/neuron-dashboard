export interface TagDataInMonitoring {
  id: number
  value: number
}

export interface WriteData {
  node_id: number
  group_config_name: string
  tags: Array<TagDataInMonitoring>
}
