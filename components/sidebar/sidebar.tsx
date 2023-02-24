// import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Navbar, NavLink, ScrollArea } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { navigationLinks } from '@/configs/navigationLinks'
import { useLocale } from '@/hooks/useLocale'
// import { layoutConfig } from '../layout/layout.config'
import { useSidebarStyles } from './sidebar.styles'
import type { NavigationLink } from '@/configs/navigationLinks'

interface Props {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export function SideBar(props: Props) {
  const [links, setLinks] = useState<JSX.Element[]>([])
  const { classes } = useSidebarStyles()
  const { currentLocale } = useLocale()
  const viewPort = useViewportSize()
  const router = useRouter()
  // const { t } = useTranslation(layoutConfig.i18nNamespaces);

  const computeActive = (item: NavigationLink) => {
    if (item.subPages) {
      return router.asPath.startsWith(item.path)
    } else {
      return item.path === router.asPath
    }
  }

  const createNavLink = (item: NavigationLink, isSubPage = false) => {
    const href = item.path
      ? `dashboard/${item.path ? item.path : item.label.toLowerCase()}`
      : ''

    return (
      <NavLink
        key={item.label}
        active={computeActive(item)}
        label={item.label}
        className={isSubPage ? classes.link : ''}
        defaultOpened={item.subPages && router.asPath.startsWith(item.path)}
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
          if (item.subPages) return
          props.setOpened(false)
          router.push(href, undefined, { locale: currentLocale })
        }}
      >
        {item.subPages && item.subPages.map((p) => createNavLink(p, true))}
      </NavLink>
    )
  }

  useEffect(() => {
    setLinks(navigationLinks.map((item, i) => createNavLink(item)))
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
          maxHeight={viewPort.height - 120}
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
      </Navbar.Section>
    </Navbar>
  )
}
