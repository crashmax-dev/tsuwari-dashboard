import { useTranslation } from 'next-i18next'
import { Box, Text } from '@mantine/core'
import { commandsConfig } from './commands.config'

export const CommandsPage = () => {
  const { t } = useTranslation(commandsConfig.i18nNamespaces)
  return (
    <Box>
      <Text>{t('commands:title')}</Text>
    </Box>
  )
}
