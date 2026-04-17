import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel({ currentUser }) {
  const [proofs, setProofs] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadedProofs = JSON.parse(localStorage.getItem('pendingProofs') || '[]');
    const loadedReports = JSON.parse(localStorage.getItem('hybridReports') || '[]');
    setProofs(loadedProofs);
    setReports(loadedReports);
  }, []);

  if (currentUser !== 'admin') {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}><h2>ACCES INTERZIS</h2><p>Nu ai privilegii de administrator.</p></div>;
  }

  const notifyUser = (proof, status) => {
    const key = `hybridNotifs_${proof.username}`;
    const notifs = JSON.parse(localStorage.getItem(key) || '[]');
    let message = '';

    if (status === 'approved') {
      message = `Felicitari! Cererea ta pentru nivelul ${proof.levelId} (${proof.category === 'masa' ? 'Masa' : 'Forta'}) a fost APROBATA!`;
    } else {
      message = `Din pacate, cererea ta pentru nivelul ${proof.levelId} (${proof.category === 'masa' ? 'Masa' : 'Forta'}) a fost REFUZATA. Analizeaza executia si incearca din nou.`;
    }

    notifs.unshift({
      id: Date.now(),
      text: message,
      type: status,
      read: false,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem(key, JSON.stringify(notifs));
  };

  const handleApprove = (proof) => {
    const newProofs = proofs.filter(p => p.id !== proof.id);
    localStorage.setItem('pendingProofs', JSON.stringify(newProofs));
    setProofs(newProofs);

    const storageKey = proof.category === 'masa'
      ? `hybridMasaUnlockedLevel_${proof.username}`
      : `hybridUnlockedLevel_${proof.username}`;

    localStorage.setItem(storageKey, (proof.levelId + 1).toString());
    notifyUser(proof, 'approved');
  };

  const handleReject = (proof) => {
    const newProofs = proofs.filter(p => p.id !== proof.id);
    localStorage.setItem('pendingProofs', JSON.stringify(newProofs));
    setProofs(newProofs);
    notifyUser(proof, 'rejected');
  };

  const handleMarkReportSolved = (reportId) => {
    const nextReports = reports.map((report) =>
      report.id === reportId ? { ...report, status: 'Rezolvat' } : report
    );
    localStorage.setItem('hybridReports', JSON.stringify(nextReports));
    setReports(nextReports);
  };

  const handleDeleteReport = (reportId) => {
    const nextReports = reports.filter((report) => report.id !== reportId);
    localStorage.setItem('hybridReports', JSON.stringify(nextReports));
    setReports(nextReports);
  };

  return (
    <main className="admin-page">
      <div className="admin-container cyber-panel">
        <h1 className="neon-text red-title">PANOUL AUTORITATII</h1>
        <p className="admin-desc">Gestioneaza probele trimise de atleti pentru promovarea la un nou nivel si rapoartele venite din contact.</p>

        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Probe Pentru Promovare</h2>
            <span className="admin-badge">{proofs.length}</span>
          </div>

          {proofs.length === 0 ? (
            <div className="empty-proofs">
              <h3>Nu exista cereri in asteptare.</h3>
            </div>
          ) : (
            <div className="proofs-list">
              {proofs.map(proof => (
                <div key={proof.id} className="proof-card">
                  <div className="proof-info">
                    <span className="proof-user">User: <strong>{proof.username}</strong></span>
                    <span className="proof-cat">Ramura: {proof.category === 'masa' ? 'Masa Musculara' : 'Forta Absoluta'}</span>
                    <span className="proof-level">Nivel: {proof.levelId} - {proof.title}</span>
                    <span className="proof-date">Data: {proof.date}</span>
                  </div>

                  <div className="proof-video">
                    <a href={proof.link} target="_blank" rel="noreferrer" className="neon-btn small-btn">Vezi Clip YouTube</a>
                  </div>

                  <div className="proof-actions">
                    <button className="neon-btn approve-btn" onClick={() => handleApprove(proof)}>Aproba</button>
                    <button className="neon-btn reject-btn" onClick={() => handleReject(proof)}>Refuza</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <h2>Rapoarte Din Contact</h2>
            <span className="admin-badge">{reports.length}</span>
          </div>

          {reports.length === 0 ? (
            <div className="empty-proofs">
              <h3>Nu exista rapoarte trimise.</h3>
            </div>
          ) : (
            <div className="proofs-list">
              {reports.map((report) => (
                <div key={report.id} className="proof-card report-card">
                  <div className="proof-info report-info">
                    <span className="proof-user">Subiect: <strong>{report.subject}</strong></span>
                    <span className="proof-cat">Categorie: {report.category}</span>
                    <span className="proof-level">Detalii: {report.details}</span>
                    <span className="proof-date">Data: {report.date}</span>
                    <span className={`report-status ${report.status === 'Rezolvat' ? 'resolved' : 'new'}`}>
                      Status: {report.status}
                    </span>
                  </div>

                  <div className="proof-actions">
                    {report.status !== 'Rezolvat' && (
                      <button className="neon-btn approve-btn" onClick={() => handleMarkReportSolved(report.id)}>
                        Marcheaza rezolvat
                      </button>
                    )}
                    <button className="neon-btn reject-btn" onClick={() => handleDeleteReport(report.id)}>
                      Sterge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminPanel;
