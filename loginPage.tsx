// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulation de connexion
    setTimeout(() => {
      console.log('Connexion avec:', { email, password });
      alert('Connexion simulée - Redirection vers la page d\'accueil');
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '2px solid #ffd1dc',
      borderRadius: '12px',
      background: 'white'
    }}>
      <h1 style={{ color: '#ff6b9d', textAlign: 'center', marginBottom: '2rem' }}>
        🔐 Connexion
      </h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ff6b9d', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ffd1dc',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            placeholder="votre@email.com"
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ff6b9d', fontWeight: 'bold' }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ffd1dc',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
            placeholder="Votre mot de passe"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#ccc' : '#ff6b9d',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p style={{ color: '#666' }}>
          Pas de compte ?{' '}
          <Link to="/register" style={{ color: '#ff6b9d', fontWeight: 'bold' }}>
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;