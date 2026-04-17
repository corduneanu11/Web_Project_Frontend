import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestrictedModal.css';

function RestrictedModal({ isOpen, onOpenLogin }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOpenLogin = () => {
    navigate('/');
    setTimeout(() => {
      onOpenLogin();
    }, 100);
  };

  return (
    <div className="restricted-overlay">
      <div className="restricted-modal cyber-panel">
        <span className="lock-icon huge" style={{ width: '86px', height: '86px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4d4d' }}>
          <svg viewBox="0 0 24 24" width="56" height="56" fill="currentColor" aria-hidden="true">
            <path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9Zm-8 0V7a3 3 0 0 1 6 0v2Z" />
          </svg>
        </span>
        <h2 className="neon-text red">ACCES INTERZIS GUEST</h2>
        <p className="restricted-text">
          Continutul acestei sectiuni este rezervat doar membrilor legitimati ai academiei de calisthenics. Conecteaza-te pentru a avea acces.
        </p>
        <div className="restricted-actions">
          <button className="neon-btn" onClick={handleOpenLogin}>Logheaza-te / Inregistrare</button>
          <button className="neon-btn back-btn red-btn" onClick={() => navigate('/')}>Inapoi Acasa</button>
        </div>
      </div>
    </div>
  );
}

export default RestrictedModal;
