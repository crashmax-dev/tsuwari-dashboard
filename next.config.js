const nextI18nConfig = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: nextI18nConfig.i18n,
  experimental: {
    esmExternals: true,
    appDir: false
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'api_key'
          }
        ],
        permanent: false,
        destination: '/dashboard'
      }
    ]
  }
}

module.exports = nextConfig
