import React, { useState, useEffect } from 'react';
import './Profil.css';

function Profil({ currentUser }) {
  const [fortaLvl, setFortaLvl] = useState(1);
  const [masaLvl, setMasaLvl] = useState(1);
  
  useEffect(() => {
    const savedForta = localStorage.getItem(`hybridUnlockedLevel_${currentUser}`);
    setFortaLvl(savedForta !== null ? parseInt(savedForta, 10) : 1);
    
    const savedMasa = localStorage.getItem(`hybridMasaUnlockedLevel_${currentUser}`);
    setMasaLvl(savedMasa !== null ? parseInt(savedMasa, 10) : 1);
  }, [currentUser]);

  const getRank = () => {
    const total = fortaLvl + masaLvl;
    if (total < 5) return 'Inițiat Calisthenics';
    if (total <= 15) return 'Atlet Amator';
    if (total <= 30) return 'Luptător Hibrid';
    if (total <= 45) return 'Campion Strămoșesc';
    return 'Titan Absolut';
  };

  const getRankColor = () => {
    const total = fortaLvl + masaLvl;
    if (total < 5) return '#a890c0';
    if (total <= 15) return '#d494ff';
    if (total <= 30) return '#ffcc00';
    if (total <= 45) return '#ff4d4d';
    return '#59ff00';
  };

  return (
    <main className="profil-page">
      <div className="profil-container cyber-panel">
        <div className="profil-header">
          <div className="avatar-circle">
            {currentUser ? currentUser.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="profil-info-top">
            <h1 className="profil-username neon-text">{currentUser || 'Guest'}</h1>
            <h3 className="profil-rank" style={{ color: getRankColor(), textShadow: `0 0 10px ${getRankColor()}` }}>
              {getRank()}
            </h3>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card forta-card">
            <h3>Forță Absolută</h3>
            <div className="stat-value">{fortaLvl} <span className="stat-max">/ 30</span></div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill forta-fill" style={{ width: `${(fortaLvl / 30) * 100}%` }}></div>
            </div>
          </div>

          <div className="stat-card masa-card">
            <h3>Masă Musculară</h3>
            <div className="stat-value">{masaLvl} <span className="stat-max">/ 30</span></div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill masa-fill" style={{ width: `${(masaLvl / 30) * 100}%` }}></div>
            </div>
          </div>
          
          <div className="stat-card total-card">
            <h3>Nivel Total</h3>
            <div className="stat-value">{fortaLvl + masaLvl}</div>
            <p className="stat-desc">Suma forței absolută și masei brute combinate.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profil;
