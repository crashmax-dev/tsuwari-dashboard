import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { useHydrateAtoms } from 'jotai/utils'
import { apiKeyAtom } from '@/hooks/useProfile'
import { getCookie, setCookie } from '@/libs/cookie'
import { NotificationsProvider } from '@/libs/notification/provider'
import i18nConfig from '../next-i18next.config'
import type { ColorScheme } from '@mantine/core'
import type { NextPageContext } from 'next'
import type { AppLayoutProps } from 'next/app'

interface Props {
  locale: string
  colorScheme: ColorScheme
  dashboardId: string
  apiKey?: string
}

const App = (props: AppLayoutProps<Props>) => {
  const { Component, pageProps } = props

  useHydrateAtoms([[apiKeyAtom, pageProps.apiKey ?? '']])

  const getLayout = Component.getLayout ?? ((page) => page)

  const preferenceColorScheme = useColorScheme(undefined, {
    getInitialValueInEffect: true
  })

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme ?? preferenceColorScheme
  )

  const toggleColorScheme = (theme?: ColorScheme) => {
    const newColorScheme = theme || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(newColorScheme)
    setCookie('color_scheme', newColorScheme)
  }

  useEffect(() => {
    if (!props.colorScheme) {
      toggleColorScheme(preferenceColorScheme)
    }
  }, [preferenceColorScheme])

  return (
    <>
      <Head>
        <title>Tsuwari Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="icon"
          href="/tsuwari-logo.svg"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }: { ctx: NextPageContext }) => {
  return {
    locale: getCookie('locale', ctx),
    colorScheme: getCookie('color_scheme', ctx),
    dashboardId: getCookie('dashboard_id', ctx)
  }
}

export default appWithTranslation(App, i18nConfig)
