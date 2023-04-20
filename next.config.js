/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  publicRuntimeConfig: {
    alchemyKey: process.env.ALCHEMY_KEY,
    etherscanKey: process.env.ETHERSCAN_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exercise',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
