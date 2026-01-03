/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@rentorgin/core-domain'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api/v1',
    NEXT_PUBLIC_APP_VERSION: '0.4.0',
  },
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    localeDetection: false,
  },
};

module.exports = nextConfig;











