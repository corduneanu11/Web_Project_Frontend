import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';

function MainContent() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = [
    "./src/components/Images/exercise1.jpeg",
    "./src/components/Images/exercise2.jpeg",
    "./src/components/Images/exercise3.jpeg"
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
      {/* Sectiunea Hero cu Galerie (Slider) in Fundal */}
      <div className="hero-section full-width-hero">
        <div className="hero-gallery-container">
          <img key={currentImgIndex} src={images[currentImgIndex]} alt="Calisthenics" className="hero-gallery-image" />
          <div className="hero-gallery-overlay"></div>
        </div>

        <div className="hero-content-corner">
          <h1>Progreseaza intr-un mod interactiv</h1>
          <Link to="/joc" className="neon-btn main-action-btn">Incepe Jocul</Link>
        </div>
      </div>

      <section className="platform-flow-section">
        <div className="platform-flow-header">
          <h2>
            Cum <span>Functioneaza</span>
          </h2>
          <p>Platforma combina progresul din joc, validarea video si magazinul intr-un traseu clar pentru antrenamentul tau.</p>
        </div>

        <div className="platform-flow-grid">
          <article className="flow-card">
            <div className="flow-icon flow-icon-start">01</div>
            <h3>Intri in sistem</h3>
            <p>Iti creezi rutina de start, alegi ramura Fortei si vezi exact ce obiective trebuie sa atingi la nivelul curent.</p>
          </article>

          <article className="flow-card">
            <div className="flow-icon flow-icon-train">02</div>
            <h3>Te antrenezi si trimiti dovada</h3>
            <p>Lucrezi exercitiile cerute, incarci linkul video pentru proba principala si astepti validarea din partea autoritatii.</p>
          </article>

          <article className="flow-card">
            <div className="flow-icon flow-icon-grow">03</div>
            <h3>Deblochezi niveluri si titluri</h3>
            <p>Fiecare promovare iti creste profilul, iti deschide titluri noi si iti permite sa alegi ce identitate vrei sa afisezi.</p>
          </article>
        </div>
      </section>


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
            <Link to="/magazin" className="neon-btn small-btn">Viziteaza Magazinul</Link>
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
