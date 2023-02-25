import { useState } from 'react'
import { AppShell, useMantineTheme } from '@mantine/core'
import { NavBar } from '@/layouts/dashboard/components/navbar'
import { SideBar } from '@/layouts/dashboard/components/sidebar'

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const theme = useMantineTheme()
  const [sidebarOpened, setSidebarOpened] = useState(false)

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          width: '100%'
        }
      }}
      navbar={
        <SideBar
          opened={sidebarOpened}
          setOpened={setSidebarOpened}
        />
      }
      header={
        <NavBar
          setOpened={setSidebarOpened}
          opened={sidebarOpened}
        />
      }
    >
      {children}
    </AppShell>
  )
}
