import { accessTokenKey } from '@/utils/constants'

/**
 * @returns Access token on success or Reponse object on error
 */
export const refreshAccessToken = async (): Promise<Response | string> => {
  const response = await fetch('/api/auth/token', { method: 'POST' })

  if (!response.ok) {
    localStorage.removeItem(accessTokenKey)
    return response
  }

  const { accessToken } = (await response.json()) as { accessToken: string }
  localStorage.setItem(accessTokenKey, accessToken)
  return accessToken
}
