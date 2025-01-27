import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.spoonacular.com',
      },
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
      },
    ],
  },
  reactStrictMode: false, // disable because of API quota
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default withPlaiceholder(nextConfig);
