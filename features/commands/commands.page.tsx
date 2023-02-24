import { useTranslation } from 'next-i18next'
import { Box, Text } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { commandsConfig } from './commands.config'

interface User {
  id: number
  name: string
}

const idAtom = atom(1)
const [userAtom] = atomsWithQuery((get) => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    return (await res.json()) as User
  }
}))

export const CommandsPage = () => {
  const { t } = useTranslation(commandsConfig.i18nNamespaces)
  const [user] = useAtom(userAtom)

  return (
    <Box>
      <Text>{t('commands:title')}</Text>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  )
}
