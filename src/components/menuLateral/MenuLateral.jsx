import './MenuLateral.css'; // Importa o CSS específico

// Para usar os ícones, instale o Font Awesome:
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImages, faUsers } from '@fortawesome/free-solid-svg-icons';

function MenuLateral() {
    return (
        <div className="menu-lateral">
            <div className="menu-item">
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span>Home</span>
            </div>
            <div className="menu-item">
                <FontAwesomeIcon icon={faImages} size="lg" />
                <span>Galeria</span>
            </div>
            <div className="menu-item">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span>Comunidade</span>
            </div>
        </div>
    );
}

export default MenuLateral;