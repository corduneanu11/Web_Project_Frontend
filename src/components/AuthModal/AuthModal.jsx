import React, { useState } from 'react';
import './AuthModal.css';

function AuthModal({ isOpen, onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (password !== confirmPassword) {
        setError('Parolele nu se potrivesc!');
        return;
      }
      if (username === 'admin' || username === 'user') {
        setError('Acest nume de utilizator este rezervat.');
        return;
      }
      
      const savedAccounts = JSON.parse(localStorage.getItem('hybridAccounts') || '{}');
      if (savedAccounts[username]) {
        setError('Numele de utilizator exista deja!');
        return;
      }

      savedAccounts[username] = { email, password };
      localStorage.setItem('hybridAccounts', JSON.stringify(savedAccounts));
      
      alert('Cont creat cu succes! Acum te poti loga.');
      setIsRegister(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      const savedAccounts = JSON.parse(localStorage.getItem('hybridAccounts') || '{}');
      
      if ((username === 'admin' && password === 'admin1234') ||
          (username === 'user' && password === 'user1234') ||
          (savedAccounts[username] && savedAccounts[username].password === password)) {
        onLogin(username);
        onClose();
      } else {
        setError('Nume de utilizator sau parola incorecta!');
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal cyber-panel" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>&times;</button>

        <h2 className="neon-text">{isRegister ? 'Inregistrare' : 'Autentificare'}</h2>

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
          {isRegister && (
            <div className="form-group">
              <label>Adresa de Email</label>
              <input
                type="email"
                className="cyber-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
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
          {isRegister && (
            <div className="form-group">
              <label>Confirma Parola</label>
              <input
                type="password"
                className="cyber-input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="neon-btn auth-submit-btn">
            {isRegister ? 'Creeaza Cont' : 'Intra in Cont'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Ai deja cont?' : 'Esti nou?'}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? ' Logheaza-te aici' : ' Inregistreaza-te aici'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
