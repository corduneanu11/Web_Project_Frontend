import React from 'react';
import { Link } from 'react-router-dom';
import { equipment, supplements } from '../../data/products';
import './Magazin.css';

function Magazin({ onAddToCart }) {

  const handleAddToCartEvent = (e, product) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    // Logica pentru animatia "fly to cart"
    const btn = e.target;
    // Cautare imagine produs din acest card
    const card = btn.closest('.product-card');
    const img = card.querySelector('.product-image');
    // Caseta cosului de cumparaturi din Navbar
    const cartIcon = document.getElementById('cart-icon');

    if (img && cartIcon) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      // Clonam imaginea pentru a o anima
      const flyingImg = img.cloneNode();
      flyingImg.style.position = 'fixed';
      flyingImg.style.zIndex = '9999';
      flyingImg.style.top = `${imgRect.top}px`;
      flyingImg.style.left = `${imgRect.left}px`;
      flyingImg.style.width = `${imgRect.width}px`;
      flyingImg.style.height = `${imgRect.height}px`;
      flyingImg.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      flyingImg.style.borderRadius = '50%';
      flyingImg.style.pointerEvents = 'none'; // Evitam interceptarea click-urilor
      document.body.appendChild(flyingImg);

      // Trigger reflow pentru a aplica tranzitia
      void flyingImg.offsetWidth; 

      // Setam coordonatele destinatiei
      flyingImg.style.top = `${cartRect.top}px`;
      flyingImg.style.left = `${cartRect.left}px`;
      flyingImg.style.width = '20px';
      flyingImg.style.height = '20px';
      flyingImg.style.opacity = '0.2';

      // Asteptam terminarea animatiei apoi adaugam produsul
      setTimeout(() => {
        flyingImg.remove();
        onAddToCart(product);
      }, 800);
    } else {
      onAddToCart(product); // Fallback daca nu gaseste DOM elementele
    }
  };

  const renderProduct = (product) => (
    <Link to={`/produs/${product.id}`} key={product.id} className="product-card cyber-panel" style={{ textDecoration: 'none' }}>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.desc}</p>
        <div className="product-footer">
          <span className="product-price">{product.price} RON</span>
          <button className="neon-btn buy-btn" onClick={(e) => handleAddToCartEvent(e, product)}>Adauga</button>
        </div>
      </div>
    </Link>
  );

  return (
    <main className="magazin-page">
      <div className="magazin-header">
        <h1>ARMORY DE BAZA: Magazin</h1>
        <p>Echipeaza-te corespunzator pentru a cuceri provocarile hibride.</p>
      </div>

      <div className="shop-section">
        <h2 className="section-title">ECHIPAMENTE CALISTHENICS</h2>
        <div className="products-grid">
          {equipment.map(renderProduct)}
        </div>
      </div>

      <div className="shop-section">
        <h2 className="section-title">SUPLIMENTE HIBRIDE</h2>
        <div className="products-grid">
          {supplements.map(renderProduct)}
        </div>
      </div>

    </main>
  );
}

export default Magazin;
