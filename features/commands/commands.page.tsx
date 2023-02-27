import { Box, Text } from '@mantine/core'
import { useI18n } from 'next-rosetta'

export const CommandsPage = () => {
  const { t } = useI18n()
  return (
    <Box>
      <Text>{t('commands.title')}</Text>
    </Box>
  )
}
