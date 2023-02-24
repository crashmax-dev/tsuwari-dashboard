import { useTranslation } from 'next-i18next'
import { Suspense, useRef } from 'react'
import { Box, Button, Loader, NumberInput, Text } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { atomWithCache } from 'jotai-cache'
import { commandsConfig } from './commands.config'

interface User {
  id: number
  name: string
}

const userIdAtom = atom(1)
const cachedAtom = atomWithCache<Promise<User>>(async (get) => {
  const id = get(userIdAtom)
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  )
  return response.json()
})

export const CommandsPage = () => {
  const { t } = useTranslation(commandsConfig.i18nNamespaces)

  return (
    <Box>
      <Text>{t('commands:title')}</Text>
      <UpdateUser />
      <Suspense fallback={<Loader />}>
        <User />
      </Suspense>
    </Box>
  )
}

function User() {
  const [user] = useAtom(cachedAtom)
  return <pre>{JSON.stringify(user, null, 2)}</pre>
}

function UpdateUser() {
  const refInput = useRef<HTMLInputElement | null>(null)
  const [userId, setUserId] = useAtom(userIdAtom)

  return (
    <Box>
      <NumberInput
        value={userId}
        ref={refInput}
      ></NumberInput>
      <Button
        onClick={() => {
          setUserId(Number(refInput.current?.value))
        }}
      >
        Set userId
      </Button>
    </Box>
  )
}
