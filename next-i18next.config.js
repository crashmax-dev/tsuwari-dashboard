// /hooks/useLocale.tsx
const defaultLocale = 'en'

/** @type {import('next-i18next').UserConfig} */
const i18nConfig = {
  i18n: {
    defaultLocale,
    locales: ['en', 'ru'],
    localeDetection: false
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./locales')
      : undefined
}

module.exports = { defaultLocale }
module.exports = i18nConfig
