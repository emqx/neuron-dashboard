export interface DataSourceConfig {
  func?: number
  name?: string
  pass?: string
  success?: (data: T) => void
}
