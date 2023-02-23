import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { RU, US } from 'country-flag-icons/react/3x2'
import { i18n } from '../next-i18next.config'

const DEFAULT_LOCALE = 'en'
const LOCALE_COOKIE_KEY = 'locale'
const ICON_SIZE = 14
export const LOCALES = new Map([
  ['en', { name: 'English', icon: <US style={{ height: ICON_SIZE }} /> }],
  ['ru', { name: 'Russian', icon: <RU style={{ height: ICON_SIZE }} /> }]
])

export const useLocale = () => {
  const router = useRouter()
  const [locale, setLocale] = useState(
    () => getCookie(LOCALE_COOKIE_KEY) as string
  )

  const toggleLocale = (locale = DEFAULT_LOCALE) => {
    setLocale(locale)
    setCookie(LOCALE_COOKIE_KEY, locale)
  }

  useEffect(() => {
    if (!locale) {
      toggleLocale()
    }

    if (i18n.locales.includes(locale)) {
      const { pathname, asPath, query } = router
      if (query.code || query.token) return
      router.push({ pathname, query }, asPath, { locale })
    } else {
      toggleLocale()
    }
  }, [locale])

  return {
    currentLocale: locale,
    locales: i18n.locales,
    toggleLocale
  }
}
