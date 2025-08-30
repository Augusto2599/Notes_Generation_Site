import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faEdit, faHeart, faShareAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

// O componente recebe 'data' como uma propriedade (prop)
function Card({ data }) {
    // Desestruturamos o objeto 'data' para facilitar o uso
    const { titulo, inicialUsuario, texto, dataInfo } = data;

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-titulo">{titulo}</div>
                <div className="usuario-info">
                    <div className="usuario-icone">{inicialUsuario}</div>
                </div>
            </div>
            {/* Usamos dangerouslySetInnerHTML para renderizar o HTML do texto (ex: <br>) */}
            <div className="card-texto" dangerouslySetInnerHTML={{ __html: texto }}></div>
            <div className="card-footer">
                <div className="data-info">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{dataInfo}</span>
                </div>
                <div className="acoes">
                    <button className="acao-btn"><FontAwesomeIcon icon={faEdit} /></button>
                    <button className="acao-btn"><FontAwesomeIcon icon={faHeart} /></button>
                    <button className="acao-btn"><FontAwesomeIcon icon={faShareAlt} /></button>
                    <button className="acao-btn"><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        </div>
    );
}

export default Card;