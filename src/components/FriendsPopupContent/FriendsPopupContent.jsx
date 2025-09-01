import React from 'react';
import './FriendsPopupContent.css';

// Dados de exemplo para a lista de amigos
const friendsList = [
    {
        id: 1,
        name: 'Carlos Silva',
        avatarUrl: 'https://i.pravatar.cc/40?u=friend1',
        status: 'online',
        activity: 'Online há 2 horas'
    },
    {
        id: 2,
        name: 'Beatriz Costa',
        avatarUrl: 'https://i.pravatar.cc/40?u=friend2',
        status: 'away',
        activity: 'Ausente há 15 minutos'
    },
    {
        id: 3,
        name: 'Lucas Souza',
        avatarUrl: 'https://i.pravatar.cc/40?u=friend3',
        status: 'offline',
        activity: 'Visto por último ontem'
    },
    {
        id: 4,
        name: 'Mariana Oliveira',
        avatarUrl: 'https://i.pravatar.cc/40?u=friend4',
        status: 'online',
        activity: 'Online há 5 horas'
    },
    {
        id: 5,
        name: 'Fernanda Lima',
        avatarUrl: 'https://i.pravatar.cc/40?u=friend5',
        status: 'offline',
        activity: 'Visto por último há 3 dias'
    },
];

// Componente para um item individual da lista de amigos
function FriendItem({ friend }) {
    // Define a classe CSS com base no status do amigo
    const statusClass = `status-${friend.status}`;

    return (
        <div className="friend-item">
            <div className="friend-info">
                <img src={friend.avatarUrl} alt={friend.name} className="friend-list-avatar" />
                <span className="friend-name">{friend.name}</span>
            </div>
            <div className="friend-activity">
                <span>{friend.activity}</span>
            </div>
            <div className="friend-status">
                <span className={`status-indicator ${statusClass}`}></span>
                <span className="status-text">{friend.status}</span>
            </div>
        </div>
    );
}


function FriendsPopupContent() {
    return (
        <div className="friends-popup-container">
            <div className="friends-list">
                {friendsList.map(friend => (
                    <FriendItem key={friend.id} friend={friend} />
                ))}
            </div>
        </div>
    );
}

export default FriendsPopupContent;