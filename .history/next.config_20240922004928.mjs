/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.spoonacular.com', 'spoonacular.com'],
  },
  webpack: {
    fs: false,
  },
};

export default nextConfig;
