// Configuración de variables de entorno
export const config = {
  // Variables públicas (accesibles en el cliente)
  public: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'Universidad Nacional de Ingeniería',
    youtubeChannelId: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '@UNIdeNicaragua',
    uniRadioUrl: process.env.NEXT_PUBLIC_UNI_RADIO_URL || 'https://www.uni.edu.ni/radio',
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  
  // Variables del servidor (solo disponibles en el servidor)
  server: {
    databaseUrl: process.env.DATABASE_URL,
    apiSecretKey: process.env.API_SECRET_KEY,
  },
  
  // Variables de entorno generales
  env: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  }
};


export const getPublicConfig = () => config.public;

export const getServerConfig = () => config.server;

export const isDevelopment = () => config.env.isDevelopment;

export const isProduction = () => config.env.isProduction; 