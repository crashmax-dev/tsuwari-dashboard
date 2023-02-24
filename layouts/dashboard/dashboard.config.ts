import type { I18nActiveNamespaces } from '@/libs/i18n'

export type DashboardLayoutConfig = {
  // Define namespaces in use in both the type and the config.
  i18nNamespaces: I18nActiveNamespaces<'layout'>
}

export const dashboardLayoutConfig: DashboardLayoutConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['layout']
}
