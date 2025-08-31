import React, { useState } from 'react';
import Card from '../Card/Card';
import Calendario from '../calendario/Calendario';
import './ConteudoPrincipal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 1. Importei o ícone 'faTimes' para o botão de limpar
import { faHeart, faCalendar, faSearch, faUser, faTimes } from '@fortawesome/free-solid-svg-icons';

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
    const [cardsExibidos, setCardsExibidos] = useState(DADOS_DOS_CARDS);
    const [showCalendar, setShowCalendar] = useState(false);
    const [dataSelecionada, setDataSelecionada] = useState(null);

    const formatDate = (date) => {
        if (!date) return 'Data';
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const handleDateSelect = (date) => {
        setDataSelecionada(date);
        setShowCalendar(false);

        const dataParaFiltrar = formatDate(date);
        const cardsFiltrados = DADOS_DOS_CARDS.filter(card => {
            const dataDoCard = card.dataInfo.split(' ')[0];
            return dataDoCard === dataParaFiltrar;
        });
        setCardsExibidos(cardsFiltrados);
    };

    // 2. Nova função para limpar o filtro de data
    const clearDateFilter = (e) => {
        e.stopPropagation(); // Impede que o hover do calendário seja ativado ao clicar no "X"
        setDataSelecionada(null);
        setCardsExibidos(DADOS_DOS_CARDS); // Mostra todos os cards novamente
    };

    return (
        <div className="conteudo-principal">
            <div className="body-topo">
                <div className="filtros">
                    <button className="filtro-btn">
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Curtidas</span>
                    </button>

                    <div
                        className="filtro-container"
                        onMouseEnter={() => setShowCalendar(true)}
                        onMouseLeave={() => setShowCalendar(false)}
                    >
                        {/* 3. O botão agora tem uma classe condicional para quando uma data é selecionada */}
                        <button className={`filtro-btn ${dataSelecionada ? 'filtro-ativo' : ''}`}>
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>{formatDate(dataSelecionada)}</span>
                            {/* 4. O ícone de limpar só aparece se uma data estiver selecionada */}
                            {dataSelecionada && (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="limpar-filtro-icone"
                                    onClick={clearDateFilter}
                                />
                            )}
                        </button>
                        {showCalendar && (
                            <div className="calendario-popup">
                                <Calendario onDateSelect={handleDateSelect} />
                            </div>
                        )}
                    </div>

                    <button className="filtro-btn">
                        <FontAwesomeIcon icon={faUser} />
                        <span>Nota</span>
                    </button>
                </div>
                <div className="barra-pesquisa">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder="Pesquisar notas..." />
                </div>
            </div>

            <div className="body-center">
                {cardsExibidos.map(card => (
                    <Card key={card.id} data={card} />
                ))}
            </div>
        </div>
    );
}

export default ConteudoPrincipal;