// src/services/matchesService.ts
import { apiClient } from './api';

export const matchesService = {
  getAllMatches: async () => {
    return await apiClient.getMatches();
  },

  getMatchById: async (id: string) => {
    // Si votre API a un endpoint pour un match spécifique
    const response = await fetch(`https://worldcup2026.shrp.dev/matches/${id}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Match non trouvé');
    return response.json();
  },

  // Méthodes utilitaires pour les filtres
  filterByTeam: (matches: any[], teamName: string) => {
    return matches.filter(match => 
      match.home_team?.name?.toLowerCase().includes(teamName.toLowerCase()) ||
      match.away_team?.name?.toLowerCase().includes(teamName.toLowerCase())
    );
  },

  filterByDate: (matches: any[], date: string) => {
    return matches.filter(match => 
      match.date && match.date.startsWith(date)
    );
  },

  filterByGroup: (matches: any[], group: string) => {
    return matches.filter(match => match.group === group);
  }
};