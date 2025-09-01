import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ActivityChart from '../ActivityChart/ActivityChart';
import PopupMenu from '../PopupMenu/PopupMenu';
import SettingsPopupContent from '../SettingsPopupContent/SettingsPopupContent';
import NotificationsPopupContent from '../NotificationsPopupContent/NotificationsPopupContent';
import FriendsPopupContent from '../FriendsPopupContent/FriendsPopupContent'; // Importado
import InfoPopup from '../InfoPopup/InfoPopup';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

// Dados de exemplo para amigos online
const onlineFriends = [
    { id: 1, avatarUrl: 'https://i.pravatar.cc/28?u=friend1' },
    { id: 2, avatarUrl: 'https://i.pravatar.cc/28?u=friend2' },
    { id: 3, avatarUrl: 'https://i.pravatar.cc/28?u=friend3' },
];

function SideBar({ settings, onSave }) {
    const [activePopup, setActivePopup] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleIconClick = (popupName) => {
        setActivePopup(popupName);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    const handleSaveAndNotify = (newSettings) => {
        onSave(newSettings);
        setActivePopup(null);
        setShowSuccessPopup(true);
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

                {/* A seção de amigos agora abre um pop-up */}
                <div className="friends-section" onClick={() => handleIconClick('friends')}>
                    <div className="friends-header">
                        <div className="friends-label">
                            <FontAwesomeIcon icon={faUserFriends} />
                            <span>Amigos</span>
                        </div>
                        <div className="friends-count">128</div>
                    </div>
                    <div className="online-friends">
                        {onlineFriends.map(friend => (
                            <img 
                                key={friend.id} 
                                src={friend.avatarUrl} 
                                alt={`Friend ${friend.id}`} 
                                className="friend-avatar" 
                            />
                        ))}
                    </div>
                </div>

                <Calendar />
                <ActivityChart />
            </div>
            
            {/* Renderização condicional dos pop-ups */}
            {activePopup === 'notifications' && (<PopupMenu title="Notificações" onClose={handleClosePopup} size="medium"><NotificationsPopupContent /></PopupMenu>)}
            
            {activePopup === 'settings' && (
                <PopupMenu title="Configurações" onClose={handleClosePopup} size="large">
                    <SettingsPopupContent currentSettings={settings} onSave={handleSaveAndNotify} />
                </PopupMenu>
            )}

            {/* Pop-up de amigos com o novo tamanho "friends" */}
            {activePopup === 'friends' && (
                <PopupMenu title="Lista de Amigos" onClose={handleClosePopup} size="friends">
                    <FriendsPopupContent />
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