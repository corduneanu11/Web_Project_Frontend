import React, { useState, useEffect } from 'react';
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
import Profil from './components/Profil/Profil';
import AdminPanel from './components/AdminPanel/AdminPanel';
import NotificationModal from './components/NotificationModal/NotificationModal';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);

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

  const totalCartCount = (cartItems || []).reduce((acc, item) => acc + (item?.quantity || 0), 0);

  const handleLogin = (username) => {
    setCurrentUser(username);
    setShowWelcome(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Wrapper helper (element renderer) in loc de componenta inline pentru a preveni unmount-ul (state reset)
  const renderAuth = (element) => {
    if (!currentUser) {
      return (
        <>
          <MainContent />
          <RestrictedModal isOpen={true} onOpenLogin={() => setIsAuthOpen(true)} />
        </>
      );
    }
    return element;
  };

  // Handle Notifications load
  useEffect(() => {
    if (currentUser) {
      try {
        const savedNotifs = JSON.parse(localStorage.getItem(`hybridNotifs_${currentUser}`) || '[]');
        setNotifications(savedNotifs || []);
      } catch (e) {
        setNotifications([]);
      }
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  // Periodic check for notifications
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      try {
        const savedNotifs = JSON.parse(localStorage.getItem(`hybridNotifs_${currentUser}`) || '[]');
        if (JSON.stringify(savedNotifs) !== JSON.stringify(notifications)) {
          setNotifications(savedNotifs || []);
        }
      } catch (e) {}
    }, 2000); 
    return () => clearInterval(interval);
  }, [currentUser, notifications]);

  const markAllAsRead = () => {
    if (!currentUser) return;
    const updated = (notifications || []).map(n => n ? {...n, read: true} : n);
    setNotifications(updated);
    localStorage.setItem(`hybridNotifs_${currentUser}`, JSON.stringify(updated));
  };

  const markAsRead = (id) => {
    if (!currentUser) return;
    const updated = (notifications || []).map(n => (n && n.id === id) ? {...n, read: true} : n);
    setNotifications(updated);
    localStorage.setItem(`hybridNotifs_${currentUser}`, JSON.stringify(updated));
  };
  
  // Resincronizare cos de cumparaturi care a fost stearsa accidental
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('hybridCart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart) || []);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('hybridCart', JSON.stringify(cartItems || []));
  }, [cartItems]);

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
          notificationsCount={(notifications || []).filter(n => n && !n.read).length}
          toggleNotifs={() => setIsNotifOpen(!isNotifOpen)}
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
          <Route path="/joc" element={renderAuth(<Joc currentUser={currentUser} />)} />
          <Route path="/magazin" element={renderAuth(<Magazin onAddToCart={handleAddToCart} />)} />
          <Route path="/produs/:id" element={renderAuth(<ProductDetails onAddToCart={handleAddToCart} />)} />
          <Route path="/checkout" element={renderAuth(<Checkout cartItems={cartItems} clearCart={clearCart} />)} />
          <Route path="/profil" element={renderAuth(<Profil currentUser={currentUser}/>)} />
          <Route path="/admin" element={currentUser === 'admin' ? <AdminPanel currentUser={currentUser}/> : renderAuth(<MainContent />)} />
        </Routes>
        
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLogin={handleLogin} 
        />
        
        <NotificationModal 
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          notifications={notifications}
          markAllAsRead={markAllAsRead}
          markAsRead={markAsRead}
        />

        <WelcomeModal
          isOpen={showWelcome}
          onClose={() => setShowWelcome(false)}
          username={currentUser}
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;