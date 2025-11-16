// src/contexts/CartContext.tsx
import React, { createContext, useState, useContext, type ReactNode } from 'react';

interface CartItem {
  matchId: string;
  category: string;
  quantity: number;
  price: number;
 
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (matchId: string, category: string) => void;
  updateQuantity: (matchId: string, category: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (matchId: string, category: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.matchId === matchId && item.category === category)
    ));
  };

  const updateQuantity = (matchId: string, category: string, quantity: number) => {
    setCartItems(prev => prev.map(item =>
      item.matchId === matchId && item.category === category
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};