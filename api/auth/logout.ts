import { authFetcher } from '@/libs/fetcher'

export const authLogout = async () => {
  return await authFetcher('/auth/logout', { method: 'POST' })
}
