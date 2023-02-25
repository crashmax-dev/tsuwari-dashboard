import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
import { authLogout, getProfile } from '@/api/auth/profile'

const profile = atom(async () => await getProfile())
export const profileAtom = loadable(profile)

const logoutProfile = atom(null, async () => await authLogout())
export const logoutProfileAtom = loadable(logoutProfile)
