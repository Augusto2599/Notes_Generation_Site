import React, { useState } from 'react';
import './Calendario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Calendario() {
    // Estado para controlar o mês e ano que estão sendo exibidos
    const [dataExibida, setDataExibida] = useState(new Date());

    const hoje = new Date();

    // Funções para navegar para o mês anterior e o próximo
    const irParaMesAnterior = () => {
        setDataExibida(new Date(dataExibida.getFullYear(), dataExibida.getMonth() - 1, 1));
    };

    const irParaProximoMes = () => {
        setDataExibida(new Date(dataExibida.getFullYear(), dataExibida.getMonth() + 1, 1));
    };

    // Lógica para gerar os dias do calendário
    const gerarDiasDoMes = () => {
        const ano = dataExibida.getFullYear();
        const mes = dataExibida.getMonth();

        const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
        const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();

        const dias = [];

        // Adiciona células vazias para os dias antes do início do mês
        for (let i = 0; i < primeiroDiaDoMes; i++) {
            dias.push(<div key={`vazio-${i}`} className="dia-vazio"></div>);
        }

        // Adiciona os dias do mês
        for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
            const ehHoje = dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();
            dias.push(
                <div key={dia} className={`dia ${ehHoje ? 'dia-atual' : ''}`}>
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