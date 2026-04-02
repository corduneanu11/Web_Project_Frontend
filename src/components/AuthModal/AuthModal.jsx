import React, { useState } from 'react';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      // Placeholder for registration as requested
      alert('Cont creat cu succes! Te rugăm să folosești momentan conturile "admin" sau "user" validate hardcodat, deoarece backend-ul urmează să fie creat.');
      setIsRegister(false);
    } else {
      if ((username === 'admin' && password === 'admin1234') || 
          (username === 'user' && password === 'user1234')) {
        onLogin(username);
        onClose();
      } else {
        setError('Nume de utilizator sau parolă incorectă!');
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal cyber-panel" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>&times;</button>
        
        <h2 className="neon-text">{isRegister ? 'Înregistrare' : 'Autentificare'}</h2>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <p className="auth-error">{error}</p>}
          
          <div className="form-group">
            <label>Nume Utilizator</label>
            <input 
              type="text" 
              className="cyber-input" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Parola</label>
            <input 
              type="password" 
              className="cyber-input" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="neon-btn auth-submit-btn">
            {isRegister ? 'Creează Cont' : 'Intră în Cont'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Ai deja cont?' : 'Ești nou?'} 
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? ' Loghează-te aici' : ' Înregistrează-te aici'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
