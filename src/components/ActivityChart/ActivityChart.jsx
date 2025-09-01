import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './ActivityChart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const chartData = {
    Weekly: {
        labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        data: [5, 6.5, 3, 8.5, 5.5, 1.5, 5],
        increase: '+3%',
        increaseText: 'Increase than last week'
    },
    Monthly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [25, 30, 22, 35],
        increase: '+5%',
        increaseText: 'Increase than last month'
    },
    Yearly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [120, 150, 180, 160, 200, 190],
        increase: '+12%',
        increaseText: 'Increase than last year'
    },
};

function ActivityChart() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [timeFrame, setTimeFrame] = useState('Weekly');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTimeFrameSelect = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
        setIsMenuOpen(false); // Fecha o menu após a seleção
    };

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            const selectedData = chartData[timeFrame];
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: selectedData.labels,
                    datasets: [{
                        label: 'Hours Activity',
                        data: selectedData.data,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: '#3498db',
                        borderWidth: 2,
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#3498db',
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        tension: 0.4,
                        fill: true,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) => value + 'h',
                                stepSize: timeFrame === 'Yearly' ? 50 : (timeFrame === 'Monthly' ? 5 : 2),
                            },
                            grid: { drawBorder: false, color: '#f0f0f0' }
                        },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            backgroundColor: '#2c3e50',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderRadius: 6,
                            displayColors: false,
                            callbacks: {
                                title: () => '',
                                label: (context) => `${context.raw}h on ${context.label}`
                            }
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
    }, [timeFrame]);

    const currentDisplayData = chartData[timeFrame];

    return (
        <div className="activity-section">
            <div className="activity-header">
                <div className="activity-title-section">
                    <div className="activity-title">Hours Activity</div>
                    <div className="activity-stats">
                        {currentDisplayData.increase} {currentDisplayData.increaseText}
                    </div>
                </div>
                <div
                    className="dropdown-container"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                >
                    <div className="weekly-dropdown">
                        <span>{timeFrame}</span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => handleTimeFrameSelect('Weekly')}>Weekly</div>
                            <div className="dropdown-item" onClick={() => handleTimeFrameSelect('Monthly')}>Monthly</div>
                            <div className="dropdown-item" onClick={() => handleTimeFrameSelect('Yearly')}>Yearly</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="chart-container">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
}

export default ActivityChart;