import React from 'react';
import './ConfirmPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function ConfirmPopup({ message, warning, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) {
    return (
        <div className="confirm-popup">
            <div className="confirm-icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <p className="confirm-message">{message}</p>
            {warning && <p className="confirm-warning">{warning}</p>}
            <div className="popup-actions">
                <button className="btn btn-cancel" onClick={onCancel}>
                    {cancelText}
                </button>
                <button className="btn btn-confirm-delete" onClick={onConfirm}>
                    {confirmText}
                </button>
            </div>
        </div>
    );
}

export default ConfirmPopup;