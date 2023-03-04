import { useTranslations } from 'next-intl'
import { Box, Text } from '@mantine/core'
import { useProfile } from '@/hooks/useProfile'

export function DashboardPage() {
  const t = useTranslations('dashboard')
  const { profile } = useProfile()

  return (
    <Box>
      <Text>{t('widgets.bot.title')}</Text>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </Box>
  )
}
