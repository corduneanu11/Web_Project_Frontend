import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestrictedModal.css';

function RestrictedModal({ isOpen, onOpenLogin }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOpenLogin = () => {
    navigate('/');
    // A small delay ensures the navigation finishes and RestrictedModal unmounts before AuthModal appears.
    setTimeout(() => {
      onOpenLogin();
    }, 100);
  };

  return (
    <div className="restricted-overlay">
      <div className="restricted-modal cyber-panel">
        <span className="lock-icon huge">🔒</span>
        <h2 className="neon-text red">ACCES INTERZIS GUEST</h2>
        <p className="restricted-text">
          Conținutul acestei secțiuni este rezervat doar membrilor legitimați ai academiei de calisthenics. Conectează-te pentru a avea acces.
        </p>
        <div className="restricted-actions">
          <button className="neon-btn" onClick={handleOpenLogin}>Loghează-te / Înregistrare</button>
          <button className="neon-btn back-btn red-btn" onClick={() => navigate('/')}>Înapoi Acasă</button>
        </div>
      </div>
    </div>
  );
}

export default RestrictedModal;
