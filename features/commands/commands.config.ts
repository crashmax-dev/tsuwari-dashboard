import type { I18nActiveNamespaces } from '@/libs/i18n'

export type CommandsConfig = {
  // Define namespaces in use in both the type and the config.
  i18nNamespaces: I18nActiveNamespaces<'commands' | 'layout'>
}

export const commandsConfig: CommandsConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['commands', 'layout']
}
