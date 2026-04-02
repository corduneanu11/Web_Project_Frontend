import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';

function MainContent() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1200&auto=format&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImgIndex, images.length]);

  const nextImage = () => {
    setCurrentImgIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentImgIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  return (
    <main className="main-content">

      {/* Sectiunea Hero cu Galerie */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>Progreseaza intr-un mod interactiv</h1>
          
          <div className="themed-paragraph-container">
            <p className="themed-paragraph">
              Bine ati venit pe platforma noastra de calisthenics! Aici puteti sa faceti rost de obiective bine stabilite
              si cum sa ajungeti sa le completati intr-un mod interactiv sub forma unui joc. Totul incepe cu deblocarea nivelelor
              pentru a avansa atat ca si nivel si titlu, cat si ca forta si masa musculara. Prima oara, incepe cu forta pentru
              a debloca nivelul 10, dupa care poti merge si pe calea masei musculare. Motivul pentru care am decis asta este
              ca pentru a face exercitii ce implica dezvoltarea masei musculare, ai nevoie de o baza de forta solida.
              In plus, cu cat ai mai multa forta, cu atat poti face mai multe exercitii ce implica dezvoltarea masei musculare.
              <br /><br />
              De asemenea, nu uita sa te hidratezi si sa te odihnesti corespunzator.<br />
              In cadrul anumitor nivele, va vom da si sfaturi pe parte de alimentatie.
            </p>
            <h2 className="success-msg">Mult succes in calatoria ta!</h2>
          </div>
        </div>
      </div>

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


      <div className="gallery-container">
        <button className="gallery-btn prev-btn" onClick={prevImage}>&#10094;</button>
        <img src={images[currentImgIndex]} alt="Calisthenics" className="gallery-image" />
        <div className="gallery-overlay"></div>
        <button className="gallery-btn next-btn" onClick={nextImage}>&#10095;</button>
      </div>

      <br></br>
      <br></br>

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
                <span>⚠ NECESITA LVL 10 FORTA PENTRU DEBLOCARE</span>
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

      {/* SECTIUNI DE NAVIGARE (PORTAL-URI) */}
      <div className="portal-sections">
        {/* JOC */}
        <div className="portal-row">
          <div className="portal-image">
             <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop" alt="Joc" />
             <div className="portal-overlay"></div>
          </div>
          <div className="portal-content">
             <h2>Joaca & Evolueaza</h2>
             <p>Intra in arena de calisthenics. Deblocheaza abilitati, completeaza provocari si urca in ierarhie in jocul nostru interactiv. Dovedeste ce poti!</p>
             <Link to="/joc" className="neon-btn small-btn">Acceseaza Jocul</Link>
          </div>
        </div>

        {/* MAGAZIN */}
        <div className="portal-row reverse">
          <div className="portal-image">
             <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop" alt="Magazin" />
             <div className="portal-overlay"></div>
          </div>
          <div className="portal-content">
             <h2>Magazin & Echipamente</h2>
             <p>Echipeaza-te cu accesoriile necesare pentru a-ti atinge potentialul maxim. De la paralele, corzi pana la suplimente de inalta calitate.</p>
             <Link to="/shop" className="neon-btn small-btn">Viziteaza Magazinul</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div className="portal-row">
          <div className="portal-image">
             <img src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=800&auto=format&fit=crop" alt="Contact" />
             <div className="portal-overlay"></div>
          </div>
          <div className="portal-content">
             <h2>Comunitate & Contact</h2>
             <p>Ne-ar face placere sa auzim de la tine. Pentru orice intrebari, feedback sau suport tehnic, nu ezita sa ne contactezi.</p>
             <Link to="/contact" className="neon-btn small-btn">Contacteaza-ne</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;