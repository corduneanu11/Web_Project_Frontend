import React from 'react';
import './WelcomeModal.css';

function WelcomeModal({ isOpen, onClose, username }) {
  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal cyber-panel welcome-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>&times;</button>

        <h2 className="welcome-title">Ai intrat in sistem, {username}!</h2>

        <div className="welcome-paragraph-container">
          <p className="welcome-paragraph">
            Bine ati venit pe platforma noastra de calisthenics! Aici poti sa-ti stabilesti obiective clare
            si sa vezi cum ajungi sa le completezi intr-un mod interactiv sub forma unui joc. Totul incepe cu deblocarea nivelelor
            pentru a avansa atat ca nivel si titlu, cat si ca forta si masa musculara. Prima oara, incepe cu forta pentru
            a debloca nivelul 10, dupa care poti merge si pe calea masei musculare. Motivul este simplu:
            pentru a face exercitii ce implica dezvoltarea masei musculare, ai nevoie de o baza de forta solida.
            In plus, cu cat ai mai multa forta, cu atat poti face mai multe exercitii ce implica dezvoltarea masei musculare.
            <br /><br />
            De asemenea, nu uita sa te hidratezi si sa te odihnesti corespunzator.<br />
          </p>
          <h3 className="welcome-success-msg">Mult succes in calatoria ta!</h3>
        </div>

        <button className="auth-submit-btn welcome-ok-btn" onClick={onClose}>
          Am inteles
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
