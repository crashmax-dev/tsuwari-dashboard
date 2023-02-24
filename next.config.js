const nextI18nConfig = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: nextI18nConfig.i18n,
  experimental: {
    esmExternals: true
  },
  rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard'
      }
    ]
  }
}

module.exports = nextConfig
