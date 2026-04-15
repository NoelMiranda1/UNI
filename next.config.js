/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido output: 'export' para permitir SSR/ISR
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['uniapi.onmisales.software'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uniapi.onmisales.software',
        pathname: '/**',
      },
    ],
  },
  
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  publicRuntimeConfig: {
    // Variables que estarán disponibles en el cliente
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  },
  
  serverRuntimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    apiSecretKey: process.env.API_SECRET_KEY,
  },
  
  webpack: (config, { dev,  }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;