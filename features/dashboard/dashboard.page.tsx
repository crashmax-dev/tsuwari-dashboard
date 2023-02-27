import { Box, Text } from '@mantine/core'
import { useProfile } from '@/hooks/useProfile'
import { useI18n } from 'next-rosetta'

export const DashboardPage = () => {
  const { t } = useI18n()
  const { profile } = useProfile()

  return (
    <Box>
      <Text>{t('dashboard.widgets.bot.title')}</Text>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Box>
  )
}
