import React, { useState, useEffect, useRef } from 'react';
import Card from '../card/Card';
import PopupMenu from '../PopupMenu/PopupMenu';
import SharePopup from '../SharePopup/SharePopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import './CommunityPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const COMMUNITY_CARDS_DATA = [
    { id: 101, userId: 2, title: 'Receita de Bolo', userAvatar: 'https://i.pravatar.cc/32?u=user2', text: 'Uma deliciosa receita de bolo de chocolate fofinho para o café da tarde.', dateInfo: '02/09/2025 14:00', liked: true, likes: 128, color: '#ffde9e' },
    { id: 102, userId: 3, title: 'Dicas de Viagem', userAvatar: 'https://i.pravatar.cc/32?u=user3', text: 'Melhores lugares para visitar na Europa durante o verão. Inclui dicas de transporte e hospedagem.', dateInfo: '01/09/2025 18:20', liked: false, likes: 92, color: '#c8e6c9' },
    { id: 103, userId: 4, title: 'Resumo de Livro', userAvatar: 'https://i.pravatar.cc/32?u=user4', text: 'Análise sobre "O Poder do Hábito", com os principais insights do autor.', dateInfo: '31/08/2025 11:45', liked: true, likes: 254, color: '#b3e5fc' },
    { id: 104, userId: 5, title: 'Playlist para Foco', userAvatar: 'https://i.pravatar.cc/32?u=user5', text: 'Uma seleção de músicas instrumentais para ajudar na concentração durante os estudos ou trabalho.', dateInfo: '30/08/2025 09:00', liked: false, likes: 78, color: '#d4a5a5' },
    { id: 105, userId: 2, title: 'Guia de Jardinagem', userAvatar: 'https://i.pravatar.cc/32?u=user2', text: 'Como cuidar de suculentas e outras plantas de interior. Dicas para iniciantes.', dateInfo: '29/08/2025 16:50', liked: true, likes: 150, color: '#c8e6c9' },
];

const COMMUNITY_INTERACTIONS_KEY = 'communityNotesInteractions';

