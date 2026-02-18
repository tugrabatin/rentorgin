/**
 * API Client
 * Axios instance for API calls with auto token refresh
 * 
 * API İstemcisi
 * Otomatik token yenileme ile API çağrıları için Axios örneği
 */

import axios from 'axios';

function resolveApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') return '/api/v1';
  return 'http://localhost:3002/api/v1';
}

const API_URL = resolveApiUrl();

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
// Auth token eklemek için request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
// Hata yönetimi ve token yenileme için response interceptor
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors
    // Ağ hatalarını yönet
    if (!error.response) {
      // Network error - backend is not reachable
      // Ağ hatası - backend'e ulaşılamıyor
      const networkError = new Error(
        'Backend servisine bağlanılamıyor. Lütfen backend API\'nin çalıştığından emin olun. ' +
        `API URL: ${API_URL}`
      );
      networkError.name = 'NetworkError';
      return Promise.reject(networkError);
    }

    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    // Hata 401 ise ve henüz yenilemeyi denemedik
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        // Zaten yenileme yapılıyorsa, bu isteği sıraya al
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = typeof window !== 'undefined' 
        ? localStorage.getItem('refreshToken') 
        : null;

      if (!refreshToken) {
        // No refresh token, redirect to login
        // Refresh token yok, login'e yönlendir
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        // Try to refresh the token
        // Token'ı yenilemeyi dene
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // Update the failed requests with new token
        // Başarısız istekleri yeni token ile güncelle
        processQueue(null, accessToken);

        // Retry original request with new token
        // Orijinal isteği yeni token ile tekrar dene
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        // Yenileme başarısız, login'e yönlendir
        processQueue(refreshError, null);
        
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;

