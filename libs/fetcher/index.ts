import { errorNotification } from '@/libs/notification'
import {
  accessTokenKey,
  apiKey,
  baseUrl,
  isDev,
  isServer
} from '@/utils/constants'
import { combineHeaders } from './combineHeaders'
import { combineURLs } from './combineURLs'
import { FetcherError } from './FetcherError'
import { refreshAccessToken } from './refreshAccessToken'

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

  let accessToken = localStorage.getItem(accessTokenKey)
  if (accessToken === null) {
    const result = await refreshAccessToken()
    if (typeof result !== 'string') return result

    accessToken = result
    isTryiedRefresh = true
  }

  const execute = async (token: string) => {
    return await fetch(url, {
      ...options,
      headers: combineHeaders(options?.headers ?? {}, {
        Authorization: `Bearer ${token}`
      })
    })
  }

  let response = await execute(accessToken)

  if (response.status == 401 && !isTryiedRefresh) {
    const result = await refreshAccessToken()
    if (typeof result !== 'string') return result

    accessToken = result
    response = await execute(accessToken)
  }

  return response
}

const createFetcher = (fetcher: typeof fetch, baseUrl?: string | null) => {
  return async <T = any>(url: string, options?: RequestInit) => {
    if (isServer()) return

    try {
      const input = baseUrl ? combineURLs(baseUrl, url) : url
      const init = isDev()
        ? {
            ...options,
            headers: combineHeaders(options?.headers ?? {}, {
              'api-key': apiKey!
            })
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
    } catch (err) {
      const { message, messages } = err as FetcherError
      errorNotification(messages ?? message)
    }
  }
}

export const fetcher = createFetcher(fetch)
export const authFetcher = createFetcher(fetch, baseUrl)
