import { atom, useAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { authLogout } from '@/api/auth/logout'
import { authFetcher } from '@/libs/fetcher'
import type { Profile } from '@/api/auth/profile'

export const profileAtom = loadable(
  atom(async () => await authFetcher<Profile>('/auth/profile'))
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
