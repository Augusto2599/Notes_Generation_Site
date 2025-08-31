import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import ActivityChart from '../ActivityChart/ActivityChart';
import PopupMenu from '../PopupMenu/PopupMenu';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
    const [activePopup, setActivePopup] = useState(null);

    const handleIconClick = (popupName) => {
        setActivePopup(popupName);
    };

    const handleClosePopup = () => {
        setActivePopup(null);
    };

    return (
        <>
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

            {activePopup === 'notifications' && (
                <PopupMenu title="Notificações" onClose={handleClosePopup} size="small">
                    <p>Nenhuma notificação nova no momento.</p>
                </PopupMenu>
            )}

            {activePopup === 'settings' && (
                <PopupMenu title="Configurações" onClose={handleClosePopup} size="medium">
                    <ul>
                        <li>Editar Perfil</li>
                        <li>Privacidade</li>
                        <li>Preferências de Tema</li>
                        <li>Sair</li>
                    </ul>
                </PopupMenu>
            )}
        </>
    );
}

export default SideBar;