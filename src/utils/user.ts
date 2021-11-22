export const LOCAL_STORAGE_TOKEN_KEY = 'token'

export const getToken = (): string | null => window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)

export const setToken = (token: string): void => {
  window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export const clearToken = (): void => {
  window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}
