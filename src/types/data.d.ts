export interface TagDataInMonitoring {
  value: any
  error: number
  name?: null | string
}

export interface WriteData {
  node: string
  group: string
  tag: string
  value: string | number
}
