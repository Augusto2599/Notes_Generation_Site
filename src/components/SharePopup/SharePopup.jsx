import React from 'react';
import jsPDF from 'jspdf';
import './SharePopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faUsers } from '@fortawesome/free-solid-svg-icons';

// A prop 'onShared' foi adicionada
function SharePopup({ note, onClose, onShared }) {
    const handleDownloadPdf = () => {
        const doc = new jsPDF();

        // Remove tags HTML para o PDF
        const textContent = note.text.replace(/<br\s*\/?>/gi, '\n');

        doc.setFontSize(18);
        doc.text(note.title, 10, 20);

        doc.setFontSize(12);
        doc.text(textContent, 10, 30);

        doc.save(`${note.title.replace(/\s+/g, '_')}.pdf`);
        onClose();
    };

    const handleShareToCommunity = () => {
        // Agora chama a função do componente pai
        onShared(`Nota "${note.title}" compartilhada com sucesso!`);
        onClose(); // Fecha o pop-up de compartilhamento
    };

    return (
        <div className="share-popup">
            <p>Escolha como você deseja compartilhar esta nota:</p>
            <div className="share-options">
                <button className="share-btn" onClick={handleShareToCommunity}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Compartilhar na Comunidade</span>
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