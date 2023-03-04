import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Group,
  Navbar,
  NavLink,
  ScrollArea,
  Text,
  UnstyledButton
} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { dashboardConfig } from '@/features/dashboard'
import { useTheme } from '@/hooks'
import { useLocale } from '@/hooks/useLocale'
import { useSidebarStyles } from './sidebar.styles'
import type { NavigationLink } from '@/features/dashboard'

interface Props {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const SideBar = (props: Props) => {
  const [links, setLinks] = useState<JSX.Element[]>([])
  const { classes } = useSidebarStyles()
  const { currentLocale } = useLocale()
  const viewPort = useViewportSize()
  const router = useRouter()
  const { theme } = useTheme()
  const t = useTranslations()

  const computeActive = (item: NavigationLink) => {
    if (item.subLinks) {
      return router.asPath.startsWith(item.path)
    } else {
      return item.path === router.asPath
    }
  }

  const createNavLink = (item: NavigationLink, isSubPage = false) => {
    const href = `/dashboard${item.path === '/' ? '' : item.path}`

    return (
      <NavLink
        key={item.label}
        active={computeActive(item)}
        label={item.label}
        className={isSubPage ? classes.link : ''}
        defaultOpened={item.subLinks && router.asPath.startsWith(item.path)}
        icon={
          item.icon ? (
            <item.icon
              size={16}
              stroke={1.5}
            />
          ) : (
            ''
          )
        }
        sx={{ width: '100%' }}
        component="a"
        href={href}
        onClick={(event) => {
          event.preventDefault()
          if (item.subLinks) return
          props.setOpened(false)
          router.push(href, undefined, { locale: currentLocale })
        }}
      >
        {item.subLinks && item.subLinks.map((p) => createNavLink(p, true))}
      </NavLink>
    )
  }

  useEffect(() => {
    setLinks(
      dashboardConfig.navigationLinks.map((item, i) => createNavLink(item))
    )
  }, [router])

  return (
    <Navbar
      zIndex={99}
      hiddenBreakpoint="sm"
      hidden={!props.opened}
      width={{ sm: 250 }}
    >
      <Navbar.Section grow>
        <ScrollArea.Autosize
          mah={viewPort.height - 120}
          type="auto"
          offsetScrollbars={true}
          styles={{
            viewport: {
              padding: 0
            }
          }}
        >
          <Box
            component={ScrollArea}
            sx={{ width: '100%' }}
          >
            {links}
          </Box>
        </ScrollArea.Autosize>
        <Navbar.Section>
          <Box
            sx={{
              padding: theme.spacing.sm,
              borderTop: `1px solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`
            }}
          >
            <UnstyledButton
              sx={{
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black,

                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0]
                }
              }}
              // onClick={openSpotlight}
            >
              <Group>
                {/* <Avatar src="" radius="xl" /> */}
                <Box sx={{ flex: 1 }}>
                  <Text
                    size="xs"
                    weight={500}
                  >
                    {t('layout.sidebar.manage')}
                  </Text>
                  <Text
                    color="dimmed"
                    size="xs"
                  >
                    VS_Code
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>
          </Box>
        </Navbar.Section>
      </Navbar.Section>
    </Navbar>
  )
}
