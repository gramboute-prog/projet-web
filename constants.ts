// URLs de l'API
export const API_BASE_URL = 'https://api.monde-cup-2026.com';

// Clés de stockage local
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  CART_ITEMS: 'worldcup-cart',
  USER_DATA: 'userData'
};

// Continents disponibles
export const CONTINENTS = [
  'Europe',
  'Amérique du Sud',
  'Amérique du Nord',
  'Afrique',
  'Asie',
  'Océanie'
];

// Groupes de la compétition
export const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// Catégories de billets
export const TICKET_CATEGORIES = [
  'Catégorie 1',
  'Catégorie 2',
  'Catégorie 3'
];

// Prix par catégorie
export const TICKET_PRICES = {
  'Catégorie 1': 150,
  'Catégorie 2': 100,
  'Catégorie 3': 50
};

// Limites de réservation
export const BOOKING_LIMITS = {
  MIN_TICKETS: 1,
  MAX_TICKETS_PER_MATCH: 6,
  MAX_TICKETS_PER_ORDER: 10
};

// Statuts de commande
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled'
} as const;