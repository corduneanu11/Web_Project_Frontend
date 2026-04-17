import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [reportData, setReportData] = useState({
    subject: '',
    category: 'bug',
    details: '',
  });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const reports = JSON.parse(localStorage.getItem('hybridReports') || '[]');
    reports.unshift({
      id: Date.now(),
      ...reportData,
      date: new Date().toLocaleString(),
      status: 'Nou',
    });
    localStorage.setItem('hybridReports', JSON.stringify(reports));

    setReportData({
      subject: '',
      category: 'bug',
      details: '',
    });
    setReportSubmitted(true);
  };

  return (
    <main className="contact-page">
      <div className="contact-container">

        <div className="contact-header">
          <h1>SYSTEM UPLINK: Detalii de Contact</h1>
          <p>Conecteaza-te cu reteaua noastra. Mai jos gasesti coordonatele oficiale.</p>
        </div>

        <div className="contact-content">

          {/* Panoul cu informatii de contact */}
          <div className="contact-info cyber-panel">
            <div className="panel-header">
              <h3>Coordonate Baza</h3>
            </div>
            <div className="panel-body info-list">
              <div className="info-item">
                <span className="info-label">Email Transmisii:</span>
                <span className="info-value">arysupremacy04@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="info-label">Comlink (Telefon):</span>
                <span className="info-value">+40 749 804 196</span>
              </div>
              <div className="info-item">
                <span className="info-label">Locatie HQ:</span>
                <span className="info-value">Bucuresti, Sectorul 5, Bulevardul George Cosbuc 39-49, 050141</span>
              </div>
              <div className="info-item">
                <span className="info-label">Retele Sociale:</span>
                <span className="info-value">@arian_andrei11</span>
              </div>
            </div>
          </div>

          {/* Harta Google Maps */}
          <div className="contact-map cyber-panel">
            <iframe
              title="Locatie Baza"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.7297764890227!2d26.083833875900176!3d44.41819050261958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff0b54881f97%3A0xae84d2f47f65a3a7!2sAcademia%20Tehnic%C4%83%20Militar%C4%83%20Ferdinand%20I!5e0!3m2!1sro!2sro!4v1775139131380!5m2!1sro!2sro"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

        </div>

        <div className="contact-lower-grid">
          <div className="social-links-section cyber-panel">
            <div className="panel-header">
              <h3>Canal Rapid</h3>
            </div>
            <p className="social-copy">Daca vrei un raspuns rapid sau vrei sa urmaresti proiectul, ne poti gasi direct si pe Instagram.</p>
            <a href="https://www.instagram.com/arian_andrei11/" target="_blank" rel="noreferrer" className="neon-btn social-btn ig-btn">
              <span className="social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5Zm5.75-3.35a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
                </svg>
              </span>
              Instagram
            </a>
          </div>

          <div className="report-panel cyber-panel">
            <div className="panel-header">
              <h3>Raporteaza O Problema</h3>
            </div>
            <p className="report-copy">Daca nu vrei sa folosesti emailul sau telefonul, poti trimite direct aici un bug, o problema de cont sau orice situatie neclara.</p>

            <form className="report-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subiect</label>
                <input
                  type="text"
                  name="subject"
                  value={reportData.subject}
                  onChange={handleChange}
                  className="cyber-input"
                  placeholder="Ex: Problema la validarea nivelului"
                  required
                />
              </div>

              <div className="form-group">
                <label>Categorie</label>
                <select name="category" value={reportData.category} onChange={handleChange} className="cyber-input">
                  <option value="bug">Bug tehnic</option>
                  <option value="account">Cont / autentificare</option>
                  <option value="content">Continut gresit</option>
                  <option value="other">Alta situatie</option>
                </select>
              </div>

              <div className="form-group">
                <label>Detalii</label>
                <textarea
                  name="details"
                  value={reportData.details}
                  onChange={handleChange}
                  className="cyber-input report-textarea"
                  placeholder="Descrie pe scurt ce s-a intamplat si unde ai observat problema."
                  required
                />
              </div>

              <button type="submit" className="neon-btn social-btn">
                Trimite raport
              </button>
            </form>

            {reportSubmitted && (
              <p className="report-success">Raportul a fost salvat cu succes. Il poti verifica ulterior din datele locale ale aplicatiei.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default Contact;
