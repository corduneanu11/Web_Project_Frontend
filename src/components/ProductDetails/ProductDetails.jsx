import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allProducts } from '../../data/products';
import './ProductDetails.css';

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  
  // Protectie suplimentara in caz ca `allProducts` e null temporar
  const productInfo = (allProducts && allProducts.length > 0) 
    ? allProducts.find(p => p.id === id) 
    : null;

  const [quantity, setQuantity] = useState(1);
  const [gramaj, setGramaj] = useState('500g'); // Implicit pentru suplimente

  if (!productInfo) {
    return (
      <main className="product-details-page">
        <div className="not-found">
          <h2>Produsul cu ID-ul "{id}" nu a fost gasit. (Eroare date)</h2>
          <Link to="/magazin" className="neon-btn">Inapoi la magazin</Link>
        </div>
      </main>
    );
  }

  const isSupplement = productInfo.category === 'Suplimente';
  
  let basePrice = productInfo.price;
  if (isSupplement && gramaj === '1kg') {
    basePrice = Math.floor(productInfo.price * 1.8);
  }
  const finalPrice = basePrice * quantity;

  const handleAdd = (e) => {
    if (!onAddToCart || !productInfo) return;

    const img = document.querySelector('.details-image'); 
    const cartIcon = document.getElementById('cart-icon');

    if (img && cartIcon) {
      const imgRect = img.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyingImg = img.cloneNode();
      flyingImg.style.position = 'fixed';
      flyingImg.style.zIndex = '9999';
      flyingImg.style.top = `${imgRect.top}px`;
      flyingImg.style.left = `${imgRect.left}px`;
      flyingImg.style.width = `${imgRect.width}px`;
      flyingImg.style.height = `${imgRect.height}px`;
      flyingImg.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      flyingImg.style.borderRadius = '50%';
      flyingImg.style.pointerEvents = 'none';
      document.body.appendChild(flyingImg);

      void flyingImg.offsetWidth; 

      flyingImg.style.top = `${cartRect.top}px`;
      flyingImg.style.left = `${cartRect.left}px`;
      flyingImg.style.width = '20px';
      flyingImg.style.height = '20px';
      flyingImg.style.opacity = '0.2';

      setTimeout(() => {
        flyingImg.remove();
        onAddToCart({ ...productInfo, price: basePrice }, quantity, isSupplement ? { gramaj } : {});
      }, 800);
    } else {
      onAddToCart({ ...productInfo, price: basePrice }, quantity, isSupplement ? { gramaj } : {});
    }
  };

  return (
    <main className="product-details-page">
      <div className="details-container cyber-panel">
        <div className="details-image-section">
          {productInfo.image ? (
            <img src={productInfo.image} alt={productInfo.name} className="details-image" />
          ) : (
            <div style={{color: 'white', padding: '20px'}}>Imagine indisponibila</div>
          )}
        </div>
        <div className="details-info-section">
          <h1>{productInfo.name}</h1>
          <p className="details-category">{productInfo.category}</p>
          
          <div className="product-options">
            {isSupplement ? (
              <div className="supplement-options">
                <div className="option-group">
                  <label>Gramaj:</label>
                  <select value={gramaj} onChange={e => setGramaj(e.target.value)} className="cyber-select">
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                  </select>
                </div>
                
                <div className="option-group">
                  <label>Cantitate:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={quantity} 
                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} 
                    className="cyber-input"
                  />
                </div>

                <div className="admin-info">
                  <strong>ℹ️ Administrare:</strong> {productInfo.administration}
                </div>
              </div>
            ) : (
              <div className="option-group">
                <label>Cantitate:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={quantity} 
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))} 
                  className="cyber-input"
                />
              </div>
            )}
          </div>

          <div className="details-price">{finalPrice} RON</div>
          <div className="details-divider"></div>
          <p className="details-desc">{productInfo.fullDesc}</p>
          
          <div className="details-actions">
            <button className="neon-btn large-btn" onClick={handleAdd}>
              Adauga in Cos
            </button>
            <Link to="/magazin" className="back-link">Inapoi la Magazin</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
