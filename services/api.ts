import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuración base de Axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://uniapi.onmisales.software/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

const api: AxiosInstance = axios.create(axiosConfig);

// Interceptor de request
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // Log de peticiones en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log de respuestas en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', {
        status: response.status,
        data: response.data,
        url: response.config.url,
      });
    }
    
    return response;
  },
  (error) => {
    // Manejo centralizado de errores
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
      
      // Manejo específico por código de error
      switch (error.response.status) {
        case 401:
          // Token expirado o no autorizado
          // Aquí podrías redirigir al login o refrescar el token
          break;
        case 403:
          // Sin permisos
          console.error('Sin permisos para acceder a este recurso');
          break;
        case 404:
          console.error('Recurso no encontrado');
          break;
        case 500:
          console.error('Error interno del servidor');
          break;
        default:
          console.error('Error en la petición');
      }
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Error al configurar la petición:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Métodos helper para peticiones comunes
export const apiHelpers = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },
  
  // POST request
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },
  
  // PUT request
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  },
  
  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
  },
  
  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },
};

export default api;
