// src/pages/GroupsPage.tsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        console.log('🔄 Chargement des groupes...');
        const groupsData = await apiClient.getGroups();
        console.log('✅ Groupes chargés:', groupsData);
        
        // DEBUG: Voyons la structure
        if (groupsData && groupsData.length > 0) {
          console.log('🔍 Premier groupe:', groupsData[0]);
          console.log('🔍 Clés du premier groupe:', Object.keys(groupsData[0]));
          console.log('🔍 Équipes du premier groupe:', groupsData[0].teams);
        }
        
        setGroups(groupsData);
      } catch (err) {
        console.error('❌ Erreur:', err);
        setError('Impossible de charger les groupes');
      } finally {
        setLoading(false);
      }
    };

    loadGroups();
  }, []);

  const groupLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6b9d' }}>⏳ Chargement des groupes...</h2>
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

  
  if (groups.length === 0) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1 style={{ color: '#ff6b9d', textAlign: 'center' }}>📊 Groupes</h1>
        <p>Aucun groupe chargé.</p>
      </div>
    );
  }

  
  const currentGroup = groups.find(group => 
    group.letter === selectedGroup || 
    group.name === selectedGroup || 
    group.id === selectedGroup ||
    group.group === selectedGroup
  );

  console.log('🎯 Groupe sélectionné:', currentGroup);
  console.log('🎯 Tous les groupes:', groups);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff6b9d', textAlign: 'center' }}>📊 Groupes de la Coupe du Monde 2026</h1>
      
      
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3></h3>
        <p></p>
        <details>
          <summary></summary>
          
        </details>
      </div>

      {/* Navigation des groupes */}
      <div style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h3 style={{ color: '#ff6b9d', marginBottom: '1rem' }}>Sélectionnez un groupe</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {groupLetters.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedGroup(letter)}
              style={{
                background: selectedGroup === letter ? 
                  'linear-gradient(135deg, #ff85a2 0%, #ff6b9d 100%)' : '#f8f9fa',
                color: selectedGroup === letter ? 'white' : '#333',
                border: '2px solid #ffd1dc',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Groupe {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Affichage du groupe sélectionné */}
      <div style={{ marginTop: '2rem' }}>
        {currentGroup ? (
          <div key={currentGroup.id} style={{ 
            border: '2px solid #ffd1dc',
            borderRadius: '12px',
            padding: '2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff5f8 100%)'
          }}>
            <h2 style={{ 
              color: '#ff6b9d', 
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '2rem'
            }}>
              Groupe {currentGroup.letter || currentGroup.name || currentGroup.id}
            </h2>
            
            {/* Équipes du groupe */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              {(currentGroup.teams || []).map((team: any) => (
                <div key={team.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '10px',
                  border: '1px solid #ffe4ec'
                }}>
                  <div style={{ fontSize: '2rem' }}>{team.flag || '🏴'}</div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{team.name}</div>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>{team.continent}</div>
                  </div>
                </div>
              ))}
            </div>

            {(!currentGroup.teams || currentGroup.teams.length === 0) && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                <p>Aucune équipe dans ce groupe.</p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            <p>Aucun groupe trouvé pour "{selectedGroup}".</p>
            <p>Les groupes disponibles sont: {groups.map(g => g.letter || g.name || g.id).join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;