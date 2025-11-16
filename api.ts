// src/services/api.ts
const API_BASE = 'https://worldcup2026.shrp.dev';

export const apiClient = {
  // NOUVELLE ROUTE - Tout en un !
  async getMatchesWithAvailability() {
    const response = await fetch(`${API_BASE}/matches/availability`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Erreur matches');
    const result = await response.json();
    return result.data; // ← RETOURNEZ data DIRECTEMENT
  },

  // Anciennes routes (au cas où)
  async getMatches() {
    const response = await fetch(`${API_BASE}/matches`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Erreur matches');
    const result = await response.json();
    return result.data; // ← RETOURNEZ data DIRECTEMENT
  },

  async getTeams() {
    const response = await fetch(`${API_BASE}/teams`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Erreur teams');
    const result = await response.json();
    return result.data; // ← RETOURNEZ data DIRECTEMENT
  },

  async getGroups() {
    const response = await fetch(`${API_BASE}/groups`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Erreur groups');
    const result = await response.json();
    return result.data; // ← RETOURNEZ data DIRECTEMENT
  },

  async getStadiums() {
    const response = await fetch(`${API_BASE}/stadiums`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Erreur stadiums');
    const result = await response.json();
    return result.data; // ← RETOURNEZ data DIRECTEMENT
  },

  // Auth
  async signin(email: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Erreur connexion');
    const result = await response.json();
    return result.data || result; // ← Adapté pour l'auth
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE}/auth/me`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Non connecté');
    const result = await response.json();
    return result.data || result; // ← Adapté pour l'auth
  }
};