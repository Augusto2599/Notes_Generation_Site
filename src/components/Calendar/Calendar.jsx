import React, { useState } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Calendar({ onDateSelect }) {
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const [view, setView] = useState('days'); // 'days', 'months', ou 'years'
    const today = new Date();

    const handlePrev = () => {
        switch (view) {
            case 'days':
                setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1));
                break;
            case 'months':
                setDisplayedDate(new Date(displayedDate.getFullYear() - 1, 0, 1));
                break;
            case 'years':
                setDisplayedDate(new Date(displayedDate.getFullYear() - 10, 0, 1));
                break;
            default:
                break;
        }
    };

    const handleNext = () => {
        switch (view) {
            case 'days':
                setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1));
                break;
            case 'months':
                setDisplayedDate(new Date(displayedDate.getFullYear() + 1, 0, 1));
                break;
            case 'years':
                setDisplayedDate(new Date(displayedDate.getFullYear() + 10, 0, 1));
                break;
            default:
                break;
        }
    };

    const handleTitleClick = () => {
        if (view === 'days') setView('months');
        if (view === 'months') setView('years');
    };

    const getHeaderTitle = () => {
        if (view === 'days') return displayedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        if (view === 'months') return displayedDate.getFullYear();
        if (view === 'years') {
            const startYear = Math.floor(displayedDate.getFullYear() / 10) * 10;
            return `${startYear} - ${startYear + 9}`;
        }
    };

    const renderDays = () => {
        const year = displayedDate.getFullYear();
        const month = displayedDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day"></div>);
        }

        for (let day = 1; day <= lastDayOfMonth; day++) {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            days.push(
                <div key={day} className={`calendar-day ${isToday ? 'current-day' : ''}`} onClick={() => onDateSelect?.(new Date(year, month, day))}>
                    {day}
                </div>
            );
        }
        return <div className="calendar-grid">{days}</div>;
    };

    const renderMonths = () => {
        const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('pt-BR', { month: 'short' }).replace('.', ''));
        return (
            <div className="calendar-grid-large">
                {months.map((month, index) => (
                    <div key={month} className="calendar-cell" onClick={() => {
                        setDisplayedDate(new Date(displayedDate.getFullYear(), index, 1));
                        setView('days');
                    }}>
                        {month}
                    </div>
                ))}
            </div>
        );
    };

    const renderYears = () => {
        const startYear = Math.floor(displayedDate.getFullYear() / 10) * 10;
        const years = Array.from({ length: 10 }, (_, i) => startYear + i);
        return (
            <div className="calendar-grid-large">
                {years.map(year => (
                    <div key={year} className="calendar-cell" onClick={() => {
                        setDisplayedDate(new Date(year, displayedDate.getMonth(), 1));
                        setView('months');
                    }}>
                        {year}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrev} className="nav-btn"><FontAwesomeIcon icon={faChevronLeft} /></button>
                <div className="month-year-title" onClick={handleTitleClick}>{getHeaderTitle()}</div>
                <button onClick={handleNext} className="nav-btn"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            {view === 'days' && (
                <div className="weekdays">
                    <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
                </div>
            )}
            {view === 'days' && renderDays()}
            {view === 'months' && renderMonths()}
            {view === 'years' && renderYears()}
        </div>
    );
}

export default Calendar;