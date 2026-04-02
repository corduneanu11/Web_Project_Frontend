import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulam timpul necesar pentru procesarea comenzii
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500); 
  };

  if (isProcessing) {
    return (
      <main className="checkout-page">
        <div className="checkout-container cyber-panel flex-center loading-container">
          <div className="loading-spinner"></div>
          <h2 className="processing-text neon-text">Procesam comanda...</h2>
        </div>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="checkout-page">
        <div className="checkout-container cyber-panel flex-center success-container">
          <div className="checkmark-circle">
            <div className="checkmark draw"></div>
          </div>
          <h2 className="neon-text">Comanda finalizata si confirmata!</h2>
          <p className="success-desc">Mai multe detalii pe email.</p>
          <button className="neon-btn mt-4" onClick={() => navigate('/')}>Inapoi Acasa</button>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container cyber-panel">
          <h2>Cosul tau este gol.</h2>
          <button className="neon-btn" onClick={() => navigate('/magazin')}>Inapoi la magazin</button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container cyber-panel">
        <h1 className="checkout-title">FINALIZARE COMANDA</h1>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h3>Sumar Comanda</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.cartId} className="summary-item">
                  <div className="summary-item-info">
                    <span className="summary-qty">{item.quantity}x</span>
                    <span className="summary-name">{item.name} {item.options?.gramaj ? `(${item.options.gramaj})` : ''}</span>
                  </div>
                  <span className="summary-price">{item.price * item.quantity} RON</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total de plata:</span>
              <span className="total-amount">{totalCost} RON</span>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Informatii Livrare</h3>
            <div className="form-group">
              <label>Nume Complet</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="cyber-input" placeholder="Numele tau" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="cyber-input" placeholder="adresa@email.com" />
            </div>
            <div className="form-group">
              <label>Adresa Completa</label>
              <input type="text" name="address" required value={formData.address} onChange={handleChange} className="cyber-input" placeholder="Strada, Numar, Bloc, Apartament" />
            </div>
            <div className="form-group">
              <label>Oras</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} className="cyber-input" placeholder="Orasul tau" />
            </div>

            <h3 className="payment-title">Metoda de Plata</h3>
            <div className="payment-options">
              <label className="payment-radio">
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                <span className="radio-custom"></span>
                Plata cu Cardul (Online)
              </label>
              <label className="payment-radio">
                <input type="radio" name="paymentMethod" value="ramburs" checked={formData.paymentMethod === 'ramburs'} onChange={handleChange} />
                <span className="radio-custom"></span>
                Ramburs la curier (Cash)
              </label>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label>Numar Card</label>
                  <input type="text" pattern="\d*" maxLength="16" required className="cyber-input" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Data Expirare</label>
                    <input type="text" placeholder="LL/AA" required className="cyber-input" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" pattern="\d*" maxLength="3" required className="cyber-input" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="neon-btn large-btn submit-order-btn">
              Confirma si Finalizeaza Comanda
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
