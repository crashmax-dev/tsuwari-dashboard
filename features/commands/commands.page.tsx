import { useTranslations } from 'next-intl'
import { Box, Text } from '@mantine/core'

export function CommandsPage() {
  const t = useTranslations('commands')
  return (
    <Box>
      <Text>{t('title')}</Text>
    </Box>
  )
}
