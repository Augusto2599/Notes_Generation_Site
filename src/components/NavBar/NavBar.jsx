import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImages, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';

// Recebe a função 'setActivePage' como prop
function NavBar({ setActivePage }) {
    return (
        <div className="nav-bar">
            {/* O onClick agora chama a função para mudar a página */}
            <div className="nav-item" onClick={() => setActivePage('home')}>
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span>Home</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faFileAlt} size="lg" />
                <span>Take notes</span>
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faImages} size="lg" />
                <span>Gallery</span>
            </div>
            <div className="nav-item" onClick={() => setActivePage('community')}>
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span>Community</span>
            </div>
        </div>
    );
}

export default NavBar;