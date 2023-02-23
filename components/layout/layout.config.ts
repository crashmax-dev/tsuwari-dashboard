import type { I18nActiveNamespaces } from '@/libs/i18n'

export type LayoutConfig = {
  // Define namespaces in use in both the type and the config.
  i18nNamespaces: I18nActiveNamespaces<'layout'>
}

export const layoutConfig: LayoutConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['layout']
}
