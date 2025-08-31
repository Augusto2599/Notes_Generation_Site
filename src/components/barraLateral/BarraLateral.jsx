import React from 'react';
import Calendario from '../calendario/Calendario';
import GraficoAtividade from '../GraficoAtividade/GraficoAtividade';
import './BarraLateral.css';
// AQUI ESTÁ A CORREÇÃO: troquei '@fortawesome/fontawesome-svg-core' por '@fortawesome/react-fontawesome'
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
                    <div className="amigos-label">
                        <FontAwesomeIcon icon={faUserFriends} />
                        <span>Amigos</span>
                    </div>
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