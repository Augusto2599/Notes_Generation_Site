import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart as faHeartRegular, faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faShareAlt, faTrash, faHeart as faHeartSolid, faUserFriends, faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

function Card({ data, onEdit, onDelete, onLike, onShare, onToggleSave, isSaved, currentUserAvatar, pageType = 'home' }) {
    const { title, userId, userAvatar, originalCreatorAvatar, text, dateInfo, liked, likes, color } = data;

    const displayAvatarUrl = userId === 123456 ? currentUserAvatar : userAvatar;

    return (
        <div className="card" style={{ backgroundColor: color || '#ffffff' }}>
            <div className="card-header">
                <div className="card-title">{title}</div>
                <div className="user-info">
                    {originalCreatorAvatar ? (
                        <div className="stacked-avatars">
                            {/* Avatar do criador original - fica à frente */}
                            <div className="user-icon creator-avatar">
                                <img src={originalCreatorAvatar} alt="Criador Original" />
                            </div>
                            {/* Avatar do usuário que salvou - fica atrás */}
                            <div className="user-icon saved-by-avatar">
                                {displayAvatarUrl ? <img src={displayAvatarUrl} alt="Usuário" /> : title.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <div className="user-icon">
                            {displayAvatarUrl ? <img src={displayAvatarUrl} alt="User Avatar" /> : title.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
            </div>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="card-footer">
                <div className="date-info">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{dateInfo}</span>
                </div>
                <div className="card-actions">
                    {pageType === 'home' ? (
                        <>
                            <button className="action-btn" onClick={() => onEdit(data)}><FontAwesomeIcon icon={faEdit} /></button>
                            <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={() => onLike(data.id)}>
                                <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                            </button>
                            <button className="action-btn" onClick={() => onShare(data)}><FontAwesomeIcon icon={faShareAlt} /></button>
                            <button className="action-btn" onClick={() => onDelete(data.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`action-btn ${isSaved ? 'saved' : ''}`}
                                title={isSaved ? "Remover das minhas notas" : "Salvar nas minhas notas"}
                                onClick={() => onToggleSave(data)}
                            >
                                <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmarkRegular} />
                            </button>
                            <div className="like-container">
                                <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={() => onLike(data.id)}>
                                    <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                                </button>
                                <span className="like-count">{likes}</span>
                            </div>
                            <button className="action-btn" onClick={() => onShare(data)}>
                                <FontAwesomeIcon icon={faUserFriends} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;