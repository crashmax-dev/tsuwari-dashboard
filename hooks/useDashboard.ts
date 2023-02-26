import { atom, useAtom } from 'jotai'
import { profileAtom } from './useProfile'

const dashboardIdAtom = atom((get) => get(profileAtom))

export const useDashboard = () => {
  const [dashboardId] = useAtom(dashboardIdAtom)

  return {
    dashboardId
  }
}
