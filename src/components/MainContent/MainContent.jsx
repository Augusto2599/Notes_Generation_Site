import React, { useState } from 'react';
import Card from '../card/Card';
import Calendar from '../Calendar/Calendar';
import PopupMenu from '../PopupMenu/PopupMenu';
import EditNotePopup from '../EditNotePopup/EditNotePopup';
import SharePopup from '../SharePopup/SharePopup';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import './MainContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faSearch, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

const INITIAL_CARDS_DATA = [
    {
        id: 1,
        userId: 2, // ID de outro usuário
        title: 'Ideias para Projeto',
        userInitial: 'J',
        text: 'Desenvolver um sistema de notas com funcionalidades de compartilhamento e colaboração em tempo real.',
        dateInfo: '15/08/2023 10:30',
        liked: false,
        color: '#b3e5fc'
    },
    {
        id: 2,
        userId: 3, // ID de outro usuário
        title: 'Lista de Tarefas',
        userInitial: 'M',
        text: '- Finalizar relatório<br>- Reunião com equipe às 14h<br>- Revisar documentação',
        dateInfo: '14/08/2023 16:45',
        liked: true,
        color: '#ffccd5'
    },
    {
        id: 3,
        userId: 4, // ID de outro usuário
        title: 'Reunião Importante',
        userInitial: 'A',
        text: 'Discutir as novas funcionalidades do sistema e definir prazos para a próxima sprint de desenvolvimento.',
        dateInfo: '13/08/2023 09:15',
        liked: false,
        color: '#ffffff'
    },
    {
        id: 4,
        userId: 123456, // ID do usuário logado (correspondente ao da SideBar)
        title: 'Minha Anotação Pessoal',
        userInitial: 'U', // Inicial padrão, será substituída pelo avatar
        text: 'Esta é uma nota pessoal e deve mostrar meu avatar customizado.',
        dateInfo: '31/08/2025 16:30',
        liked: false,
        color: '#c8e6c9'
    }
];

function MainContent({ settings }) {
    const [cards, setCards] = useState(INITIAL_CARDS_DATA);
    const [displayedCards, setDisplayedCards] = useState(INITIAL_CARDS_DATA);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingNote, setEditingNote] = useState(null);
    const [sharingNote, setSharingNote] = useState(null);
    const [deletingNoteId, setDeletingNoteId] = useState(null);
    const [shareSuccessMessage, setShareSuccessMessage] = useState('');

    const handleLike = (cardId) => {
        const updatedCards = cards.map(card =>
            card.id === cardId ? { ...card, liked: !card.liked } : card
        );
        setCards(updatedCards);
        setDisplayedCards(updatedCards);
    };

    const handleDeleteRequest = (cardId) => {
        setDeletingNoteId(cardId);
    };

    const confirmDelete = () => {
        if (deletingNoteId) {
            const updatedCards = cards.filter(card => card.id !== deletingNoteId);
            setCards(updatedCards);
            setDisplayedCards(updatedCards);
            setDeletingNoteId(null);
        }
    };

    const handleSaveNote = (updatedNote) => {
        const updatedCards = cards.map(card =>
            card.id === updatedNote.id ? updatedNote : card
        );
        setCards(updatedCards);
        setDisplayedCards(updatedCards);
        setEditingNote(null);
    };

    const handleShareSuccess = (message) => {
        setSharingNote(null);
        setShareSuccessMessage(message);
    };

    const formatDate = (date) => {
        if (!date) return 'Data';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);

        const dateToFilter = formatDate(date);
        const filteredCards = cards.filter(card => {
            const cardDate = card.dateInfo.split(' ')[0];
            return cardDate === dateToFilter;
        });
        setDisplayedCards(filteredCards);
    };

    const clearDateFilter = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
        setDisplayedCards(cards);
    };

    return (
        <div className="main-content">
            <div className="content-header">
                <div className="filters">
                    <button className="filter-btn">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Likes</span>
                    </button>

                    <div
                        className="filter-container"
                        onMouseEnter={() => setShowCalendar(true)}
                        onMouseLeave={() => setShowCalendar(false)}
                    >
                        <button className={`filter-btn ${selectedDate ? 'filter-active' : ''}`}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>{formatDate(selectedDate)}</span>
                            {selectedDate && (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="clear-filter-icon"
                                    onClick={clearDateFilter}
                                />
                            )}
                        </button>
                        {showCalendar && (
                            <div className="calendar-popup">
                                <Calendar onDateSelect={handleDateSelect} />
                            </div>
                        )}
                    </div>

                    <button className="filter-btn">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Note</span>
                    </button>
                </div>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Search notes..." />
                </div>
            </div>

            <div className="content-center">
                {displayedCards.map(card => {
                    const isCurrentUser = card.userId === 123456;
                    return (
                        <Card
                            key={card.id}
                            data={card}
                            onLike={handleLike}
                            onDelete={handleDeleteRequest}
                            onEdit={(note) => setEditingNote(note)}
                            onShare={(note) => setSharingNote(note)}
                            currentUserAvatar={isCurrentUser ? settings.avatar : null}
                        />
                    );
                })}
            </div>

            {editingNote && (
                <PopupMenu title="Editar Nota" onClose={() => setEditingNote(null)} size="medium">
                    <EditNotePopup
                        note={editingNote}
                        onSave={handleSaveNote}
                        onClose={() => setEditingNote(null)}
                    />
                </PopupMenu>
            )}

            {sharingNote && (
                <PopupMenu title="Compartilhar Nota" onClose={() => setSharingNote(null)} size="small">
                    <SharePopup
                        note={sharingNote}
                        onClose={() => setSharingNote(null)}
                        onShared={handleShareSuccess}
                    />
                </PopupMenu>
            )}

            {deletingNoteId && (
                <PopupMenu title="Confirmar Exclusão" onClose={() => setDeletingNoteId(null)} size="small">
                    <ConfirmPopup
                        message="Deseja realmente excluir esta nota?"
                        warning="Esta ação não pode ser desfeita."
                        onConfirm={confirmDelete}
                        onCancel={() => setDeletingNoteId(null)}
                        confirmText="Excluir"
                    />
                </PopupMenu>
            )}

            {shareSuccessMessage && (
                <PopupMenu title="Sucesso" onClose={() => setShareSuccessMessage('')} size="small">
                    <InfoPopup
                        message={shareSuccessMessage}
                        onClose={() => setShareSuccessMessage('')}
                    />
                </PopupMenu>
            )}
        </div>
    );
}

export default MainContent;