import React, { useState } from 'react';
import './NotificationsPopupContent.css';

// Componente para um item de notificação individual
function NotificationItem({ text, time }) {
    return (
        <div className="notification-item">
            <p className="notification-text">{text}</p>
            <span className="notification-time">{time}</span>
        </div>
    );
}


function NotificationsPopupContent() {
    const [activeTab, setActiveTab] = useState('geral'); // 'geral', 'amigos', 'comunidade'

    const renderContent = () => {
        switch (activeTab) {
            case 'geral':
                return (
                    <div className="notifications-list empty">
                        <p>Nenhuma notificação da comunidade no momento.</p>
                    </div>
                );
            case 'amigos':
                return (
                    <div className="notifications-list empty">
                        <p>Nenhuma notificação da comunidade no momento.</p>
                    </div>
                );
            case 'comunidade':
                return (
                    <div className="notifications-list empty">
                        <p>Nenhuma notificação da comunidade no momento.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="notifications-popup-container">
            <div className="notifications-tabs">
                <button
                    className={`tab-btn ${activeTab === 'geral' ? 'active' : ''}`}
                    onClick={() => setActiveTab('geral')}
                >
                    Geral
                </button>
                <button
                    className={`tab-btn ${activeTab === 'amigos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('amigos')}
                >
                    Amigos
                </button>
                <button
                    className={`tab-btn ${activeTab === 'comunidade' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comunidade')}
                >
                    Comunidade
                </button>
            </div>
            <div className="notifications-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default NotificationsPopupContent;