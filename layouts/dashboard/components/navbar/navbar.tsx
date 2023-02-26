import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import {
  ActionIcon,
  Box,
  Burger,
  Container,
  Flex,
  Group,
  Header,
  Menu,
  Text
} from '@mantine/core'
import { IconLanguage, IconMoonStars, IconSun } from '@tabler/icons'
import { LOCALES, useLocale } from '@/hooks/useLocale'
import { useTheme } from '@/hooks/useTheme'
import { Profile } from '../profile'
import { useNavbarStyles } from './navbar.styles'

export const NavBar = ({
  opened,
  setOpened
}: {
  setOpened: Dispatch<SetStateAction<boolean>>
  opened: boolean
}) => {
  const { classes } = useNavbarStyles()
  const { theme, colorScheme, toggleColorScheme } = useTheme()
  const { currentLocale, toggleLocale } = useLocale()

  return (
    <Header height={60}>
      <Container
        maw="unset"
        className={classes.header}
      >
        <Flex
          gap="sm"
          justify="flex-start"
          align="center"
          direction="row"
        >
          <Burger
            className={classes.hiddenDesktop}
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
          <Box
            display="flex"
            className={classes.hiddenMobile}
          >
            <Image
              src="/tsuwari-logo.svg"
              width={30}
              height={30}
              alt="Tsuwari Logo"
            />
            <Text
              component="span"
              ml="sm"
              sx={{
                color: 'white',
                fontFamily: 'Golos Text, sans-serif'
              }}
              fz="xl"
              fw={500}
            >
              {/* brandName */}
            </Text>
          </Box>
        </Flex>
        <Group position="center">
          <ActionIcon
            size="lg"
            variant="default"
            color={colorScheme === 'dark' ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {colorScheme === 'dark' ? (
              <IconSun size={18} />
            ) : (
              <IconMoonStars size={18} />
            )}
          </ActionIcon>
          <Menu
            transition="pop"
            shadow="md"
            withArrow
            width={200}
          >
            <Menu.Target>
              <ActionIcon
                size="lg"
                title="Toggle language"
                variant="default"
              >
                <IconLanguage size={18} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Change language</Menu.Label>
              <Menu.Divider />
              {Array.from(LOCALES.entries()).map(([lang, { icon, name }]) => (
                <Menu.Item
                  style={{
                    fontWeight: lang === currentLocale ? 'bold' : 'initial'
                  }}
                  icon={icon}
                  key={lang}
                  onClick={() => toggleLocale(lang)}
                >
                  {name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
          <Profile />
        </Group>
      </Container>
    </Header>
  )
}
