import { atom, useAtom } from 'jotai'
import { profileAtom } from './useProfile'

const dashboardIdAtom = atom(async (get) => get(profileAtom))

export const useDashboard = () => {
  const [dashboardId] = useAtom(dashboardIdAtom)

  return {
    dashboardId
  }
}
