import type commands from './en/commands.json'
import type common from './en/common.json'
import type dasboard from './en/dashboard.json'
import type events from './en/events.json'
import type greetings from './en/greetings.json'
import type integrations from './en/integrations.json'
import type keywords from './en/keywords.json'
import type layout from './en/layout.json'
import type moderation from './en/moderation.json'
import type settings from './en/settings.json'
import type songRequestSettings from './en/song-requests-settings.json'
import type timers from './en/timers.json'
import type variables from './en/variables.json'

export interface I18nResources {
  commands: typeof commands
  common: typeof common
  dashboard: typeof dasboard
  events: typeof events
  greetings: typeof greetings
  integrations: typeof integrations
  keywords: typeof keywords
  layout: typeof layout
  moderation: typeof moderation
  settings: typeof settings
  'song-request-settings': typeof songRequestSettings
  timers: typeof timers
  variables: typeof variables
}
