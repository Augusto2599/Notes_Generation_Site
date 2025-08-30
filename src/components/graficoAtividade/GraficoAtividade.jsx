import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './GraficoAtividade.css';

function GraficoAtividade() {
    // useRef cria uma referência que podemos associar a um elemento do DOM
    const chartRef = useRef(null);
    // Usamos outra ref para guardar a instância do gráfico e evitar recriações
    const chartInstance = useRef(null);

    useEffect(() => {
        // Garantimos que a referência ao canvas existe
        if (chartRef.current) {
            // Se já existe uma instância do gráfico, destruímos antes de criar uma nova
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                    datasets: [{
                        label: 'Horas de Uso',
                        data: [1.5, 2.2, 1.8, 2.5, 1.0, 0.5, 3.2],
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value + 'h';
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Função de limpeza: será executada quando o componente for "desmontado"
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

    return (
        <div className="atividade">
            <div className="atividade-titulo">Atividade Semanal</div>
            <div className="tempo-uso">12h 34m</div>
            <div className="grafico-container">
                {/* Associamos a referência ao elemento canvas */}
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default GraficoAtividade;