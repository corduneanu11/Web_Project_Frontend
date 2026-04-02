import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainContent from './components/MainContent/MainContent';
import Contact from './components/Contact/Contact';
import Joc from './components/Joc/Joc';
import Magazin from './components/Magazin/Magazin';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Footer from './components/Footer/Footer';
import CartModal from './components/CartModal/CartModal';
import Checkout from './components/Checkout/Checkout';
import AuthModal from './components/AuthModal/AuthModal';
import RestrictedModal from './components/RestrictedModal/RestrictedModal';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, quantity = 1, options = {}) => {
    setCartItems((prev) => {
      const optionsKey = JSON.stringify(options || {});
      
      const existingProductIndex = prev.findIndex(item => 
        item.id === product.id && JSON.stringify(item.options || {}) === optionsKey
      );

      if (existingProductIndex >= 0) {
        // Mutatie imutabila pentru React State
        const newCart = [...prev];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: newCart[existingProductIndex].quantity + quantity
        };
        return newCart;
      } else {
        return [...prev, { ...product, quantity, options: options || {}, cartId: Date.now() + Math.random() }];
      }
    });
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateCartItemQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) return handleRemoveFromCart(cartId);
    setCartItems(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Wrapper simplificat pentru protejarea rutelor
  const RequireAuth = ({ children }) => {
    if (!currentUser) {
      return (
        <>
          <MainContent />
          <RestrictedModal isOpen={true} onOpenLogin={() => setIsAuthOpen(true)} />
        </>
      );
    }
    return children;
  };

  return (
    // Router invaluie toata aplicatia pentru a permite navigatia
    <Router>
      <div className="app-container">
        <Navbar 
          isLoggedIn={!!currentUser} 
          username={currentUser} 
          cartCount={totalCartCount} 
          toggleCart={() => setIsCartOpen(!isCartOpen)} 
          onLoginClick={() => setIsAuthOpen(true)}
          onLogout={handleLogout}
        />
        
        <CartModal 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={updateCartItemQuantity}
        />
        
        {/* Aici decidem ce componenta se randeaza in functie de URL */}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/joc" element={<RequireAuth><Joc currentUser={currentUser} /></RequireAuth>} />
          <Route path="/magazin" element={<RequireAuth><Magazin onAddToCart={handleAddToCart} /></RequireAuth>} />
          <Route path="/produs/:id" element={<RequireAuth><ProductDetails onAddToCart={handleAddToCart} /></RequireAuth>} />
          <Route path="/checkout" element={<RequireAuth><Checkout cartItems={cartItems} clearCart={clearCart} /></RequireAuth>} />
        </Routes>
        
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLogin={handleLogin} 
        />
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;