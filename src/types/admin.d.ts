export interface License {
  license_type: string
  valid: boolean
  valid_since: string
  valid_until: string
  max_nodes: number
  max_node_tags: number
  enabled_plugins: Array<string>
}
