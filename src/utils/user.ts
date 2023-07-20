export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_BREADCRUMB = 'breadcrumbs'
export const LOCAL_STORAGE_NODE_GROUP = 'nodeGroupData'
export const LOCAL_USER_IS_ADMIN = 'isAdmin'

export const getToken = (): string | null => window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

export const setToken = (token: string): void => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const clearToken = (): void => {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const clearLocalStorage = () => localStorage.clear()

export const setBreadcrumbFullPaths = (breadcrumbs: string): void => {
  window.localStorage.setItem(LOCAL_STORAGE_BREADCRUMB, breadcrumbs)
}
export const getBreadcrumbFullPaths = (): string => {
  const res: string = window.localStorage.getItem(LOCAL_STORAGE_BREADCRUMB) || ''
  return res
}

interface NodeGroup {
  node: string
  groupName: string
}

export const setNodeGroupData = (data: NodeGroup): void => {
  window.localStorage.setItem(LOCAL_STORAGE_NODE_GROUP, JSON.stringify(data))
}
export const getNodeGroupData = (): NodeGroup => {
  const res: NodeGroup =
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NODE_GROUP) || '{"node":"","groupName":""}') || ''
  return res
}

export const setUserRole = (data: number): void => {
  window.localStorage.setItem(LOCAL_USER_IS_ADMIN, JSON.stringify(data))
}

export const getUserRole = (): number => {
  const res = JSON.parse(window.localStorage.getItem(LOCAL_USER_IS_ADMIN) || '0')
  return res
}
