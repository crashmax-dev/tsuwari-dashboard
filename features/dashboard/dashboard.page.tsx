import { useTranslation } from 'next-i18next'
import { Text } from '@mantine/core'
import { Layout } from '@/components/layout'
import { dashboardConfig } from './dashboard.config'

export const DashboardPage = () => {
  const { t } = useTranslation(dashboardConfig.i18nNamespaces)

  return (
    <Layout>
      <Text>{t('dashboard:widgets.bot.title')}</Text>
    </Layout>
  )
}
