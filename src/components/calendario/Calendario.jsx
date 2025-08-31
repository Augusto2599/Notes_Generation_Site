import React, { useState } from 'react';
import './Calendario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// O componente agora aceita uma propriedade 'onDateSelect'
function Calendario({ onDateSelect }) {
    const [dataExibida, setDataExibida] = useState(new Date());
    const hoje = new Date();

    const irParaMesAnterior = () => {
        setDataExibida(new Date(dataExibida.getFullYear(), dataExibida.getMonth() - 1, 1));
    };

    const irParaProximoMes = () => {
        setDataExibida(new Date(dataExibida.getFullYear(), dataExibida.getMonth() + 1, 1));
    };

    const gerarDiasDoMes = () => {
        const ano = dataExibida.getFullYear();
        const mes = dataExibida.getMonth();
        const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
        const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();
        const dias = [];

        for (let i = 0; i < primeiroDiaDoMes; i++) {
            dias.push(<div key={`vazio-${i}`} className="dia-vazio"></div>);
        }

        for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
            const ehHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();

            // Função chamada ao clicar em um dia
            const handleDayClick = () => {
                // Se a propriedade onDateSelect foi passada, chame-a com a data completa
                if (onDateSelect) {
                    const dataSelecionada = new Date(ano, mes, dia);
                    onDateSelect(dataSelecionada);
                }
            };

            dias.push(
                <div
                    key={dia}
                    className={`dia ${ehHoje ? 'dia-atual' : ''}`}
                    onClick={handleDayClick} // Adiciona o evento de clique
                >
                    {dia}
                </div>
            );
        }

        return dias;
    };

    const nomeDoMes = dataExibida.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    return (
        <div className="calendario">
            <div className="calendario-header">
                <button onClick={irParaMesAnterior} className="btn-nav"><FontAwesomeIcon icon={faChevronLeft} /></button>
                <div className="mes-ano-titulo">{nomeDoMes}</div>
                <button onClick={irParaProximoMes} className="btn-nav"><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className="dias-semana">
                <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
            </div>
            <div className="calendario-grid">
                {gerarDiasDoMes()}
            </div>
        </div>
    );
}

export default Calendario;