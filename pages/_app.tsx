import { NextIntlProvider } from 'next-intl'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { getCookie, setCookie } from '@/libs/cookie'
import type { ColorScheme } from '@mantine/core'
import type { AppContext, AppProps } from 'next/app'
import { DashboardLayout } from '@/layouts/dashboard'

interface PageProps {
  i18n: IntlMessages
}

interface Props extends AppProps<PageProps> {
  locale: string
  colorScheme: ColorScheme
  dashboardId: string
  apiKey: string
}

function App(props: Props) {
  const { Component, pageProps } = props
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
          <NextIntlProvider messages={pageProps.i18n}>
            <DashboardLayout>
              <Component {...pageProps} />
              <Notifications
                position="top-center"
                limit={3}
              />
            </DashboardLayout>
          </NextIntlProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }: AppContext) => {
  return {
    locale: getCookie('locale', ctx),
    colorScheme: getCookie('color_scheme', ctx),
    dashboardId: getCookie('dashboard_id', ctx),
    apiKey: getCookie('apiKey', ctx)
  }
}

export default App
