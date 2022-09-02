export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_BREADCRUMB = 'breadcrumbs'

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
