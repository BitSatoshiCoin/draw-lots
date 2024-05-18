import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ipfs.io',
      port: '',
      pathname: '/ipfs/**',
    }]
  }
};

export default withNextIntl(nextConfig);