/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@rentorgin/core-domain'],
  env: {
    NEXT_PUBLIC_APP_VERSION: '0.4.0',
  },
  // i18n is handled client-side via LanguageContext (App Router does not support next.config i18n)
};

module.exports = nextConfig;











