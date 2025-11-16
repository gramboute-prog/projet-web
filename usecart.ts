// src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    // Retourner des valeurs par défaut au lieu de throw une erreur
    return {
      cartItems: [],
      addToCart: () => console.warn('CartContext non disponible'),
      removeFromCart: () => console.warn('CartContext non disponible'),
      updateQuantity: () => console.warn('CartContext non disponible'),
      clearCart: () => console.warn('CartContext non disponible'),
      getCartTotal: () => 0,
      getCartItemsCount: () => 0
    };
  }
  
  return context;
};