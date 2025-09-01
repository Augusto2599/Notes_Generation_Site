import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faShareAlt, faTrash, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

function Card({ data, onEdit, onDelete, onLike, onShare, currentUserAvatar }) {
    // A propriedade userInitial foi removida, e userAvatar foi adicionada.
    const { title, userAvatar, text, dateInfo, liked, color } = data;

    // A lógica agora verifica se é o usuário atual para usar o avatar das configurações.
    const displayAvatarUrl = data.userId === 123456 ? currentUserAvatar : userAvatar;

    return (
        <div className="card" style={{ backgroundColor: color || '#ffffff' }}>
            <div className="card-header">
                <div className="card-title">{title}</div>
                <div className="user-info">
                    <div className="user-icon">
                        {displayAvatarUrl ? (
                            <img src={displayAvatarUrl} alt="User Avatar" />
                        ) : (
                            // Fallback para a primeira letra do título se não houver imagem
                            title.charAt(0).toUpperCase()
                        )}
                    </div>
                </div>
            </div>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="card-footer">
                <div className="date-info">
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