// src/services/authService.ts
import { apiClient } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const authService = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    return await apiClient.signin(credentials.email, credentials.password);
  },

  register: async (credentials: RegisterData): Promise<AuthResponse> => {
    const response = await fetch('https://worldcup2026.shrp.dev/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'inscription');
    }

    return response.json();
  },

  getCurrentUser: async () => {
    return await apiClient.getCurrentUser();
  },

  logout: async () => {
    // Si votre API a un endpoint de déconnexion
    try {
      await fetch('https://worldcup2026.shrp.dev/auth/signout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.log('Déconnexion effectuée');
    }
  }
};