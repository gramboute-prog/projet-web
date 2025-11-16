import type { User } from '../types';
import type { CartItem } from '../types/CartItem';
import { STORAGE_KEYS } from './constants';

// Gestion du token d'authentification
export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  getStoredUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  setStoredUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  removeStoredUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  clearAuthData: (): void => {
    authStorage.removeToken();
    authStorage.removeStoredUser();
  }
};

// Gestion du panier
export const cartStorage = {
  getCartItems: (): CartItem[] => {
    try {
      const items = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  },

  setCartItems: (items: CartItem[]): void => {
    localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(items));
  },

  clearCart: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CART_ITEMS);
  },

  getCartItemCount: (): number => {
    const items = cartStorage.getCartItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  }
};

// Utilitaires généraux de stockage
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  }
};