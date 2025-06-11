/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Add webpack configuration to handle caching issues
  webpack: (config, { dev, isServer }) => {
    // Disable caching in development to prevent ENOENT errors
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;