import React, { useState, useEffect } from 'react';
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
    { id: 1, userId: 2, title: 'Ideias para Projeto', userAvatar: 'https://i.pravatar.cc/32?u=user2', text: 'Desenvolver um sistema de notas com funcionalidades de compartilhamento e colaboração em tempo real.', dateInfo: '15/08/2023 10:30', liked: false, color: '#b3e5fc' },
    { id: 2, userId: 3, title: 'Lista de Tarefas', userAvatar: 'https://i.pravatar.cc/32?u=user3', text: '- Finalizar relatório<br>- Reunião com equipe às 14h<br>- Revisar documentação', dateInfo: '14/08/2023 16:45', liked: true, color: '#ffccd5' },
    { id: 3, userId: 4, title: 'Reunião Importante', userAvatar: 'https://i.pravatar.cc/32?u=user4', text: 'Discutir as novas funcionalidades do sistema e definir prazos para a próxima sprint de desenvolvimento.', dateInfo: '13/08/2023 09:15', liked: false, color: '#ffffff' },
    { id: 4, userId: 123456, title: 'Minha Anotação Pessoal', userAvatar: null, text: 'Esta é uma nota pessoal e deve mostrar meu avatar customizado.', dateInfo: '31/08/2025 16:30', liked: false, color: '#c8e6c9' }
];

function MainContent({ settings }) {
    const [cards, setCards] = useState(() => {
        const savedCards = localStorage.getItem('notesData');
        return savedCards ? JSON.parse(savedCards) : INITIAL_CARDS_DATA;
    });

    const [displayedCards, setDisplayedCards] = useState(cards);

    // States for filters
    const [showLiked, setShowLiked] = useState(false);
    const [showUserNotes, setShowUserNotes] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    // States for popups
    const [showCalendar, setShowCalendar] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [sharingNote, setSharingNote] = useState(null);
    const [deletingNoteId, setDeletingNoteId] = useState(null);
    const [shareSuccessMessage, setShareSuccessMessage] = useState('');

    // ALTERAÇÃO: Este useEffect agora também recarrega os dados do localStorage
    // se o componente for re-renderizado (por exemplo, ao voltar da página da comunidade)
    useEffect(() => {
        const savedCards = localStorage.getItem('notesData');
        const currentCards = savedCards ? JSON.parse(savedCards) : INITIAL_CARDS_DATA;
        setCards(currentCards);
    }, []); // Executa apenas uma vez na montagem inicial

    useEffect(() => {
        localStorage.setItem('notesData', JSON.stringify(cards));
        
        let filteredCards = [...cards];
        if (showLiked) {
            filteredCards = filteredCards.filter(card => card.liked);
        }
        if (showUserNotes) {
            filteredCards = filteredCards.filter(card => card.userId === 123456);
        }
        if (selectedDate) {
            const dateToFilter = formatDate(selectedDate);
            filteredCards = filteredCards.filter(card => card.dateInfo.split(' ')[0] === dateToFilter);
        }
        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || "";
            filteredCards = filteredCards.filter(card =>
                card.title.toLowerCase().includes(lowercasedQuery) ||
                stripHtml(card.text).toLowerCase().includes(lowercasedQuery)
            );
        }
        setDisplayedCards(filteredCards);
    }, [cards, showLiked, showUserNotes, selectedDate, searchQuery]);


    const formatDate = (date) => {
        if (!date) return 'Data';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleLike = (cardId) => {
        const updatedCards = cards.map(card =>
            card.id === cardId ? { ...card, liked: !card.liked } : card
        );
        setCards(updatedCards);
    };

    const handleDeleteRequest = (cardId) => {
        setDeletingNoteId(cardId);
    };

    const confirmDelete = () => {
        if (deletingNoteId) {
            const updatedCards = cards.filter(card => card.id !== deletingNoteId);
            setCards(updatedCards);
            setDeletingNoteId(null);
        }
    };

    const handleSaveNote = (updatedNote) => {
        const updatedCards = cards.map(card =>
            card.id === updatedNote.id ? updatedNote : card
        );
        setCards(updatedCards);
        setEditingNote(null);
    };

    const handleShareSuccess = (message) => {
        setSharingNote(null);
        setShareSuccessMessage(message);
    };

    const handleLikeFilter = () => setShowLiked(prev => !prev);
    const handleNoteFilter = () => setShowUserNotes(prev => !prev);
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };
    const clearDateFilter = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
    };

    return (
        <div className="main-content">
            <div className="content-header">
                <div className="filters">
                    <button className={`filter-btn ${showLiked ? 'filter-active' : ''}`} onClick={handleLikeFilter}><FontAwesomeIcon icon={faHeart} /><span>Likes</span></button>
                    <div className="filter-container" onMouseEnter={() => setShowCalendar(true)} onMouseLeave={() => setShowCalendar(false)}>
                        <button className={`filter-btn ${selectedDate ? 'filter-active' : ''}`}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>{formatDate(selectedDate)}</span>
                            {selectedDate && <FontAwesomeIcon icon={faTimes} className="clear-filter-icon" onClick={clearDateFilter} />}
                        </button>
                        {showCalendar && <div className="calendar-popup"><Calendar onDateSelect={handleDateSelect} /></div>}
                    </div>
                    <button className={`filter-btn ${showUserNotes ? 'filter-active' : ''}`} onClick={handleNoteFilter}><FontAwesomeIcon icon={faUser} /><span>Note</span></button>
                </div>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <div className="content-center">
                {displayedCards.map(card => {
                    const isCurrentUser = card.userId === 123456;
                    return (
                        <Card
                            key={card.id}
                            data={card}
                            pageType="home"
                            onLike={handleLike}
                            onDelete={handleDeleteRequest}
                            onEdit={(note) => setEditingNote(note)}
                            onShare={(note) => setSharingNote(note)}
                            currentUserAvatar={isCurrentUser ? settings.avatar : null}
                        />
                    );
                })}
            </div>
            {editingNote && <PopupMenu title="Editar Nota" onClose={() => setEditingNote(null)} size="medium"><EditNotePopup note={editingNote} onSave={handleSaveNote} onClose={() => setEditingNote(null)} /></PopupMenu>}
            {sharingNote && <PopupMenu title="Compartilhar Nota" onClose={() => setSharingNote(null)} size="small"><SharePopup note={sharingNote} onClose={() => setSharingNote(null)} onShared={handleShareSuccess} /></PopupMenu>}
            {deletingNoteId && <PopupMenu title="Confirmar Exclusão" onClose={() => setDeletingNoteId(null)} size="small"><ConfirmPopup message="Deseja realmente excluir esta nota?" warning="Esta ação não pode ser desfeita." onConfirm={confirmDelete} onCancel={() => setDeletingNoteId(null)} confirmText="Excluir" /></PopupMenu>}
            {shareSuccessMessage && <PopupMenu title="Sucesso" onClose={() => setShareSuccessMessage('')} size="small"><InfoPopup message={shareSuccessMessage} onClose={() => setShareSuccessMessage('')} /></PopupMenu>}
        </div>
    );
}

export default MainContent;