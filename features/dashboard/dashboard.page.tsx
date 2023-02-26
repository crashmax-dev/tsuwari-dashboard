import { useTranslation } from 'next-i18next'
import { Box, Text } from '@mantine/core'
import { useProfile } from '@/hooks/useProfile'
import { dashboardConfig } from './dashboard.config'

export const DashboardPage = () => {
  const { t } = useTranslation(dashboardConfig.i18nNamespaces)
  const { profile } = useProfile()

  return (
    <Box>
      <Text>{t('dashboard:widgets.bot.title')}</Text>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Box>
  )
}
