import React from 'react';
import Calendario from '../Calendario/Calendario';
import GraficoAtividade from '../GraficoAtividade/GraficoAtividade';
import './BarraLateral.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';

function BarraLateral() {
    return (
        <div className="barra-lateral">
            <div className="topo-direito">
                <FontAwesomeIcon icon={faBell} className="icone-topo" />
                <FontAwesomeIcon icon={faCog} className="icone-topo" />
            </div>

            <div className="perfil-usuario">
                <div className="usuario-grande">U</div>
                <div className="nome-usuario">Usuário Exemplo</div>
                <div className="id-usuario">ID: #123456</div>
            </div>

            <div className="amigos">
                <div className="amigos-titulo">
                    <FontAwesomeIcon icon={faUserFriends} />
                    <span>Amigos</span>
                    <div className="numero-amigos">128</div>
                </div>
            </div>

            {/* Usando os componentes que criamos */}
            <Calendario />
            <GraficoAtividade />
        </div>
    );
}

export default BarraLateral;