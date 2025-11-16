// src/pages/MatchesPage.tsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import { useCart } from '../contexts/cartContext'; // ← IMPORT AJOUTÉ

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // ← HOOK PANIER

  // Prix par catégorie
  const ticketPrices = {
    'Catégorie 1': 89.99,
    'Catégorie 2': 69.99,
    'Catégorie 3': 49.99
  };

  useEffect(() => {
    const loadMatches = async () => {
      try {
        console.log('🔄 Chargement des matchs...');
        const matchesData = await apiClient.getMatches();
        console.log('✅ Matchs chargés:', matchesData);
        setMatches(matchesData);
      } catch (err) {
        console.error('❌ Erreur:', err);
        setError('Impossible de charger les matchs');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  // FONCTION AJOUT AU PANIER
  const handleAddToCart = (match: any, category: string, price: number) => {
    addToCart({
      matchId: match.id,
      category: category,
      quantity: 1,
      price: price
    });
    alert(`Billet ${category} ajouté au panier pour ${match.home_team?.name} vs ${match.away_team?.name}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b9d' }}>⏳ Chargement des matchs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b9d' }}>❌ {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff6b9d', textAlign: 'center' }}>⚽ Matchs ({matches.length})</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {matches.map((match: any) => (
          <div key={match.id} style={{ 
            border: '2px solid #ffd1dc',
            borderRadius: '12px',
            padding: '1.5rem',
            background: 'white'
          }}>
            {/* En-tête du match */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2rem' }}>{match.home_team?.flag || '🏴'}</div>
                <div style={{ fontWeight: 'bold' }}>{match.home_team?.name || 'Équipe A'}</div>
              </div>
              
              <div style={{ 
                background: '#ff6b9d', 
                color: 'white', 
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontWeight: 'bold'
              }}>
                VS
              </div>
              
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2rem' }}>{match.away_team?.flag || '🏴'}</div>
                <div style={{ fontWeight: 'bold' }}>{match.away_team?.name || 'Équipe B'}</div>
              </div>
            </div>
            
            {/* Infos du match */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', fontSize: '0.9rem' }}>
              <div>📅 {match.date ? new Date(match.date).toLocaleDateString('fr-FR') : 'Date inconnue'}</div>
              <div>🏟️ {match.stadium?.name || 'Stade inconnu'}</div>
              <div>🎫 <strong>{match.available_seats || 0} places disponibles</strong></div>
            </div>

            {/* SECTION AJOUT AU PANIER */}
            <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
              <h4 style={{ color: '#ff6b9d', marginBottom: '0.5rem', fontSize: '1rem' }}>
                🎟️ Billets disponibles:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(ticketPrices).map(([category, price]) => (
                  <div key={category} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.5rem',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>{category}</span>
                    <span style={{ fontWeight: 'bold', color: '#ff6b9d' }}>{price} €</span>
                    <button 
                      onClick={() => handleAddToCart(match, category, price)}
                      style={{
                        background: '#ff6b9d',
                        color: 'white',
                        border: 'none',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}
                    >
                      Ajouter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
          <p>Aucun match disponible.</p>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;