import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { getCookie, setCookie } from 'cookies-next'
import i18nConfig from '../next-i18next.config'
import type { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'

interface Props extends AppProps {
  locale: string
  colorScheme: ColorScheme
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
          <Component {...pageProps} />
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
