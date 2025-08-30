import React, { useState, useEffect } from 'react';
import './Calendario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function Calendario() {
    // 'useState' cria um estado para armazenar as informações da data
    const [data, setData] = useState({
        completa: '',
        dia: '',
        mesAno: '',
    });

    // 'useEffect' executa o código depois que o componente é renderizado.
    // O array vazio [] no final faz com que ele rode apenas uma vez.
    useEffect(() => {
        const dataAtual = new Date();

        const completa = dataAtual.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
        const dia = dataAtual.getDate();
        const mesAno = dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

        setData({ completa, dia, mesAno });
    }, []);

    return (
        <div className="calendario">
            <div className="calendario-titulo">
                <FontAwesomeIcon icon={faCalendar} />
                <span>Calendário</span>
            </div>
            <div className="data-atual">{data.completa}</div>
            <div className="dia-atual">{data.dia}</div>
            <div className="mes-ano">{data.mesAno}</div>
        </div>
    );
}

export default Calendario;