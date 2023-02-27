import { I18nProvider } from 'next-rosetta'
import Head from 'next/head'
import { Suspense, useEffect, useState } from 'react'
import { ColorSchemeProvider, Loader, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { getCookie, setCookie } from '@/libs/cookie'
import { NotificationsProvider } from '@/libs/notification/provider'
import type { ColorScheme } from '@mantine/core'
import type { NextPageContext } from 'next'
import type { AppLayoutProps } from 'next/app'

interface Props {
  locale: string
  colorScheme: ColorScheme
  dashboardId: string
  apiKey?: string
  i18n: any
}

const App = (props: AppLayoutProps<Props>) => {
  const { Component, pageProps } = props
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
          <I18nProvider table={pageProps.i18n}>
            <NotificationsProvider>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </I18nProvider>
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

export default App
