import React, { useState } from 'react';
import './EditNotePopup.css';

const NOTE_COLORS = ['#ffffff', '#ffccd5', '#d4a5a5', '#ffde9e', '#c8e6c9', '#b3e5fc'];

function EditNotePopup({ note, onSave, onClose }) {
    const [title, setTitle] = useState(note.title);
    const [text, setText] = useState(note.text.replace(/<br\s*\/?>/gi, '\n')); // Converte <br> para quebras de linha
    const [color, setColor] = useState(note.color || '#ffffff');

    const handleSave = () => {
        const updatedNote = {
            ...note,
            title,
            text: text.replace(/\n/g, '<br>'), // Converte quebras de linha de volta para <br>
            color,
        };
        onSave(updatedNote);
        onClose();
    };

    return (
        <div className="edit-note-popup">
            <div className="form-group">
                <label htmlFor="note-title">Título</label>
                <input
                    type="text"
                    id="note-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="note-text">Texto</label>
                <textarea
                    id="note-text"
                    rows="6"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <label>Cor da Nota</label>
                <div className="color-options">
                    {NOTE_COLORS.map(c => (
                        <div
                            key={c}
                            className={`color-swatch ${color === c ? 'selected' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => setColor(c)}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="popup-actions">
                <button className="btn btn-cancel" onClick={onClose}>Cancelar</button>
                <button className="btn btn-save" onClick={handleSave}>Salvar</button>
            </div>
        </div>
    );
}

export default EditNotePopup;