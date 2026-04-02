import React from 'react';
import { Link } from 'react-router-dom'; // Importam Link de la react-router
import './Navbar.css';

function Navbar({ isLoggedIn, username, cartCount, toggleCart, onLoginClick, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        {/* Facem sloganul sa functioneze ca buton de "Home" */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="slogan">HYBRID CALISTHENICS</span>
        </Link>
      </div>
      
      <nav className="nav-center">
        <Link to="/magazin" className="nav-link" style={{ textDecoration: 'none' }}>Magazin</Link>
        <Link to="/joc" className="nav-link" style={{ textDecoration: 'none' }}>Joc</Link>
        {/* Transformam butonul de Contact in Link catre ruta /contact */}
        <Link to="/contact" className="nav-link" style={{ textDecoration: 'none' }}>Contact</Link>
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
        
        <div className="cart-container" id="cart-icon" onClick={toggleCart} style={{ cursor: 'pointer' }}>
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;