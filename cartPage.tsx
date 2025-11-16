// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart, updateQuantity, removeFromCart, getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/matches');
  };

  const handleQuantityChange = (matchId: string, category: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(matchId, category, newQuantity);
  };

  const handleRemoveItem = (matchId: string, category: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      removeFromCart(matchId, category);
    }
  };

  const totalItems = getCartItemsCount();
  const subtotal = getCartTotal();
  const serviceFee = 5.00;
  const total = subtotal + serviceFee;

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: '6rem', 
          marginBottom: '2rem',
          opacity: 0.7
        }}>🛒</div>
        <h1 style={{ 
          color: '#ff6b9d', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          Votre panier est vide
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.2rem',
          marginBottom: '2rem',
          maxWidth: '400px'
        }}>
          Ajoutez des tickets pour les matchs qui vous intéressent et vivez l'expérience Coupe du Monde 2026 !
        </p>
        <button 
          onClick={handleContinueShopping}
          style={{
            background: 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 3rem',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
          }}
        >
          🏆 Voir les matchs disponibles
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      {/* En-tête */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          color: '#ff6b9d', 
          fontSize: '3rem',
          marginBottom: '0.5rem'
        }}>
          🛒 Mon Panier
        </h1>
        <p style={{ 
          color: '#666',
          fontSize: '1.2rem'
        }}>
          {totalItems} article{totalItems > 1 ? 's' : ''} dans votre panier
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 400px', 
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* Articles du panier */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #ffd1dc'
          }}>
            <h2 style={{ 
              color: '#ff6b9d', 
              margin: 0,
              fontSize: '1.8rem'
            }}>
              Vos billets
            </h2>
            <button 
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir vider tout votre panier ?')) {
                  clearCart();
                }
              }}
              style={{
                background: 'transparent',
                color: '#ff4757',
                border: '1px solid #ff4757',
                padding: '0.7rem 1.5rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#ff4757';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ff4757';
              }}
            >
              🗑️ Vider le panier
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={`${item.matchId}-${item.category}`} style={{
                border: '2px solid #ffd1dc',
                borderRadius: '16px',
                padding: '2rem',
                background: 'white',
                boxShadow: '0 4px 20px rgba(255, 107, 157, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 107, 157, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 107, 157, 0.1)';
              }}
              >
                {/* En-tête de l'article */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  marginBottom: '1.5rem' 
                }}>
                  <div>
                    <h3 style={{ 
                      margin: 0, 
                      color: '#ff6b9d',
                      fontSize: '1.4rem',
                      marginBottom: '0.5rem'
                    }}>
                      Match #{item.matchId}
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      color: '#666',
                      fontSize: '1rem'
                    }}>
                      Catégorie: <strong>{item.category}</strong>
                    </p>
                  </div>
                  <span style={{
                    background: 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
                    color: 'white',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 10px rgba(255, 107, 157, 0.3)'
                  }}>
                    {item.price} € / billet
                  </span>
                </div>
                
                {/* Contrôles de quantité et prix */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: '#ff6b9d',
                      fontSize: '1.3rem'
                    }}>
                      Total: {(item.price * item.quantity).toFixed(2)} €
                    </div>
                    <div style={{ 
                      color: '#888',
                      fontSize: '0.9rem',
                      marginTop: '0.3rem'
                    }}>
                      {item.quantity} billet{item.quantity > 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Contrôle de quantité */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      background: '#fff5f8', 
                      padding: '0.7rem 1rem',
                      borderRadius: '25px',
                      border: '1px solid #ffd1dc'
                    }}>
                      <button 
                        onClick={() => handleQuantityChange(item.matchId, item.category, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{
                          background: item.quantity <= 1 ? '#ccc' : '#ff6b9d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.background = '#ff85a2';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.background = '#ff6b9d';
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        -
                      </button>
                      <span style={{ 
                        fontWeight: 'bold', 
                        minWidth: '40px', 
                        textAlign: 'center',
                        fontSize: '1.1rem',
                        color: '#333'
                      }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.matchId, item.category, item.quantity + 1)}
                        disabled={item.quantity >= 6}
                        style={{
                          background: item.quantity >= 6 ? '#ccc' : '#ff6b9d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          cursor: item.quantity >= 6 ? 'not-allowed' : 'pointer',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          if (item.quantity < 6) {
                            e.currentTarget.style.background = '#ff85a2';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (item.quantity < 6) {
                            e.currentTarget.style.background = '#ff6b9d';
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Bouton supprimer */}
                    <button 
                      onClick={() => handleRemoveItem(item.matchId, item.category)}
                      style={{
                        background: 'transparent',
                        color: '#ff4757',
                        border: '2px solid #ff4757',
                        padding: '0.7rem 1.5rem',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#ff4757';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#ff4757';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Récapitulatif */}
        <div>
          <div style={{
            border: '2px solid #a2d2ff',
            borderRadius: '20px',
            padding: '2rem',
            background: 'white',
            position: 'sticky',
            top: '2rem',
            boxShadow: '0 4px 20px rgba(162, 210, 255, 0.2)'
          }}>
            <h3 style={{ 
              color: '#a2d2ff', 
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
              textAlign: 'center'
            }}>
              💰 Récapitulatif de commande
            </h3>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Articles:</span>
                <span style={{ fontWeight: 'bold' }}>{totalItems}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#666' }}>Frais de service:</span>
                <span>{serviceFee.toFixed(2)} €</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderTop: '2px solid #eee', 
                paddingTop: '1rem', 
                fontWeight: 'bold', 
                fontSize: '1.3rem',
                color: '#ff6b9d'
              }}>
                <span>Total:</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={handleCheckout}
                style={{
                  background: 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.2rem 2rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 107, 157, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 157, 0.3)';
                }}
              >
                💳 Procéder au paiement
              </button>
              
              <button 
                onClick={handleContinueShopping}
                style={{
                  background: 'transparent',
                  color: '#a2d2ff',
                  border: '2px solid #a2d2ff',
                  padding: '1rem 2rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#a2d2ff';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#a2d2ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ← Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;