function CommunityPage({ settings }) {
    const [cards, setCards] = useState(() => {
        const savedInteractionsRaw = localStorage.getItem(COMMUNITY_INTERACTIONS_KEY);
        const savedInteractions = savedInteractionsRaw ? JSON.parse(savedInteractionsRaw) : {};
        return COMMUNITY_CARDS_DATA.map(card => savedInteractions[card.id] ? { ...card, ...savedInteractions[card.id] } : card);
    });

    const [displayedCards, setDisplayedCards] = useState(cards);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('Recentes');
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

    const [savedNotesIds, setSavedNotesIds] = useState(new Set());
    const [toggleSaveMessage, setToggleSaveMessage] = useState('');
    const [sharingNote, setSharingNote] = useState(null);
    const [shareSuccessMessage, setShareSuccessMessage] = useState('');

    const hoverTimeoutRef = useRef(null);

    useEffect(() => {
        const savedNotesRaw = localStorage.getItem('notesData');
        if (savedNotesRaw) {
            const savedNotes = JSON.parse(savedNotesRaw);
            const ids = savedNotes.filter(note => note.communityNoteId).map(note => note.communityNoteId);
            setSavedNotesIds(new Set(ids));
        }
    }, []);

    const handleMenuMouseEnter = () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); setIsSortMenuOpen(true); };
    const handleMenuMouseLeave = () => { hoverTimeoutRef.current = setTimeout(() => setIsSortMenuOpen(false), 300); };

    useEffect(() => {
        let filteredCards = [...cards];
        if (sortOption === 'Likes') filteredCards.sort((a, b) => b.likes - a.likes);
        else filteredCards.sort((a, b) => new Date(b.dateInfo.split(' ')[0].split('/').reverse().join('-') + 'T' + b.dateInfo.split(' ')[1]) - new Date(a.dateInfo.split(' ')[0].split('/').reverse().join('-') + 'T' + a.dateInfo.split(' ')[1]));
        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || "";
            filteredCards = filteredCards.filter(card => card.title.toLowerCase().includes(lowercasedQuery) || stripHtml(card.text).toLowerCase().includes(lowercasedQuery));
        }
        setDisplayedCards(filteredCards);
    }, [cards, sortOption, searchQuery]);

    const handleLike = (cardId) => {
        let toggledCard = null;
        const updatedCards = cards.map(card => {
            if (card.id === cardId) {
                toggledCard = { ...card, liked: !card.liked, likes: card.liked ? card.likes - 1 : card.likes + 1 };
                return toggledCard;
            }
            return card;
        });
        setCards(updatedCards);

        const savedInteractionsRaw = localStorage.getItem(COMMUNITY_INTERACTIONS_KEY);
        const savedInteractions = savedInteractionsRaw ? JSON.parse(savedInteractionsRaw) : {};
        savedInteractions[cardId] = { liked: toggledCard.liked, likes: toggledCard.likes };
        localStorage.setItem(COMMUNITY_INTERACTIONS_KEY, JSON.stringify(savedInteractions));
    };

    const handleToggleSaveNote = (noteToToggle) => {
        const savedNotesRaw = localStorage.getItem('notesData');
        let savedNotes = savedNotesRaw ? JSON.parse(savedNotesRaw) : [];
        const isAlreadySaved = savedNotes.some(note => note.communityNoteId === noteToToggle.id);
        let message = '';

        if (isAlreadySaved) {
            savedNotes = savedNotes.filter(note => note.communityNoteId !== noteToToggle.id);
            message = `Nota "${noteToToggle.title}" removida das suas notas.`;
        } else {
            const newNote = {
                ...noteToToggle,
                id: Date.now(),
                communityNoteId: noteToToggle.id,
                userId: 123456,
                userAvatar: settings.avatar || null,
                originalCreatorAvatar: noteToToggle.userAvatar,
                liked: false,
                dateInfo: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
            };
            savedNotes.push(newNote);
            message = `Nota "${noteToToggle.title}" salva nas suas notas!`;
        }

        localStorage.setItem('notesData', JSON.stringify(savedNotes));

        const newIds = new Set(savedNotes.filter(n => n.communityNoteId).map(n => n.communityNoteId));
        setSavedNotesIds(newIds);
        setToggleSaveMessage(message);
    };

    const handleShareSuccess = (message) => { setSharingNote(null); setShareSuccessMessage(message); };
    const handleSortSelect = (option) => { setSortOption(option); setIsSortMenuOpen(false); };

    return (
        <div className="community-page-content">
            <div className="content-header">
                <div className="sort-dropdown-container" onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
                    <div className="sort-dropdown-header">
                        <span>Ordenar por: <strong>{sortOption}</strong></span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    {isSortMenuOpen && (
                        <div className="sort-dropdown-menu">
                            <div className="sort-dropdown-item" onClick={() => handleSortSelect('Recentes')}>Mais Recentes</div>
                            <div className="sort-dropdown-item" onClick={() => handleSortSelect('Likes')}>Mais Curtidos</div>
                        </div>
                    )}
                </div>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Pesquisar na comunidade..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <div className="content-center">
                {displayedCards.map(card => (
                    <Card
                        key={card.id}
                        data={card}
                        pageType="community"
                        onLike={handleLike}
                        onShare={(note) => setSharingNote(note)}
                        onToggleSave={handleToggleSaveNote}
                        isSaved={savedNotesIds.has(card.id)}
                        currentUserAvatar={settings.avatar}
                    />
                ))}
            </div>
            {sharingNote && (<PopupMenu title="Compartilhar Nota" onClose={() => setSharingNote(null)} size="small"><SharePopup note={sharingNote} onClose={() => setSharingNote(null)} onShared={handleShareSuccess} /></PopupMenu>)}
            {shareSuccessMessage && (<PopupMenu title="Sucesso" onClose={() => setShareSuccessMessage('')} size="small"><InfoPopup message={shareSuccessMessage} onClose={() => setShareSuccessMessage('')} /></PopupMenu>)}
            {toggleSaveMessage && (
                <PopupMenu title="Sucesso" onClose={() => setToggleSaveMessage('')} size="small">
                    <InfoPopup message={toggleSaveMessage} onClose={() => setToggleSaveMessage('')} />
                </PopupMenu>
            )}
        </div>
    );
}

export default CommunityPage;