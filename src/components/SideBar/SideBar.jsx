import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ActivityChart from '../ActivityChart/ActivityChart';
import PopupMenu from '../PopupMenu/PopupMenu';
import SettingsPopupContent from '../SettingsPopupContent/SettingsPopupContent';
import NotificationsPopupContent from '../NotificationsPopupContent/NotificationsPopupContent';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
    const [activePopup, setActivePopup] = useState(null); // Controla qual popup está visível

    // Função para abrir um popup
    const handleIconClick = (popupName) => {
        setActivePopup(popupName);
    };

    // Função para fechar qualquer popup
    const handleClosePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
            {/* O componente principal da sidebar */}
            <div className="side-bar">
                <div className="header-actions">
                    <FontAwesomeIcon
                        icon={faBell}
                        className="header-icon"
                        onClick={() => handleIconClick('notifications')}
                    />
                    <FontAwesomeIcon
                        icon={faCog}
                        className="header-icon"
                        onClick={() => handleIconClick('settings')}
                    />
                </div>

                <div className="user-profile">
                    <div className="user-avatar">U</div>
                    <div className="user-name">Usuário Exemplo</div>
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

            {/* Renderização condicional dos Popups */}

            {/* Popup de Notificações */}
            {activePopup === 'notifications' && (
                <PopupMenu title="Notificações" onClose={handleClosePopup} size="medium">
                    <NotificationsPopupContent />
                </PopupMenu>
            )}

            {/* Popup de Configurações */}
            {activePopup === 'settings' && (
                <PopupMenu title="Configurações" onClose={handleClosePopup} size="large">
                    <SettingsPopupContent />
                </PopupMenu>
            )}
        </>
    );
}

export default SideBar;