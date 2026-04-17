import React, { useState, useEffect } from 'react';
import { strengthLevels } from '../../data/strengthLevels';
import { masaLevels } from '../../data/masaLevels';
import './Joc.css';

const defaultPlayerLevel = 1;

function Joc({ currentUser }) {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'menu', 'map'
  const [activeCategory, setActiveCategory] = useState(null); // 'forta', 'masa'
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [playerSearch, setPlayerSearch] = useState('');
  const [players, setPlayers] = useState([]);

  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    const saved = localStorage.getItem(`hybridUnlockedLevel_${currentUser}`);
    return saved !== null ? parseInt(saved, 10) : 1;
  });

  const [unlockedMasaLevel, setUnlockedMasaLevel] = useState(() => {
    const saved = localStorage.getItem(`hybridMasaUnlockedLevel_${currentUser}`);
    return saved !== null ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    const saved = localStorage.getItem(`hybridUnlockedLevel_${currentUser}`);
    setUnlockedLevel(saved !== null ? parseInt(saved, 10) : 1);

    const savedMasa = localStorage.getItem(`hybridMasaUnlockedLevel_${currentUser}`);
    setUnlockedMasaLevel(savedMasa !== null ? parseInt(savedMasa, 10) : 1);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`hybridUnlockedLevel_${currentUser}`, unlockedLevel.toString());
    }
  }, [unlockedLevel, currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`hybridMasaUnlockedLevel_${currentUser}`, unlockedMasaLevel.toString());
    }
  }, [unlockedMasaLevel, currentUser]);

  useEffect(() => {
    const loadPlayers = () => {
      const playersMap = new Map();

      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (!key) continue;

        if (key.startsWith('hybridUnlockedLevel_')) {
          const username = key.replace('hybridUnlockedLevel_', '');
          const forta = parseInt(localStorage.getItem(key) || `${defaultPlayerLevel}`, 10);
          const title = localStorage.getItem(`hybridSelectedTitle_${username}`) || 'Initiat Calisthenics';
          const existing = playersMap.get(username) || { username, forta: defaultPlayerLevel, masa: defaultPlayerLevel, title };
          existing.forta = Number.isNaN(forta) ? defaultPlayerLevel : forta;
          existing.title = title;
          playersMap.set(username, existing);
        }

        if (key.startsWith('hybridMasaUnlockedLevel_')) {
          const username = key.replace('hybridMasaUnlockedLevel_', '');
          const masa = parseInt(localStorage.getItem(key) || `${defaultPlayerLevel}`, 10);
          const title = localStorage.getItem(`hybridSelectedTitle_${username}`) || 'Initiat Calisthenics';
          const existing = playersMap.get(username) || { username, forta: defaultPlayerLevel, masa: defaultPlayerLevel, title };
          existing.masa = Number.isNaN(masa) ? defaultPlayerLevel : masa;
          existing.title = title;
          playersMap.set(username, existing);
        }
      }

      if (currentUser && !playersMap.has(currentUser)) {
        const title = localStorage.getItem(`hybridSelectedTitle_${currentUser}`) || 'Initiat Calisthenics';
        playersMap.set(currentUser, {
          username: currentUser,
          forta: unlockedLevel || defaultPlayerLevel,
          masa: unlockedMasaLevel || defaultPlayerLevel,
          title
        });
      }

      const nextPlayers = Array.from(playersMap.values())
        .map((player) => ({
          ...player,
          total: player.forta + player.masa,
        }))
        .sort((left, right) => {
          if (right.total !== left.total) return right.total - left.total;
          if (right.forta !== left.forta) return right.forta - left.forta;
          if (right.masa !== left.masa) return right.masa - left.masa;
          return left.username.localeCompare(right.username);
        });

      setPlayers(nextPlayers);
    };

    loadPlayers();
    const interval = setInterval(loadPlayers, 2000);

    return () => clearInterval(interval);
  }, [currentUser, unlockedLevel, unlockedMasaLevel]);

  const unl = activeCategory === 'masa' ? unlockedMasaLevel : unlockedLevel;
  const setUnl = activeCategory === 'masa' ? setUnlockedMasaLevel : setUnlockedLevel;
  const dbLevels = activeCategory === 'masa' ? masaLevels : strengthLevels;
  const leaderboardPlayers = players.slice(0, 100);
  const normalizedSearch = playerSearch.trim().toLowerCase();
  const searchedPlayers = normalizedSearch
    ? players.filter((player) => player.username.toLowerCase().includes(normalizedSearch)).slice(0, 12)
    : [];

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setGameState('map');
  };



  const handleBackToMenu = () => {
    setGameState('menu');
    setActiveCategory(null);
  };

  const handleLevelClick = (level) => {
    if (level.id <= unl) {
      setSelectedLevel(level);
      setYoutubeLink('');
    }
  };

  const handleCloseModal = () => {
    setSelectedLevel(null);
  };

  const handleSubmitProof = (e) => {
    e.preventDefault();
    if (youtubeLink.trim().length < 5) {
      alert('Te rog introdu un link valid!');
      return;
    }

    const pendingProofs = JSON.parse(localStorage.getItem('pendingProofs') || '[]');
    pendingProofs.push({
      id: Date.now(),
      username: currentUser,
      category: activeCategory,
      levelId: selectedLevel.id,
      link: youtubeLink,
      title: selectedLevel.title,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem('pendingProofs', JSON.stringify(pendingProofs));

    alert('Dovada a fost trimisa cu succes catre baza de date! Asteapta evaluarea din partea Autoritatii.');
    setYoutubeLink('');
    setSelectedLevel(null);
  };

  const renderIntro = () => (
    <div className="joc-intro-container" style={{ padding: '2rem' }}>
      <h1 className="game-title" align="center">CALISTHENICS GAME</h1>
      <p className="game-subtitle" align="center">Alege-ti calea spre maiestrie fizica</p>
      {/* SYSTEM RULES - Cum functioneaza */}
      <div className="system-rules-section">
        <h2 className="section-title">SYSTEM UPLINK: Reguli de Baza</h2>
        <div className="rules-grid">
          <div className="rule-card">
            <span className="rule-number">01</span>
            <h3>Alege-ti Calea</h3>
            <p>Incepi calatoria de la Nivelul 1. Pe masura ce cresti in nivele, vei debloca Titluri noi (ex: Incepator, Atlet, Titan).</p>
          </div>
          <div className="rule-card">
            <span className="rule-number">02</span>
            <h3>Antreneaza-te</h3>
            <p>Fiecare nivel are antrenamente specifice care te pregatesc pentru provocarile pragurilor majore.</p>
          </div>
          <div className="rule-card">
            <span className="rule-number">03</span>
            <h3>Boss Fight</h3>
            <p>Pentru a avansa in Titlu, trebuie sa invingi testul nivelului respectiv executand corect provocarile.</p>
          </div>
          <div className="rule-card">
            <span className="rule-number">04</span>
            <h3>Valideaza</h3>
            <p>Incarca video-ul pe YouTube (unlisted) cu executia ta. Daca treci, primesti Level Up si noul Titlu oficial!</p>
          </div>
        </div>
      </div>

      {/* SKILL TREES - Forta vs Masa */}
      <div className="skill-tree-section">
        <h2 className="section-title">Skill Tree: Calea Ta</h2>

        <div className="paths-container">
          {/* Calea Fortei */}
          <div className="cyber-panel path-panel strength-path">
            <div className="panel-header">
              <h3>Modul: FORTA</h3>
              <span className="subtitle">Stapanirea corpului & Gimnastica</span>
            </div>
            <div className="panel-body">
              <ul className="levels-list">
                <li>
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL 1</span>
                    <span className="title-reward">Titlu: <strong>[ Incepator ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 15 Flotari stricte & 1 min Plank.</p>
                  <p className="training-tips">Antrenament: Flotari in genunchi, negative, flotari elevate.</p>
                </li>
                <li>
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL X</span>
                    <span className="title-reward">Titlu Deblocat: <strong>[ Amator ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 10 Dips-uri curate & 10 sec L-sit.</p>
                  <p className="training-tips">Antrenament: Flotari declinate, pike push-ups.</p>
                </li>
                <li>
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL XX</span>
                    <span className="title-reward">Titlu Deblocat: <strong>[ Atlet ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 8 Tractiuni stricte & 5 Muscle-ups asistate.</p>
                  <p className="training-tips warning">Ofera acces catre Calea Masei Musculare.</p>
                </li>
                <li className="locked-lvl">
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL XXX</span>
                    <span className="title-reward">Titlu Suprem: <strong>[ Grandmaster ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> Full Front Lever, Human Flag sau Full Planche.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Calea Masei Musculare */}
          <div className="cyber-panel path-panel mass-path">
            <div className="panel-header">
              <h3>Modul: MASA MUSCULARA</h3>
              <span className="subtitle">Hipertrofie & Greutati Aditionale</span>
            </div>
            <div className="panel-body">
              <div className="restriction-notice">
                <span>NECESITA LVL 10 FORTA PENTRU DEBLOCARE</span>
              </div>
              <ul className="levels-list">
                <li>
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL 1</span>
                    <span className="title-reward">Titlu: <strong>[ Tanc Usor ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 12 Flotari & 8 Tractiuni cu vesta de 10 KG.</p>
                  <p className="training-tips">Antrenament: Tempo lent, Time-Under-Tension.</p>
                </li>
                <li>
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL X</span>
                    <span className="title-reward">Titlu Deblocat: <strong>[ Juggernaut ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 10 Dips-uri (+20 KG) & 20 Pistol Squats.</p>
                  <p className="training-tips">Antrenament: Superseturi, drop-seturi hibride.</p>
                </li>
                <li className="locked-lvl">
                  <div className="lvl-header">
                    <span className="lvl-badge">LVL XX</span>
                    <span className="title-reward">Titlu Suprem: <strong>[ Colos ]</strong></span>
                  </div>
                  <p><strong>Provocare:</strong> 1 Tractiune cu 50% din greutatea corporala adaugata.</p>
                  <p className="training-tips">Status: Fizic suprem de statuie greceasca.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="action-section">
        <button className="neon-btn large-btn" onClick={() => {
          setGameState('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Am inteles
        </button>
      </div>
    </div>
  );

  const renderSelectionMenu = () => (
    <div className="game-selection-menu">
      <h1 className="game-title">CALISTHENICS GAME</h1>
      <p className="game-subtitle">Alege-ti calea spre maiestrie fizica</p>

      <div className="split-screen-container">

        <div className="split-panel panel-left" onClick={() => handleSelectCategory('forta')}>
          <div className="panel-overlay"></div>
          <div className="panel-content">
            <h2>Calea Fortei Absolute</h2>
            <p className="path-desc">Maestru al propriei greutati, forta adevarata si hold-uri statice.</p>
            <span className="enter-btn">INTRA IN ARENA</span>
          </div>
        </div>

        <div className="split-panel panel-right" onClick={() => handleSelectCategory('masa')}>
          <div className="panel-overlay"></div>
          <div className="panel-content">
            <h2>Calea Masei Musculare</h2>
            <p className="path-desc">Hipertrofie, antrenament de volum si focus pe aesthetics.</p>
            <span className="enter-btn red-btn">INTRA IN ARENA</span>
          </div>
        </div>

      </div>

      <div className="community-dashboard">
        <div className="cyber-panel community-card search-card">
          <div className="panel-header">
            <h3>Cauta Jucatori</h3>
            <span className="subtitle">Gaseste rapid un atlet dupa username</span>
          </div>
          <div className="panel-body">
            <input
              type="text"
              className="cyber-input player-search-input"
              placeholder="Scrie username-ul cautat..."
              value={playerSearch}
              onChange={(event) => setPlayerSearch(event.target.value)}
            />

            {normalizedSearch ? (
              searchedPlayers.length > 0 ? (
                <div className="player-search-results">
                  {searchedPlayers.map((player) => (
                    <div key={player.username} className={`player-result-card ${player.username === currentUser ? 'is-current-player' : ''}`}>
                      <div>
                        <p className="player-result-name">{player.username}</p>
                        <p className="player-result-meta">Titlu: [ {player.title} ]</p>
                      </div>
                      <div className="player-result-score">Total {player.total}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="search-empty-state">Nu am gasit niciun jucator cu acest username.</p>
              )
            ) : (
              <p className="search-empty-state">Incepe sa scrii un username pentru a vedea rezultatele.</p>
            )}
          </div>
        </div>

        <div className="cyber-panel community-card leaderboard-card">
          <div className="panel-header">
            <h3>Leaderboard Top 100</h3>
            <span className="subtitle">Clasament dupa cumulul nivelurilor de forta si masa</span>
          </div>
          <div className="panel-body">
            <div className="leaderboard-list">
              {leaderboardPlayers.map((player, index) => (
                <div key={player.username} className={`leaderboard-row ${player.username === currentUser ? 'is-current-player' : ''}`}>
                  <div className="leaderboard-rank">#{index + 1}</div>
                  <div className="leaderboard-player">
                    <p className="leaderboard-name">{player.username}</p>
                    <p className="leaderboard-meta">Titlu: [ {player.title} ]</p>
                  </div>
                  <div className="leaderboard-total">{player.total}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMap = () => {
    const isMasa = activeCategory === 'masa';

    if (isMasa && unlockedLevel < 10) {
      return (
        <div className="map-view masa-mode">
          <div className="map-header">
            <button className="neon-btn back-btn red-btn" onClick={handleBackToMenu}>&larr; Catre Meniu</button>
          </div>
          <div className="locked-category-wrap">
            <div className="locked-category-message cyber-panel">
              <span className="lock-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', color: '#ff4d4d' }}>
                <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" aria-hidden="true">
                  <path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9Zm-8 0V7a3 3 0 0 1 6 0v2Z" />
                </svg>
              </span>
              <h2 className="neon-text" style={{ color: '#ff4d4d', textShadow: '0 0 10px #ff4d4d' }}>MODUL BLOCAT</h2>
              <p style={{ color: '#e6e6fa', fontSize: '1.2rem', marginTop: '20px' }}>Ai nevoie de o fundatie solida inainte sa sculptezi hipertrofia.</p>
              <p style={{ color: '#ff4d4d', fontSize: '1.1rem', marginTop: '10px' }}><strong>Atinge Nivelul 10 in Calea Fortei pentru deblocare!</strong></p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`map-view ${isMasa ? 'masa-mode' : ''}`}>
        <div className="map-header">
          <button className={`neon-btn back-btn ${isMasa ? 'red-btn' : ''}`} onClick={handleBackToMenu}>&larr; Catre Meniu</button>
          <h2>{isMasa ? 'HARTA MASEI MUSCULARE' : 'HARTA FORTEI ABSOLUTE'}</h2>
          <button className={`neon-btn reset-btn ${isMasa ? 'red-btn' : ''}`} onClick={() => {
            if (window.confirm("Esti sigur? Progresul se va sterge.")) setUnl(1);
          }}>Reset</button>
        </div>

        <div className="path-container">
          {dbLevels.map((level) => {
            const isUnlocked = level.id <= unl;
            const isCurrent = level.id === unl;

            return (
              <div
                key={level.id}
                className={`map-node-wrapper ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
              >
                {level.id !== 1 && <div className="path-connector"></div>}

                <div
                  className="map-node"
                  onClick={() => handleLevelClick(level)}
                  title={`Nivel ${level.id}: ${level.title}`}
                >
                  <div className="node-circle">{isUnlocked ? level.id : '\uD83D\uDD12'}</div>
                  <div className="node-label">Nivel {level.id}</div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedLevel && (
          <div className="level-modal-overlay" onClick={handleCloseModal}>
            <div className="level-modal cyber-panel" onClick={e => e.stopPropagation()}>
              <button className="close-modal-btn" onClick={handleCloseModal}>&times;</button>
              <h2>Nivel {selectedLevel.id}: <span className="highlight-title">{selectedLevel.title}</span></h2>

              <div className="exercises-list">
                {activeCategory === 'masa' ? (
                  <>
                    <p><strong>1. Proba Filmata:</strong> {selectedLevel.prova}</p>
                    <p><strong>2. Principal:</strong> {selectedLevel.ex1}</p>
                    <p><strong>3. Secundar:</strong> {selectedLevel.ex2}</p>
                    <p><strong>4. Izolare:</strong> {selectedLevel.ex3}</p>
                  </>
                ) : (
                  <>
                    <p><strong>1. Baza (Target):</strong> {selectedLevel.ex1}</p>
                    <p><strong>2. Progresie:</strong> {selectedLevel.ex2}</p>
                    <p><strong>3. Accesoriu:</strong> {selectedLevel.ex3}</p>
                  </>
                )}
              </div>

              {selectedLevel.id === unl ? (
                (() => {
                  const isPending = JSON.parse(localStorage.getItem('pendingProofs') || '[]').some(
                    p => p.username === currentUser && p.category === activeCategory && p.levelId === selectedLevel.id
                  );

                  if (isPending) {
                    return (
                      <div className="proof-form pending-view">
                        <p className="proof-instructions" style={{ color: '#ffcc00', textAlign: 'center', fontSize: '1.2rem' }}>Dovada trimisa! In asteptarea evaluarii...</p>
                      </div>
                    );
                  }

                  return (
                    <form onSubmit={handleSubmitProof} className="proof-form">
                      <p className="proof-instructions">Filmeaza si incarca pe site dovada efectuarii primei miscari (De baza) pentru a promova la urmatorul nivel.</p>
                      <input
                        type="url"
                        required
                        placeholder="Exemplu: https://youtube.com/watch?v=..."
                        value={youtubeLink}
                        onChange={e => setYoutubeLink(e.target.value)}
                        className="cyber-input"
                      />
                      <button type="submit" className="neon-btn complete-btn">Trimite Dovada & Aprobare</button>
                    </form>
                  );
                })()
              ) : (
                <div className="completed-status">
                  <div className="check-ring">
                    <span className="check-icon">{'\u2713'}</span>
                  </div>
                  <p>Obiectiv Atins</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="joc-page-modern">
      {gameState === 'intro' ? renderIntro() : gameState === 'menu' ? renderSelectionMenu() : renderMap()}
    </main>
  );
}

export default Joc;
