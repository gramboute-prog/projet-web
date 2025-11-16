// src/services/teamsService.ts
import { apiClient } from './api';

export const teamsService = {
  getAllTeams: async () => {
    return await apiClient.getTeams();
  },

  getTeamById: async (id: string) => {
    // Si votre API a un endpoint pour une équipe spécifique
    try {
      const response = await fetch(`https://worldcup2026.shrp.dev/teams/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Équipe non trouvée');
      return response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Méthodes utilitaires pour les filtres
  filterByContinent: (teams: any[], continent: string) => {
    return teams.filter(team => 
      team.continent?.toLowerCase() === continent.toLowerCase()
    );
  },

  filterByGroup: (teams: any[], group: string) => {
    return teams.filter(team => team.group === group);
  },

  searchTeams: (teams: any[], searchTerm: string) => {
    return teams.filter(team => 
      team.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};