import type { ColorScheme } from '@mantine/core'
import type { NextPage, PageLayoutProps } from 'next'
import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

declare module 'next' {
  type GetLayout = (page: ReactNode) => ReactNode

  export type PageLayoutProps<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: GetLayout
  }
}

declare module 'next/app' {
  export type AppLayoutProps<P = {}> = AppProps<P> & {
    locale: string
    colorScheme: ColorScheme
    Component: PageLayoutProps<P>
  }
}
