import React, { useEffect, useMemo, useState } from 'react';
import './Profil.css';

const strengthTitleRewards = [
  { level: 10, title: 'Amator' },
  { level: 20, title: 'Atlet' },
  { level: 30, title: 'Grandmaster' },
];

const massTitleRewards = [
  { level: 5, title: 'Tanc Usor' },
  { level: 15, title: 'Juggernaut' },
  { level: 25, title: 'Mr. X' },
  { level: 30, title: 'Titan Colosal' },
];

const baseTitle = 'Initiat Calisthenics';

function Profil({ currentUser }) {
  const [fortaLvl, setFortaLvl] = useState(1);
  const [masaLvl, setMasaLvl] = useState(1);
  const [selectedTitle, setSelectedTitle] = useState('');
  
  useEffect(() => {
    const savedForta = localStorage.getItem(`hybridUnlockedLevel_${currentUser}`);
    setFortaLvl(savedForta !== null ? parseInt(savedForta, 10) : 1);
    
    const savedMasa = localStorage.getItem(`hybridMasaUnlockedLevel_${currentUser}`);
    setMasaLvl(savedMasa !== null ? parseInt(savedMasa, 10) : 1);
  }, [currentUser]);

  const availableTitles = useMemo(() => {
    const unlockedTitles = [
      baseTitle,
      ...strengthTitleRewards.filter((reward) => fortaLvl >= reward.level).map((reward) => reward.title),
      ...massTitleRewards.filter((reward) => masaLvl >= reward.level).map((reward) => reward.title),
    ];

    if (fortaLvl >= 30 && masaLvl >= 30) {
      unlockedTitles.push('Godlike');
    }

    return [
      ...unlockedTitles,
    ].filter((title, index, titles) => titles.indexOf(title) === index);
  }, [fortaLvl, masaLvl]);

  useEffect(() => {
    if (!currentUser || availableTitles.length === 0) return;

    const storageKey = `hybridSelectedTitle_${currentUser}`;
    const savedTitle = localStorage.getItem(storageKey);
    const fallbackTitle = availableTitles[availableTitles.length - 1];
    const nextTitle = savedTitle && availableTitles.includes(savedTitle) ? savedTitle : fallbackTitle;

    setSelectedTitle(nextTitle);
    localStorage.setItem(storageKey, nextTitle);
  }, [availableTitles, currentUser]);

  const handleTitleChange = (event) => {
    const nextTitle = event.target.value;
    setSelectedTitle(nextTitle);

    if (currentUser) {
      localStorage.setItem(`hybridSelectedTitle_${currentUser}`, nextTitle);
    }
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
            <div className="profil-title-picker">
              <span className="profil-title-label">Titlu activ</span>
              <select className="profil-title-select cyber-input" value={selectedTitle} onChange={handleTitleChange}>
                {availableTitles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card forta-card">
            <h3>Forta Absoluta</h3>
            <div className="stat-value">{fortaLvl} <span className="stat-max">/ 30</span></div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill forta-fill" style={{ width: `${(fortaLvl / 30) * 100}%` }}></div>
            </div>
          </div>

          <div className="stat-card masa-card">
            <h3>Masa Musculara</h3>
            <div className="stat-value">{masaLvl} <span className="stat-max">/ 30</span></div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill masa-fill" style={{ width: `${(masaLvl / 30) * 100}%` }}></div>
            </div>
          </div>
          
          <div className="stat-card total-card">
            <h3>Nivel Total</h3>
            <div className="stat-value">{fortaLvl + masaLvl}</div>
            <p className="stat-desc">Suma fortei absolute si masei brute combinate.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profil;
