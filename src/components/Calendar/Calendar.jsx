import React, { useState } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Calendar({ onDateSelect }) {
    const [displayedDate, setDisplayedDate] = useState(new Date());
    const today = new Date();

    const goToPreviousMonth = () => {
        setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1));
    };

    const generateMonthDays = () => {
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

            const handleDayClick = () => {
                if (onDateSelect) {
                    const selectedFullDate = new Date(year, month, day);
                    onDateSelect(selectedFullDate);
                }
            };

            days.push(
                <div
                    key={day}
                    className={`calendar-day ${isToday ? 'current-day' : ''}`}
                    onClick={handleDayClick}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const monthName = displayedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={goToPreviousMonth} className="nav-btn"><FontAwesomeIcon icon={faChevronLeft} /></button>
                <div className="month-year-title">{monthName}</div>
                <button onClick={goToNextMonth} className="nav-btn"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className="weekdays">
                <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div className="calendar-grid">
                {generateMonthDays()}
            </div>
        </div>
    );
}

export default Calendar;