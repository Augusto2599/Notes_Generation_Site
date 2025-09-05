import React from 'react';
import jsPDF from 'jspdf';
import './SharePopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faUsers, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function SharePopup({ note, onClose, onShared }) {
    const handleDownloadPdf = () => {
        const doc = new jsPDF();
        const textContent = note.text.replace(/<br\s*\/?>/gi, '\n');
        doc.setFontSize(18);
        doc.text(note.title, 10, 20);
        doc.setFontSize(12);
        doc.text(textContent, 10, 30);
        doc.save(`${note.title.replace(/\s+/g, '_')}.pdf`);
        onClose();
    };

    const handleShareToCommunity = () => {
        onShared(`Nota "${note.title}" compartilhada na comunidade!`);
        onClose();
    };

    const handleShareWithFriends = () => {
        onShared(`Nota "${note.title}" compartilhada com seus amigos!`);
        onClose();
    };

    return (
        <div className="share-popup">
            <p>Escolha como você deseja compartilhar esta nota:</p>
            <div className="share-options">
                <button className="share-btn" onClick={handleShareToCommunity}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Compartilhar na Comunidade</span>
                </button>
                {/* Novo botão para compartilhar com amigos */}
                <button className="share-btn" onClick={handleShareWithFriends}>
                    <FontAwesomeIcon icon={faUserFriends} />
                    <span>Compartilhar com Amigos</span>
                </button>
                <button className="share-btn" onClick={handleDownloadPdf}>
                    <FontAwesomeIcon icon={faFilePdf} />
                    <span>Baixar como PDF</span>
                </button>
            </div>
        </div>
    );
}

export default SharePopup;