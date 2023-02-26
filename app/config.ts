export const isDev = process.env.NODE_ENV === 'development'
export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_API_URL ?? 'http://localhost:3005/api'
export const apiKey = process.env.NEXT_PUBLIC_API_KEY
export const isSsr = typeof window === 'undefined'
export const accessTokenKey = 'access_token'
