import React from 'react';
import './Contact.css';

function Contact() {
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
                <span className="info-value">Bucuresti, Sectorul 5, Bulevardul George Coșbuc 39-49, 050141</span>
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

        {/* Sectiunea Noua: Butoane Social Media */}
        <div className="social-links-section">
          <a href="https://www.instagram.com/arian_andrei11/" target="_blank" rel="noreferrer" className="neon-btn social-btn ig-btn">
            INSTAGRAM
          </a>
        </div>

      </div>
    </main>
  );
}

export default Contact;