import React from 'react';
import './PopupMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// Adicionamos a prop 'size' com um valor padrão 'medium'
function PopupMenu({ title, children, onClose, size = 'medium' }) {
    
    // Criamos uma classe CSS dinâmica baseada na prop 'size'
    const containerClasses = `popup-menu-container popup-size-${size}`;

    return (
        <div className="popup-menu-overlay" onClick={onClose}>
            <div className={containerClasses} onClick={(e) => e.stopPropagation()}>
                <div className="popup-menu-header">
                    <h3 className="popup-menu-title">{title}</h3>
                    <button className="popup-menu-close-btn" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="popup-menu-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default PopupMenu;