export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_BREAMCRUMBS = 'breamcrumbs'

export const getToken = (): string | null => window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

export const setToken = (token: string): void => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const clearToken = (): void => {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export const setBreamcrumbs = (breamcrumbs: any): void => {
  window.localStorage.setItem(LOCAL_STORAGE_BREAMCRUMBS, JSON.stringify(breamcrumbs))
}
export const getBreamcrumbs = (): any => {
  const bcs: any = window.localStorage.getItem(LOCAL_STORAGE_BREAMCRUMBS)
  return JSON.parse(bcs)
}

export const clearLocalStorage = () => localStorage.clear()
