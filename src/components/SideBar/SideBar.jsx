import React from 'react';
import Calendar from '../Calendar/Calendar';
import ActivityChart from '../ActivityChart/ActivityChart';
import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
    return (
        <div className="side-bar">
            <div className="header-actions">
                <FontAwesomeIcon icon={faBell} className="header-icon" />
                <FontAwesomeIcon icon={faCog} className="header-icon" />
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
    );
}

export default SideBar;