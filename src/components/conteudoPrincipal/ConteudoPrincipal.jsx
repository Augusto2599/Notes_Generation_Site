import React from 'react';
import Card from '../Card/Card'; // Importa o componente Card
import './ConteudoPrincipal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faSearch } from '@fortawesome/free-solid-svg-icons';

// Dados que seriam buscados de uma API ou banco de dados
const DADOS_DOS_CARDS = [
    {
        id: 1,
        titulo: 'Ideias para Projeto',
        inicialUsuario: 'J',
        texto: 'Desenvolver um sistema de notas com funcionalidades de compartilhamento e colaboração em tempo real.',
        dataInfo: '15/08/2023 10:30',
    },
    {
        id: 2,
        titulo: 'Lista de Tarefas',
        inicialUsuario: 'M',
        texto: '- Finalizar relatório<br>- Reunião com equipe às 14h<br>- Revisar documentação',
        dataInfo: '14/08/2023 16:45',
    },
    {
        id: 3,
        titulo: 'Reunião Importante',
        inicialUsuario: 'A',
        texto: 'Discutir as novas funcionalidades do sistema e definir prazos para a próxima sprint de desenvolvimento.',
        dataInfo: '13/08/2023 09:15',
    },
];

function ConteudoPrincipal() {
    return (
        <div className="conteudo-principal">
            <div className="body-topo">
                <div className="filtros">
                    <button className="filtro-btn">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Curtidas</span>
                    </button>
                    <button className="filtro-btn">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Data</span>
                    </button>
                </div>
                <div className="barra-pesquisa">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Pesquisar notas..." />
                </div>
            </div>

            <div className="body-center">
                {/* Usamos o método .map() para criar um componente Card para cada item nos dados */}
                {DADOS_DOS_CARDS.map(card => (
                    <Card key={card.id} data={card} />
                ))}
            </div>
        </div>
    );
}

export default ConteudoPrincipal;