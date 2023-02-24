import type { ColorScheme } from '@mantine/core'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import type { ReactNode } from 'react'

type GetLayout = (page: ReactNode) => ReactNode

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout
}

export type AppProps<P = {}> = NextAppProps<P> & {
  locale: string
  colorScheme: ColorScheme
  Component: Page<P>
}
