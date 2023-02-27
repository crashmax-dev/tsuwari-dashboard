import {
  IconActivity,
  IconApps,
  IconBox,
  IconCalendarEvent,
  IconClipboardCopy,
  IconClockHour7,
  IconCommand,
  IconDashboard,
  IconHeadphones,
  IconKey,
  IconPencilPlus,
  IconPlayerPlay,
  IconPlaylist,
  IconSettings,
  IconSpeakerphone,
  IconSword,
  IconUsers
} from '@tabler/icons'
import type { TablerIcon } from '@tabler/icons'

export interface NavigationLink {
  label: string
  path: string
  icon?: TablerIcon
  subLinks?: NavigationLink[]
}

export type DashboardConfig = {
  navigationLinks: NavigationLink[]
}

export const dashboardConfig: DashboardConfig = {
  navigationLinks: [
    { label: 'Dashboard', icon: IconDashboard, path: '/' },
    { label: 'Integrations', icon: IconBox, path: '/integrations' },
    { label: 'Events', icon: IconCalendarEvent, path: '/events' },
    {
      label: 'Song Requests',
      icon: IconHeadphones,
      path: 'song-requests',
      subLinks: [
        {
          label: 'Player',
          icon: IconPlayerPlay,
          path: '/song-requests/player'
        },
        {
          label: 'Settings',
          icon: IconSettings,
          path: '/song-requests/settings'
        }
      ]
    },
    { label: 'Settings', icon: IconSettings, path: '/settings' },
    {
      label: 'Commands',
      icon: IconCommand,
      path: 'commands',
      subLinks: [
        { label: 'Custom', icon: IconPencilPlus, path: '/commands/custom' },
        { label: 'Moderation', icon: IconSword, path: '/commands/moderation' },
        {
          label: 'Song Requests',
          icon: IconPlaylist,
          path: 'commands/songrequest'
        },
        { label: 'Manage', icon: IconClipboardCopy, path: '/commands/manage' },
        { label: 'Dota', path: 'commands/dota' }
      ]
    },
    { label: 'Community', icon: IconUsers, path: '/community' },
    { label: 'Timers', icon: IconClockHour7, path: '/timers' },
    { label: 'Moderation', icon: IconSword, path: '/moderation' },
    { label: 'Keywords', icon: IconKey, path: '/keywords' },
    { label: 'Variables', icon: IconActivity, path: '/variables' },
    { label: 'Greetings', icon: IconSpeakerphone, path: '/greetings' },
    { label: 'Application', icon: IconApps, path: '/application' }
  ]
}
