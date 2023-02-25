import { useTranslation } from 'next-i18next'
import { Box, Text } from '@mantine/core'
import { dashboardConfig } from './dashboard.config'

export const DashboardPage = () => {
  const { t } = useTranslation(dashboardConfig.i18nNamespaces)

  return (
    <Box>
      <Text>{t('dashboard:widgets.bot.title')}</Text>
    </Box>
  )
}
