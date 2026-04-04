import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ currentUser }) {
  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('pendingProofs') || '[]');
    setProofs(loaded);
  }, []);

  if (currentUser !== 'admin') {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}><h2>ACCES INTERZIS</h2><p>Nu aveți privilegii de administrator.</p></div>;
  }

  const notifyUser = (proof, status) => {
    const key = `hybridNotifs_${proof.username}`;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    let message = '';
    if (status === 'approved') {
       message = `Felicitări! Cererea ta pentru nivelul ${proof.levelId} (${proof.category === 'masa' ? 'Masă' : 'Forță'}) a fost APROBATĂ!`;
    } else {
       message = `Din păcate, cererea ta pentru nivelul ${proof.levelId} (${proof.category === 'masa' ? 'Masă' : 'Forță'}) a fost REFUZATĂ. Analizează execuția și încearcă din nou.`;
    }
    
    notifs.unshift({
      id: Date.now(),
      text: message,
      type: status,
      read: false,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem(key, JSON.stringify(notifs));
  }

  const handleApprove = (proof) => {
    // 1. Remove from pending
    const newProofs = proofs.filter(p => p.id !== proof.id);
    localStorage.setItem('pendingProofs', JSON.stringify(newProofs));
    setProofs(newProofs);

    // 2. Update user level
    const storageKey = proof.category === 'masa' 
      ? `hybridMasaUnlockedLevel_${proof.username}` 
      : `hybridUnlockedLevel_${proof.username}`;
    
    // Increment the level beyond what was approved
    localStorage.setItem(storageKey, (proof.levelId + 1).toString());

    // 3. Notify user
    notifyUser(proof, 'approved');
  };

  const handleReject = (proof) => {
    // Remove from pending without updates
    const newProofs = proofs.filter(p => p.id !== proof.id);
    localStorage.setItem('pendingProofs', JSON.stringify(newProofs));
    setProofs(newProofs);

    // Notify user
    notifyUser(proof, 'rejected');
  };

  return (
    <main className="admin-page">
      <div className="admin-container cyber-panel">
        <h1 className="neon-text red-title">PANOUL AUTORITĂȚII</h1>
        <p className="admin-desc">Gestionează probele trimise de Atleți pentru promovarea la un nou nivel.</p>
        
        {proofs.length === 0 ? (
          <div className="empty-proofs">
            <h3>Nu există cereri în așteptare.</h3>
          </div>
        ) : (
          <div className="proofs-list">
            {proofs.map(proof => (
              <div key={proof.id} className="proof-card">
                <div className="proof-info">
                  <span className="proof-user">User: <strong>{proof.username}</strong></span>
                  <span className="proof-cat">Ramura: {proof.category === 'masa' ? 'Masă Musculară' : 'Forță Absolută'}</span>
                  <span className="proof-level">Nivel: {proof.levelId} - {proof.title}</span>
                  <span className="proof-date">Dată: {proof.date}</span>
                </div>
                
                <div className="proof-video">
                  <a href={proof.link} target="_blank" rel="noreferrer" className="neon-btn small-btn">Vezi Clip YouTube</a>
                </div>
                
                <div className="proof-actions">
                  <button className="neon-btn approve-btn" onClick={() => handleApprove(proof)}>Aprobă</button>
                  <button className="neon-btn reject-btn" onClick={() => handleReject(proof)}>Refuză</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminPanel;
