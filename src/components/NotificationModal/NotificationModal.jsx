import React from 'react';
import './NotificationModal.css';

function NotificationModal({ isOpen, onClose, notifications, markAllAsRead, markAsRead }) {
  if (!isOpen) return null;

  return (
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-modal cyber-panel" onClick={e => e.stopPropagation()}>
        <div className="notif-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(212, 148, 255, 0.2)', marginBottom: '1.5rem' }}>
          <h2 className="neon-text" style={{ margin: 0, fontSize: '1.8rem', textTransform: 'uppercase' }}>NOTIFICĂRI</h2>
          <button className="close-btn" style={{ background: 'transparent', color: '#a890c0', border: 'none', fontSize: '2rem', cursor: 'pointer' }} onClick={onClose}>&times;</button>
        </div>

        {(!notifications || notifications.length === 0) ? (
          <p className="empty-notifs">Nu ai nicio notificare momentan.</p>
        ) : (
          <div className="notif-list">
            {(notifications || []).map(n => n && (
              <div 
                key={n.id} 
                className={`notif-item ${n.type} ${!n.read ? 'unread' : ''}`}
                onClick={() => markAsRead && markAsRead(n.id)}
                style={{ cursor: 'pointer', transition: 'background 0.3s' }}
              >
                <p>{n.text}</p>
                <span className="notif-date">{n.date}</span>
              </div>
            ))}
          </div>
        )}
        
        {(notifications || []).some(n => n && !n.read) && (
          <button className="neon-btn clear-all-btn" onClick={markAllAsRead}>
            Marchează toate ca citite
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;
