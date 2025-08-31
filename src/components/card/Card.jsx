import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faShareAlt, faTrash, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

function Card({ data, onEdit, onDelete, onLike, onShare, currentUserAvatar }) {
    const { title, userInitial, text, dateInfo, liked, color } = data;

    // Determine se deve usar o avatar do usuário logado ou a inicial
    const displayAvatar = data.userId === 123456 && currentUserAvatar; // 123456 é o ID do nosso usuário de exemplo

    return (
        <div className="card" style={{ backgroundColor: color || '#ffffff' }}>
            <div className="card-header">
                <div className="card-title">{title}</div>
                <div className="user-info">
                    <div className="user-icon">
                        {displayAvatar ? (
                            <img src={currentUserAvatar} alt="User Avatar" />
                        ) : (
                            userInitial
                        )}
                    </div>
                </div>
            </div>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="card-footer">
                <div className="date-info">
                    {/* Ícone de relógio agora sempre presente */}
                    <FontAwesomeIcon icon={faClock} />
                    <span>{dateInfo}</span>
                </div>
                <div className="card-actions">
                    <button className="action-btn" onClick={() => onEdit(data)}><FontAwesomeIcon icon={faEdit} /></button>
                    <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={() => onLike(data.id)}>
                        <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
                    </button>
                    <button className="action-btn" onClick={() => onShare(data)}><FontAwesomeIcon icon={faShareAlt} /></button>
                    <button className="action-btn" onClick={() => onDelete(data.id)}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        </div>
    );
}

export default Card;