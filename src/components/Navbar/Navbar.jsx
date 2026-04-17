import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, username, cartCount, toggleCart, onLoginClick, onLogout, notificationsCount, toggleNotifs }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
          <span className="slogan">HYBRID CALISTHENICS</span>
        </Link>

        {isLoggedIn && (
          <div className="mobile-cart-icons">
            <div className="cart-container" onClick={toggleNotifs} style={{ cursor: 'pointer', marginRight: '15px' }}>
              <span style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 22a2.3 2.3 0 0 0 2.29-2h-4.58A2.3 2.3 0 0 0 12 22Zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1Z" /></svg>
              </span>
              {notificationsCount > 0 && <span className="cart-badge" style={{ right: '-5px', top: '-5px' }}>{notificationsCount}</span>}
            </div>
            <div className="cart-container cart-target-icon" onClick={toggleCart} style={{ cursor: 'pointer', marginRight: '15px' }}>
              <span className="cart-icon" style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor"><path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM6.2 6l.38 2H20l-1.6 6.59a1 1 0 0 1-.97.76H8a1 1 0 0 1-.98-.8L4.1 4H2V2h3.1a1 1 0 0 1 .98.8L6.2 4H22v2Z" /></svg>
              </span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </div>
        )}

        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <div className={`nav-collapse ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="nav-center">
          {isLoggedIn && <Link to="/profil" className="nav-link" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>Profil</Link>}
          <Link to="/magazin" className="nav-link" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>Magazin</Link>
          <Link to="/joc" className="nav-link" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>Joc</Link>
          <Link to="/contact" className="nav-link" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>Contact</Link>
          {username === 'admin' && <Link to="/admin" className="nav-link admin-link" onClick={handleLinkClick} style={{ textDecoration: 'none', color: '#ff4d4d', fontWeight: 'bold', textShadow: '0 0 10px #ff4d4d' }}>Autoritate</Link>}
        </nav>

        <div className="nav-right">
          {isLoggedIn ? (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="user-greeting">Salut, <span className="highlight">{username}</span></span>
              <button className="neon-btn logout-btn" onClick={() => { onLogout(); handleLinkClick(); }} style={{ marginLeft: '15px', padding: '8px 15px', fontSize: '0.9rem' }}>Logout</button>
            </div>
          ) : (
            <button className="neon-btn" onClick={() => { onLoginClick(); handleLinkClick(); }}>Logheaza-te</button>
          )}

          {isLoggedIn && (
            <div className="desktop-cart-icons">
              <div className="cart-container" id="notif-icon" onClick={toggleNotifs} style={{ cursor: 'pointer', marginRight: '15px' }}>
                <span style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M12 22a2.3 2.3 0 0 0 2.29-2h-4.58A2.3 2.3 0 0 0 12 22Zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1Z" />
                  </svg>
                </span>
                {notificationsCount > 0 && <span className="cart-badge" style={{ right: '-5px', top: '-5px' }}>{notificationsCount}</span>}
              </div>

              <div className="cart-container cart-target-icon" onClick={toggleCart} style={{ cursor: 'pointer' }}>
                <span className="cart-icon" style={{ width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
                    <path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM6.2 6l.38 2H20l-1.6 6.59a1 1 0 0 1-.97.76H8a1 1 0 0 1-.98-.8L4.1 4H2V2h3.1a1 1 0 0 1 .98.8L6.2 4H22v2Z" />
                  </svg>
                </span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
