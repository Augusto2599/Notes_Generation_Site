import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImages, faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    return (
        <div className="nav-bar">
            <div className="nav-item">
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
            <div className="nav-item">
                <FontAwesomeIcon icon={faUsers} size="lg" />
                <span>Community</span>
            </div>
        </div>
    );
}

export default NavBar;