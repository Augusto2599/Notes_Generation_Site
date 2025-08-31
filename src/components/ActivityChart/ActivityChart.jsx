import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './ActivityChart.css';

function ActivityChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Hours of Use',
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

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="activity-section">
            <div className="activity-title">Weekly Activity</div>
            <div className="usage-time">12h 34m</div>
            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default ActivityChart;