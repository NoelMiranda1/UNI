import axios from 'axios';

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds base delay

export const api = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
  },
  timeout: 30000 // Increased to 30 second timeout
});

// Enhanced response interceptor with retry logic
api.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    
    if (error.response?.status === 429 && !config._retry) {
      config._retry = true;
      config._retryCount = config._retryCount || 0;
      
      if (config._retryCount < MAX_RETRIES) {
        config._retryCount++;
        
        // Calculate exponential backoff delay
        const delay = BASE_DELAY * Math.pow(2, config._retryCount - 1);
        
        console.warn(`Rate limit exceeded. Retrying in ${delay}ms... (Attempt ${config._retryCount}/${MAX_RETRIES})`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return api.request(config);
      }
    }
    
    return Promise.reject(error);
  }
);