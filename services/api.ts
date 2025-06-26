import { getPublicConfig } from '@/lib/config';


const config = getPublicConfig();

export const createEndpoint = (path: string) => {
  return `${config.apiUrl}${path}`;
};

// Función helper para obtener la URL base
export const getBaseUrl = () => config.baseUrl;

export const getApiUrl = () => config.apiUrl;