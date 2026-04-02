import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartModal.css';

function CartModal({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  const totalCost = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <>
      <div className="cart-modal-overlay" onClick={onClose}></div>
      <div className={`cart-modal-container ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Cosul Tau</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-cart-msg">Cosul tau este gol. Incepe antrenamentul!</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.options && item.options.gramaj && (
                    <span className="cart-item-options">Gramaj: {item.options.gramaj}</span>
                  )}
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => onRemove(item.cartId)}>Sterge</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price * item.quantity} RON
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>{totalCost} RON</span>
          </div>
          <button className="neon-btn checkout-btn" disabled={cartItems.length === 0} onClick={handleCheckout}>
            Finalizeaza Comanda
          </button>
        </div>
      </div>
    </>
  );
}

export default CartModal;
