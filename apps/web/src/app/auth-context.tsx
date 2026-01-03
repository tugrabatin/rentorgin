/**
 * Authentication Context
 * Global state for user authentication
 * 
 * Kimlik Doğrulama Bağlamı
 * Kullanıcı kimlik doğrulama için global durum
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenantId: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  // Mount'ta kullanıcının kimliği doğrulanmış mı kontrol et
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Load user profile
  // Kullanıcı profilini yükle
  const loadUser = async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  // Kullanıcı girişi
  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user: userData } = response.data;

      // Store tokens
      // Token'ları sakla
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setUser(userData);
      router.push('/dashboard');
    } catch (error: any) {
      // Better error handling
      // Daha iyi hata yönetimi
      console.error('Login error:', error);
      
      let errorMessage = 'Giriş başarısız oldu.';
      
      if (error.name === 'NetworkError' || error.message?.includes('Network Error') || !error.response) {
        errorMessage = 'Backend servisine bağlanılamıyor. Lütfen backend API\'nin çalıştığından emin olun. ' +
                      `API URL: ${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}`;
      } else if (error.response?.status === 401) {
        errorMessage = 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  };

  // Register user
  // Kullanıcı kaydı
  const register = async (data: RegisterData) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      const { accessToken, refreshToken, user: userData } = response.data;

      // Store tokens
      // Token'ları sakla
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setUser(userData);
      router.push('/dashboard');
    } catch (error: any) {
      // Better error handling
      // Daha iyi hata yönetimi
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Kayıt başarısız oldu. Lütfen tekrar deneyin.';
      console.error('Registration error:', error);
      throw new Error(errorMessage);
    }
  };

  // Logout user
  // Kullanıcı çıkışı
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  // Refresh access token
  // Access token'ı yenile
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('refreshToken');
      if (!token) {
        throw new Error('No refresh token');
      }

      const response = await apiClient.post('/auth/refresh', {
        refreshToken: token,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
// Auth context kullanmak için hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

