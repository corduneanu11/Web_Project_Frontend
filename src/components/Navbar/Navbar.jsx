import React from 'react';
import { Link } from 'react-router-dom'; // Importam Link de la react-router
import './Navbar.css';

function Navbar({ isLoggedIn, username, cartCount, toggleCart, onLoginClick, onLogout, notificationsCount, toggleNotifs }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        {/* Facem sloganul sa functioneze ca buton de "Home" */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="slogan">HYBRID CALISTHENICS</span>
        </Link>
      </div>
      
      <nav className="nav-center">
        {isLoggedIn && <Link to="/profil" className="nav-link" style={{ textDecoration: 'none' }}>Profil</Link>}
        <Link to="/magazin" className="nav-link" style={{ textDecoration: 'none' }}>Magazin</Link>
        <Link to="/joc" className="nav-link" style={{ textDecoration: 'none' }}>Joc</Link>
        <Link to="/contact" className="nav-link" style={{ textDecoration: 'none' }}>Contact</Link>
        {username === 'admin' && <Link to="/admin" className="nav-link admin-link" style={{ textDecoration: 'none', color: '#ff4d4d', fontWeight: 'bold', textShadow: '0 0 10px #ff4d4d' }}>Autoritate</Link>}
      </nav>
      
      <div className="nav-right">
        {isLoggedIn ? (
          <div className="user-menu" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="user-greeting">Salut, <span className="highlight">{username}</span></span>
            <button className="neon-btn logout-btn" onClick={onLogout} style={{ marginLeft: '15px', padding: '8px 15px', fontSize: '0.9rem' }}>Logout</button>
          </div>
        ) : (
          <button className="neon-btn" onClick={onLoginClick}>Loghează-te</button>
        )}
        
        {isLoggedIn && (
          <>
            <div className="cart-container" id="notif-icon" onClick={toggleNotifs} style={{ cursor: 'pointer', marginRight: '15px' }}>
              <span style={{ fontSize: '1.4rem' }}>🔔</span>
              {notificationsCount > 0 && <span className="cart-badge" style={{ right: '-5px', top: '-5px' }}>{notificationsCount}</span>}
            </div>

            <div className="cart-container" id="cart-icon" onClick={toggleCart} style={{ cursor: 'pointer' }}>
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;