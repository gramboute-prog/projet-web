// src/services/groupsService.ts
import { apiClient } from './api';

export const groupsService = {
  getAllGroups: async () => {
    return await apiClient.getGroups();
  },

  getGroupById: async (id: string) => {
    // Si votre API a un endpoint pour un groupe spécifique
    try {
      const response = await fetch(`https://worldcup2026.shrp.dev/groups/${id}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Groupe non trouvé');
      return response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Méthodes utilitaires
  getGroupByLetter: (groups: any[], letter: string) => {
    return groups.find(group => group.letter === letter);
  },

  getTeamsByGroup: (groups: any[], groupLetter: string) => {
    const group = groups.find(g => g.letter === groupLetter);
    return group ? group.teams : [];
  }
};