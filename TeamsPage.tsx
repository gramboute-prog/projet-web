// src/pages/Teamspage.tsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

interface Team {
  id: number;
  name: string;
  code: string;
  confederation: string;
  flag?: string;
}

// Mapping des confédérations vers des noms plus lisibles
const CONFEDERATION_NAMES: { [key: string]: string } = {
  'UEFA': 'Europe',
  'CONMEBOL': 'Amérique du Sud', 
  'CONCACAF': 'Amérique du Nord/Centrale',
  'CAF': 'Afrique',
  'AFC': 'Asie',
  'OFC': 'Océanie'
};

const Teamspage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les filtres
  const [selectedConfederation, setSelectedConfederation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔄 Chargement des équipes...');
        const teamsData = await apiClient.getTeams();
        console.log('✅ Données reçues:', teamsData);
        
        if (Array.isArray(teamsData)) {
          setTeams(teamsData);
          setFilteredTeams(teamsData);
        } else {
          console.error('❌ Données invalides:', teamsData);
          setError('Format de données invalide');
        }
      } catch (err) {
        console.error('❌ Erreur:', err);
        setError(err instanceof Error ? err.message : 'Impossible de charger les équipes');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  // Appliquer les filtres et le tri
  useEffect(() => {
    let result = [...teams];
    
    // Filtre par confédération
    if (selectedConfederation !== 'all') {
      result = result.filter(team => team.confederation === selectedConfederation);
    }
    
    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(team => 
        team.name.toLowerCase().includes(term) ||
        team.code.toLowerCase().includes(term)
      );
    }
    
    // Tri des résultats
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'confederation':
          return a.confederation.localeCompare(b.confederation);
        case 'code':
          return a.code.localeCompare(b.code);
        default:
          return 0;
      }
    });
    
    setFilteredTeams(result);
  }, [teams, selectedConfederation, searchTerm, sortBy]);

  // Obtenir les confédérations uniques pour le filtre
  const uniqueConfederations = Array.from(new Set(teams.map(team => team.confederation)));

  // Fonction pour obtenir le chemin du drapeau - MAINTENANT EN MAJUSCULES
  const getFlagImage = (teamCode: string) => {
    const flagPath = `/flags/${teamCode}.png`; // MAJUSCULES !
    console.log(`🔍 Chargement: ${flagPath}`);
    return flagPath;
  };

  // Composant pour afficher le drapeau avec fallback
  const FlagDisplay: React.FC<{ team: Team }> = ({ team }) => {
    const [imgError, setImgError] = useState(false);
    const flagPath = getFlagImage(team.code);

    return (
      <div style={{ 
        height: '60px', 
        marginBottom: '1rem', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        {!imgError ? (
          <img 
            src={flagPath}
            alt={`Drapeau ${team.name}`}
            style={{ 
              width: '80px', 
              height: '60px', 
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}
            onError={() => {
              console.log(`❌ Drapeau non trouvé: ${flagPath}`);
              setImgError(true);
            }}
            onLoad={() => {
              console.log(`✅ Drapeau chargé: ${flagPath}`);
            }}
          />
        ) : (
          <div style={{ 
            width: '80px', 
            height: '60px', 
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem'
          }}>
            {team.flag || '🏴'}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b9d' }}>⏳ Chargement des équipes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b9d' }}>❌ {error}</h2>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#ff6b9d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        color: '#ff6b9d', 
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        🏴‍☠️ Équipes ({filteredTeams.length})
      </h1>

      {/* Barre de filtres */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        border: '2px solid #ffd1dc'
      }}>
        {/* Filtre par continent */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
            🌍 Continent
          </label>
          <select
            value={selectedConfederation}
            onChange={(e) => setSelectedConfederation(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '2px solid #ffd1dc',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            <option value="all">Tous les continents</option>
            {uniqueConfederations.map(confed => (
              <option key={confed} value={confed}>
                {CONFEDERATION_NAMES[confed] || confed}
              </option>
            ))}
          </select>
        </div>

        {/* Barre de recherche */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
            🔍 Recherche
          </label>
          <input
            type="text"
            placeholder="Nom ou code de l'équipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '2px solid #ffd1dc',
              borderRadius: '6px',
              width: '200px'
            }}
          />
        </div>

        {/* Tri */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', color: '#333', fontSize: '0.9rem' }}>
            📊 Trier par
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '2px solid #ffd1dc',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="name">Nom</option>
            <option value="confederation">Continent</option>
            <option value="code">Code</option>
          </select>
        </div>

        {/* Bouton reset */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '600', color: 'transparent', fontSize: '0.9rem' }}>
            Reset
          </label>
          <button
            onClick={() => {
              setSelectedConfederation('all');
              setSearchTerm('');
              setSortBy('name');
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {uniqueConfederations.map(confed => (
          <div 
            key={confed} 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: selectedConfederation === confed ? '#ff6b9d' : '#e9ecef',
              color: selectedConfederation === confed ? 'white' : '#333',
              borderRadius: '20px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setSelectedConfederation(selectedConfederation === confed ? 'all' : confed)}
          >
            {CONFEDERATION_NAMES[confed] || confed}: {teams.filter(t => t.confederation === confed).length}
          </div>
        ))}
      </div>

      {/* Grille des équipes */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '1.5rem'
      }}>
        {filteredTeams.map((team: Team) => (
          <div 
            key={team.id} 
            style={{ 
              border: '2px solid #ffd1dc',
              borderRadius: '12px',
              padding: '1.5rem',
              background: 'white',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 157, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FlagDisplay team={team} />
            
            <h3 style={{ 
              color: '#333', 
              marginBottom: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              {team.name}
            </h3>
            
            <div style={{ color: '#666', fontSize: '0.9rem' }}>
              <div>🌍 {CONFEDERATION_NAMES[team.confederation] || team.confederation}</div>
              <div>🏷️ Code: {team.code}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Aucune équipe ne correspond aux filtres.</p>
          <button 
            onClick={() => {
              setSelectedConfederation('all');
              setSearchTerm('');
              setSortBy('name');
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#ff6b9d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Afficher toutes les équipes ({teams.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Teamspage;