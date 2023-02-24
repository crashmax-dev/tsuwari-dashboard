import Document, { Head, Html, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'
import { i18n } from '../next-i18next.config'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
