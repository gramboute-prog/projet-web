// Formatage de date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Formatage de date et heure
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatage d'heure
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatage de prix
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Formatage de nombre (capacité du stade)
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('fr-FR').format(number);
};

// Formatage du nom du stade avec ville
export const formatStadiumLocation = (stadium: { name: string; city: string; country: string }): string => {
  return `${stadium.name}, ${stadium.city} (${stadium.country})`;
};

// Formatage du nom des équipes pour l'affichage
export const formatMatchTeams = (teamA: { name: string }, teamB: { name: string }): string => {
  return `${teamA.name} vs ${teamB.name}`;
};

// Raccourcissement de texte
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};