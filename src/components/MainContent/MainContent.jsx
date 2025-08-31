import React, { useState } from 'react';
import Card from '../card/Card';
import Calendar from '../Calendar/Calendar';
import './MainContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faSearch, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

const CARDS_DATA = [
    {
        id: 1,
        title: 'Ideias para Projeto',
        userInitial: 'J',
        text: 'Desenvolver um sistema de notas com funcionalidades de compartilhamento e colaboração em tempo real.',
        dateInfo: '15/08/2023 10:30',
    },
    {
        id: 2,
        title: 'Lista de Tarefas',
        userInitial: 'M',
        text: '- Finalizar relatório<br>- Reunião com equipe às 14h<br>- Revisar documentação',
        dateInfo: '14/08/2023 16:45',
    },
    {
        id: 3,
        title: 'Reunião Importante',
        userInitial: 'A',
        text: 'Discutir as novas funcionalidades do sistema e definir prazos para a próxima sprint de desenvolvimento.',
        dateInfo: '13/08/2023 09:15',
    },
];

function MainContent() {
    const [displayedCards, setDisplayedCards] = useState(CARDS_DATA);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

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
        const filteredCards = CARDS_DATA.filter(card => {
            const cardDate = card.dateInfo.split(' ')[0];
            return cardDate === dateToFilter;
        });
        setDisplayedCards(filteredCards);
    };

    const clearDateFilter = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
        setDisplayedCards(CARDS_DATA);
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
                {displayedCards.map(card => (
                    <Card key={card.id} data={card} />
                ))}
            </div>
        </div>
    );
}

export default MainContent;