import type { I18nActiveNamespaces } from '@/libs/i18n'

export type DashboardConfig = {
  // Define namespaces in use in both the type and the config.
  i18nNamespaces: I18nActiveNamespaces<'common' | 'dashboard'>
}

export const dashboardConfig: DashboardConfig = {
  /** Namespaces that should be loaded for this page */
  i18nNamespaces: ['common', 'dashboard']
}
