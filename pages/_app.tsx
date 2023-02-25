import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { getCookie, setCookie } from 'cookies-next'
import { Provider } from 'jotai'
import { NotificationsProvider } from '@/libs/notification/provider'
import i18nConfig from '../next-i18next.config'
import type { ColorScheme } from '@mantine/core'
import type { GetServerSidePropsContext } from 'next'
import type { AppLayoutProps } from 'next/app'

function App(props: AppLayoutProps) {
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
          <NotificationsProvider>
            <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  return {
    locale: getCookie('locale', ctx),
    colorScheme: getCookie('color_scheme', ctx)
  }
}

export default appWithTranslation(App, i18nConfig)
