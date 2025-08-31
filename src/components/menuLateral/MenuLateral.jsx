import './MenuLateral.css'; // Importa o CSS específico

// Para usar os ícones, instale o Font Awesome:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Adicionado o ícone faFileAlt para o novo item de menu
import { faHome, faImages, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';

function MenuLateral() {
    return (
        <div className="menu-lateral">
            <div className="menu-item">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span>Home</span>
            </div>
            {/* Novo item de menu "Workbench" adicionado */}
            <div className="menu-item">
                <FontAwesomeIcon icon={faFileAlt} size="lg" />
                <span>Take notes</span>
            </div>
            <div className="menu-item">
                <FontAwesomeIcon icon={faImages} size="lg" />
                <span>Gallery</span>
            </div>
            <div className="menu-item">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span>Community</span>
            </div>
        </div>
    );
}

export default MenuLateral;