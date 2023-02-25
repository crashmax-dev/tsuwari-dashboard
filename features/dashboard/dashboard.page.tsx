import { useTranslation } from 'next-i18next'
import { Box, Text } from '@mantine/core'
import { useAtom } from 'jotai'
import { dashboardConfig } from './dashboard.config'
import { profileAtom } from './profile'

export const DashboardPage = () => {
  const [value] = useAtom(profileAtom)
  const { t } = useTranslation(dashboardConfig.i18nNamespaces)

  // if (value.state === 'hasError') {
  //   return <Text>{value.error as string}</Text>
  // }

  // if (value.state === 'loading') {
  //   return <Text>Loading...</Text>
  // }

  return (
    <Box>
      <Text>{t('dashboard:widgets.bot.title')}</Text>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Box>
  )
}
