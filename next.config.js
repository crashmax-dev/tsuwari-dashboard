/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false
  },
  experimental: {
    esmExternals: true,
    appDir: false
  }
}

module.exports = nextConfig
