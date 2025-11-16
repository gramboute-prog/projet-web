// src/services/ordersService.ts

export interface OrderItem {
  matchId: string;
  category: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  items: OrderItem[];
  total: number;
}

export const ordersService = {
  createOrder: async (orderData: OrderData) => {
    const response = await fetch('https://worldcup2026.shrp.dev/tickets/pay-pending', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création de la commande');
    }

    return response.json();
  },

  // Si vous avez d'autres endpoints pour les commandes
  getOrderHistory: async () => {
    try {
      const response = await fetch('https://worldcup2026.shrp.dev/tickets/history', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Erreur historique');
      return response.json();
    } catch (error) {
      console.error('Erreur historique commandes:', error);
      return [];
    }
  },

  getOrderById: async (orderId: string) => {
    const response = await fetch(`https://worldcup2026.shrp.dev/tickets/${orderId}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Commande non trouvée');
    return response.json();
  }
};