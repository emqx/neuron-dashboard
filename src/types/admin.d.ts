export interface License {
  license_type: string
  valid: boolean
  valid_since: string
  valid_until: string
  max_nodes: number
  max_node_tags: number
  enabled_plugins: Array<string>
  used_nodes: number
  used_tags: number
  hardware_token: string
  object: string
  email_address: string
  nodesUsage?: number
  tagsUsage?: number
}
