import type { Match, MatchFilters } from '../types';
import type { Team } from "../types/CartItem";

// Filtrage des matchs côté client (fallback si API ne filtre pas)
export const filterMatches = (matches: Match[], filters: MatchFilters): Match[] => {
  return matches.filter(match => {
    // Filtre par date
    if (filters.date) {
      const matchDate = new Date(match.date).toISOString().split('T')[0];
      if (matchDate !== filters.date) return false;
    }

    // Filtre par équipe
    if (filters.team) {
      const searchTerm = filters.team.toLowerCase();
      const hasTeam = match.teamA.name.toLowerCase().includes(searchTerm) || 
                     match.teamB.name.toLowerCase().includes(searchTerm);
      if (!hasTeam) return false;
    }

    // Filtre par groupe
    if (filters.group && match.group !== filters.group) {
      return false;
    }

    // Filtre par stade
    if (filters.stadium) {
      const searchTerm = filters.stadium.toLowerCase();
      const hasStadium = match.stadium.name.toLowerCase().includes(searchTerm) ||
                        match.stadium.city.toLowerCase().includes(searchTerm);
      if (!hasStadium) return false;
    }

    return true;
  });
};

// Tri des matchs par date
export const sortMatchesByDate = (matches: Match[]): Match[] => {
  return matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Regroupement des équipes par continent
export const groupTeamsByContinent = (teams: Team[]): Record<string, Team[]> => {
  return teams.reduce((acc, team) => {
    if (!acc[team.continent]) {
      acc[team.continent] = [];
    }
    acc[team.continent].push(team);
    return acc;
  }, {} as Record<string, Team[]>);
};

// Regroupement des équipes par groupe
export const groupTeamsByGroup = (teams: Team[]): Record<string, Team[]> => {
  return teams.reduce((acc, team) => {
    if (!acc[team.group]) {
      acc[team.group] = [];
    }
    acc[team.group].push(team);
    return acc;
  }, {} as Record<string, Team[]>);
};

// Calcul du total du panier
export const calculateCartTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Vérification de la disponibilité des billets
export const checkTicketAvailability = (available: number, requested: number): boolean => {
  return requested <= available;
};

// Génération d'ID unique
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Délai simulé (pour tests)
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};