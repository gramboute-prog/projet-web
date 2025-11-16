// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { useCart } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // États pour le formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const subtotal = getCartTotal();
  const serviceFee = 5.00;
  const total = subtotal + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulation de traitement de paiement
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  const handleContinueShopping = () => {
    navigate('/matches');
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (cartItems.length === 0 && !isSuccess) {
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
        <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>🛒</div>
        <h1 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>Panier vide</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Votre panier est vide. Ajoutez des billets avant de procéder au paiement.
        </p>
        <button 
          onClick={handleContinueShopping}
          style={{
            background: 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Voir les matchs
        </button>
      </div>
    );
  }

  if (isSuccess) {
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
          animation: 'bounce 0.6s'
        }}>
          ✅
        </div>
        <h1 style={{ 
          color: '#4CAF50', 
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}>
          Paiement Réussi !
        </h1>
        <p style={{ 
          color: '#666', 
          fontSize: '1.2rem',
          marginBottom: '0.5rem',
          maxWidth: '500px'
        }}>
          Félicitations ! Votre commande a été traitée avec succès.
        </p>
        <p style={{ 
          color: '#666', 
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}>
          Un email de confirmation a été envoyé à <strong>{formData.email}</strong>
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={handleContinueShopping}
            style={{
              background: 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🏆 Voir plus de matchs
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              color: '#a2d2ff',
              border: '2px solid #a2d2ff',
              padding: '1rem 2rem',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🏠 Page d'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: '#ff6b9d', 
        textAlign: 'center',
        marginBottom: '0.5rem',
        fontSize: '2.5rem'
      }}>
        💳 Paiement
      </h1>
      <p style={{ 
        textAlign: 'center', 
        color: '#666',
        marginBottom: '3rem',
        fontSize: '1.1rem'
      }}>
        Finalisez votre commande en remplissant vos informations
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 400px', 
        gap: '3rem',
        alignItems: 'start'
      }}>
        
        {/* Formulaire de paiement */}
        <div>
          <form onSubmit={handleSubmit}>
            {/* Informations personnelles */}
            <div style={{
              background: 'white',
              border: '2px solid #ffd1dc',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ 
                color: '#ff6b9d', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👤 Informations personnelles
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Code postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Pays *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      background: 'white'
                    }}
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informations de carte */}
            <div style={{
              background: 'white',
              border: '2px solid #ffd1dc',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ 
                color: '#ff6b9d', 
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💳 Informations de paiement
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                  Numéro de carte *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    Date d'expiration *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500' }}>
                  Nom sur la carte *
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b9d'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              <button 
                type="button"
                onClick={handleBackToCart}
                style={{
                  background: 'transparent',
                  color: '#ff6b9d',
                  border: '2px solid #ff6b9d',
                  padding: '1rem 2rem',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                ← Retour au panier
              </button>
              
              <button 
                type="submit"
                disabled={isProcessing}
                style={{
                  background: isProcessing 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 3rem',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  minWidth: '200px'
                }}
              >
                {isProcessing ? (
                  <span>⏳ Traitement...</span>
                ) : (
                  <span>✅ Payer {total.toFixed(2)} €</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Récapitulatif de commande */}
        <div>
          <div style={{
            border: '2px solid #a2d2ff',
            borderRadius: '16px',
            padding: '2rem',
            background: 'white',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ 
              color: '#a2d2ff', 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              📋 Récapitulatif
            </h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#333', marginBottom: '1rem' }}>Vos billets:</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map(item => (
                  <div key={`${item.matchId}-${item.category}`} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.8rem 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                        Match #{item.matchId}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>
                        {item.category} × {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#ff6b9d' }}>
                      {(item.price * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.8rem',
              borderTop: '2px solid #eee',
              paddingTop: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Frais de service:</span>
                <span>{serviceFee.toFixed(2)} €</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: 'bold', 
                fontSize: '1.2rem',
                color: '#ff6b9d',
                borderTop: '1px solid #eee',
                paddingTop: '0.8rem'
              }}>
                <span>Total:</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <div style={{ 
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#666'
            }}>
              🔒 Paiement sécurisé SSL. Vos données sont protégées.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;