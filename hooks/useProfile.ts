import { atom, useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { authLogout } from '@/api/auth/logout'
import { authFetcher } from '@/libs/fetcher'
import type { Profile } from '@/api/auth/profile'

export const apiKeyAtom = atom('')

export const profileAtom = loadable(
  atom(async (get) => {
    const headers = new Headers()
    const apiKeyAtomValue = get(apiKeyAtom)
    if (apiKeyAtomValue) {
      headers.set('api-key', apiKeyAtomValue)
    }

    return await authFetcher<Profile>('/auth/profile', { headers })
  })
)

export const useProfile = () => {
  const [profile] = useAtom(profileAtom)

  const logout = async () => {
    await authLogout()
  }

  return {
    profile,
    logout
  }
}
