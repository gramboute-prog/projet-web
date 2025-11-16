// src/services/apiConfig.ts - CRÉEZ CE FICHIER
const API_BASE_URL = 'https://worldcup2026.shrp.dev';

export const api = {
  // ==================== ÉQUIPES ====================
  getTeams: async () => {
    const response = await fetch(`${API_BASE_URL}/teams`);
    return response.json();
  },

  // ==================== MATCHES ====================
  getMatches: async () => {
    const response = await fetch(`${API_BASE_URL}/matches`);
    return response.json();
  },

  getMatch: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    return response.json();
  },

  // ==================== GROUPES ====================
  getGroups: async () => {
    const response = await fetch(`${API_BASE_URL}/groups`);
    return response.json();
  },

  // ==================== STADES ====================
  getStadiums: async () => {
    const response = await fetch(`${API_BASE_URL}/stadiums`);
    return response.json();
  },

  // ==================== AUTH ====================
  signIn: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signUp: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
};