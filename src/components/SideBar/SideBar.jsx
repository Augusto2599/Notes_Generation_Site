import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ActivityChart from '../ActivityChart/ActivityChart';
import PopupMenu from '../PopupMenu/PopupMenu';
import SettingsPopupContent from '../SettingsPopupContent/SettingsPopupContent';
import NotificationsPopupContent from '../NotificationsPopupContent/NotificationsPopupContent';
import InfoPopup from '../InfoPopup/InfoPopup'; // Importado para mensagem de sucesso
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

// Recebe 'settings' e 'onSave' do App.jsx
function SideBar({ settings, onSave }) {
    const [activePopup, setActivePopup] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleIconClick = (popupName) => {
        setActivePopup(popupName);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    // Nova função para salvar e depois mostrar a mensagem de sucesso
    const handleSaveAndNotify = (newSettings) => {
        onSave(newSettings); // Salva os dados no App.jsx
        setActivePopup(null); // Fecha o popup de configurações
        setShowSuccessPopup(true); // Ativa o popup de sucesso
    };

    return (
        <>
            <div className="side-bar">
                <div className="header-actions">
                    <FontAwesomeIcon icon={faBell} className="header-icon" onClick={() => handleIconClick('notifications')} />
                    <FontAwesomeIcon icon={faCog} className="header-icon" onClick={() => handleIconClick('settings')} />
                </div>

                <div className="user-profile">
                    <div className="user-avatar" style={{ backgroundImage: `url(${settings.avatar})`, backgroundSize: 'cover' }}>
                        {!settings.avatar && settings.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-name">{settings.nickname}</div>
                    <div className="user-id">ID: #123456</div>
                </div>

                <div className="friends-section">
                    <div className="friends-header">
                        <div className="friends-label">
                            <FontAwesomeIcon icon={faUserFriends} />
                            <span>Amigos</span>
                        </div>
                        <div className="friends-count">128</div>
                    </div>
                </div>

                <Calendar />
                <ActivityChart />
            </div>

            {activePopup === 'notifications' && (<PopupMenu title="Notificações" onClose={handleClosePopup} size="medium"><NotificationsPopupContent /></PopupMenu>)}

            {activePopup === 'settings' && (
                <PopupMenu title="Configurações" onClose={handleClosePopup} size="large">
                    <SettingsPopupContent currentSettings={settings} onSave={handleSaveAndNotify} />
                </PopupMenu>
            )}

            {showSuccessPopup && (
                <PopupMenu title="Sucesso" onClose={() => setShowSuccessPopup(false)} size="small">
                    <InfoPopup message="Configurações salvas com sucesso!" onClose={() => setShowSuccessPopup(false)} />
                </PopupMenu>
            )}
        </>
    );
}

export default SideBar;