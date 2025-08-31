import React from 'react';
import './InfoPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function InfoPopup({ message, onClose }) {
    return (
        <div className="info-popup">
            <div className="info-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <p className="info-message">{message}</p>
            <div className="popup-actions">
                <button className="btn btn-ok" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
}

export default InfoPopup;