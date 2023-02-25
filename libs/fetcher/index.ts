// import { errorNotification } from '@/libs/notification'

import { apiKey, baseUrl, isDev, isSSR } from '@/app/config'
import { combineHeaders } from './combineHeaders'
import { combineURLs } from './combineURLs'
import { FetcherError } from './FetcherError'

// Local storage key
const ACCESS_TOKEN_KEY = 'access_token'

/**
 * Wrapper for fetch function with bearer token authorization
 */
export const authFetch = async (
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<Response> => {
  // Boolean value reflecting whether there was an attempt
  // to refresh the token
  let isTryiedRefresh = false

  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (accessToken == null) {
    const result = await refreshAccessToken()
    if (typeof result !== 'string') return result

    accessToken = result
    isTryiedRefresh = true
  }

  const execute = async (token: string) => {
    return await fetch(url, {
      ...options,
      headers: combineHeaders(options?.headers!, {
        Authorization: `Bearer ${token}`
      })
    })
  }

  let response = await execute(accessToken)

  if (response.status == 401 && !isTryiedRefresh) {
    const result = await refreshAccessToken()
    if (typeof result != 'string') return result

    accessToken = result
    response = await execute(accessToken)
  }

  return response
}

/**
 * @returns Access token on success or Reponse object on error
 */
const refreshAccessToken = async (): Promise<Response | string> => {
  const response = await fetch('/api/auth/token', { method: 'POST' })

  if (!response.ok) {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    return response
  }

  const { accessToken } = (await response.json()) as { accessToken: string }
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  return accessToken
}

const createFetcher = (
  fetcher: typeof fetch,
  baseUrl?: string | null,
  apiKey?: string
) => {
  return async <T = any>(url: string, options?: RequestInit) => {
    if (isSSR) return

    const input = baseUrl ? combineURLs(baseUrl, url) : url
    const init = apiKey
      ? {
          ...options,
          headers: combineHeaders(options?.headers!, { 'api-key': apiKey })
        }
      : options
    const response = await fetcher(input, init)

    const isJson = response.headers
      .get('content-type')
      ?.startsWith('application/json')
    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      throw new FetcherError(data, response.status)
    }

    return data as T
  }
}

export const fetcher = createFetcher(fetch)
export const authFetcher = isDev
  ? createFetcher(fetch, baseUrl, apiKey)
  : createFetcher(authFetch)
