// src/services/stadiumsService.ts
import { apiClient } from './api';

export const stadiumsService = {
  getAllStadiums: async () => {
    const newLocal = await apiClient.getStadiums();
    return newLocal;
  },

  getStadiumById: async (id: string) => {
    // Si votre API a un endpoint pour un stade spécifique
    try {
      const response = await fetch(`https://worldcup2026.shrp.dev/stadiums/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Stade non trouvé');
      return response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Méthodes utilitaires
  getStadiumsByCountry: (stadiums: any[], country: string) => {
    return stadiums.filter(stadium => 
      stadium.country?.toLowerCase().includes(country.toLowerCase())
    );
  },

  getStadiumsByCity: (stadiums: any[], city: string) => {
    return stadiums.filter(stadium => 
      stadium.city?.toLowerCase().includes(city.toLowerCase())
    );
  }
};