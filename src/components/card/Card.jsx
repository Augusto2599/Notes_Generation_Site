import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faHeart, faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

function Card({ data }) {
    const { title, userInitial, text, dateInfo } = data;

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title">{title}</div>
                <div className="user-info">
                    <div className="user-icon">{userInitial}</div>
                </div>
            </div>
            <div className="card-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            <div className="card-footer">
                <div className="date-info">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{dateInfo}</span>
                </div>
                <div className="card-actions">
                    <button className="action-btn"><FontAwesomeIcon icon={faEdit} /></button>
                    <button className="action-btn"><FontAwesomeIcon icon={faHeart} /></button>
                    <button className="action-btn"><FontAwesomeIcon icon={faShareAlt} /></button>
                    <button className="action-btn"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        </div>
    );
}

export default Card;