import { AuthUser } from '@tsuwari/shared'
import { authFetcher } from '@/libs/fetcher'

export interface Profile extends AuthUser {
  apiKey: string
}

export const getProfile = async () => {
  return await authFetcher<Profile>('/auth/profile')
}
