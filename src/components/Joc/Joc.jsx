import React, { useState, useEffect } from 'react';
import { strengthLevels } from '../../data/strengthLevels';
import { masaLevels } from '../../data/masaLevels';
import './Joc.css';

function Joc({ currentUser }) {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'map'
  const [activeCategory, setActiveCategory] = useState(null); // 'forta', 'masa'
  const [selectedLevel, setSelectedLevel] = useState(null); 
  const [youtubeLink, setYoutubeLink] = useState('');

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

  const unl = activeCategory === 'masa' ? unlockedMasaLevel : unlockedLevel;
  const setUnl = activeCategory === 'masa' ? setUnlockedMasaLevel : setUnlockedLevel;
  const dbLevels = activeCategory === 'masa' ? masaLevels : strengthLevels;

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
    
    alert('Dovada a fost trimisă cu succes către baza de date! Așteaptă evaluarea din partea Autorității.');
    setYoutubeLink('');
    setSelectedLevel(null);
  };

  const renderSelectionMenu = () => (
    <div className="game-selection-menu">
      <h1 className="game-title">CALISTHENICS GAME</h1>
      <p className="game-subtitle">Alege-ti calea spre maiestrie fizica</p>
      
      <div className="split-screen-container">
        
        <div className="split-panel panel-left" onClick={() => handleSelectCategory('forta')}>
          <div className="panel-overlay"></div>
          <div className="panel-content">
            <h2>Calea Forței Absolute</h2>
            <p className="path-desc">Mastery of bodyweight, static holds, and true strength.</p>
            <span className="enter-btn">INTRA IN ARENA</span>
          </div>
        </div>

        <div className="split-panel panel-right" onClick={() => handleSelectCategory('masa')}>
          <div className="panel-overlay"></div>
          <div className="panel-content">
            <h2>Calea Masei Musculare</h2>
            <p className="path-desc">Hypertrophy, volume training, aesthetics focus.</p>
            <span className="enter-btn red-btn">INTRA IN ARENA</span>
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
          <div className="locked-category-message cyber-panel" style={{ textAlign: 'center', marginTop: '100px' }}>
            <span className="lock-icon" style={{ fontSize: '4rem', display: 'block', marginBottom: '20px' }}>🔒</span>
            <h2 className="neon-text" style={{ color: '#ff4d4d', textShadow: '0 0 10px #ff4d4d' }}>MODUL BLOCAT</h2>
            <p style={{ color: '#e6e6fa', fontSize: '1.2rem', marginTop: '20px' }}>Ai nevoie de o fundație solidă înainte să sculptezi hipertrofia.</p>
            <p style={{ color: '#ff4d4d', fontSize: '1.1rem', marginTop: '10px' }}><strong>Atinge Nivelul 10 in Calea Forței pentru deblocare!</strong></p>
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
              if(window.confirm("Esti sigur? Progresul se va sterge.")) setUnl(1);
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
                    <div className="node-circle">
                      {isUnlocked ? level.id : '🔒'}
                    </div>
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
                      <p><strong>1. Proba Filmată:</strong> {selectedLevel.prova}</p>
                      <p><strong>2. Principal:</strong> {selectedLevel.ex1}</p>
                      <p><strong>3. Secundar:</strong> {selectedLevel.ex2}</p>
                      <p><strong>4. Izolare:</strong> {selectedLevel.ex3}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>1. Bază (Target):</strong> {selectedLevel.ex1}</p>
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
                           <p className="proof-instructions" style={{ color: '#ffcc00', textAlign: 'center', fontSize: '1.2rem' }}>🕒 Dovadă trimisă! În așteptarea evaluării...</p>
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
                       <span className="check-icon">✓</span>
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
      {gameState === 'menu' ? renderSelectionMenu() : renderMap()}
    </main>
  );
}

export default Joc;
