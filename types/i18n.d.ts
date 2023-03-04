type Commands = typeof import('../locales/en/commands.json')
type Common = typeof import('../locales/en/common.json')
type Dashboard = typeof import('../locales/en/dashboard.json')
type Events = typeof import('../locales/en/events.json')
type Greetings = typeof import('../locales/en/greetings.json')
type Integrations = typeof import('../locales/en/integrations.json')
type Keywords = typeof import('../locales/en/keywords.json')
type Layout = typeof import('../locales/en/layout.json')
type Moderation = typeof import('../locales/en/moderation.json')
type Settings = typeof import('../locales/en/settings.json')
type SongRequestsSettings =
  typeof import('../locales/en/song-requests-settings.json')
type Timers = typeof import('../locales/en/timers.json')
type Variables = typeof import('../locales/en/variables.json')

type Messages = {
  commands: Commands
  common: Common
  dashboard: Dashboard
  events: Events
  greetings: Greetings
  integrations: Integrations
  keywords: Keywords
  layout: Layout
  moderation: Moderation
  settings: Settings
  'song-requests-settings': SongRequestsSettings
  timers: Timers
  variables: Variables
}

// Use type safe message keys with `next-intl`
declare interface IntlMessages extends Messages {}
