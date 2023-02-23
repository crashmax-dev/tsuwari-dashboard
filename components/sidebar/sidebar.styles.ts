import { createStyles } from '@mantine/core'

export const useSidebarStyles = createStyles((theme) => ({
  link: {
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  }
}))
