/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.spoonacular.com', 'spoonacular.com'],
  },
  reactStrictMode: false, // disable because of API quota
};

export default nextConfig;
