import React from 'react';
import { Chart as ChartJS, LineElement, BarElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useNumberFormatter from '../features/useNumberFormatter'; 


ChartJS.register(LineElement, BarElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const HistoricalChart = ({ historicalData, timeframe }) => {
  const { prices, marketCaps, totalVolumes } = historicalData;
  const { formatNumber } = useNumberFormatter(); 

  const labels = prices.map((point) => {
    const date = new Date(point[0]);
    return timeframe === '1'
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); 
  });

  const isDarkMode = document.documentElement.classList.contains('dark');

  const lineColor = isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)';
  const lineBackgroundColor = isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)';
  const barColor1 = isDarkMode ? 'rgba(153, 102, 255, 0.5)' : 'rgba(153, 102, 255, 0.5)';
  const barColor2 = isDarkMode ? 'rgba(255, 99, 132, 0.5)' : 'rgba(255, 99, 132, 0.5)';
  const gridColor = isDarkMode ? '#444' : '#ddd'; 

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Price (USD)',
        data: prices.map((point) => point[1]),
        borderColor: lineColor,
        backgroundColor: lineBackgroundColor,
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Market Cap (USD)',
        data: marketCaps.map((point) => point[1]),
        backgroundColor: barColor1,
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: 'Total Volume (USD)',
        data: totalVolumes.map((point) => point[1]),
        backgroundColor: barColor2,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: isDarkMode ? '#fff' : '#000', 
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
        callbacks: {
          label: function (tooltipItem) {
            const datasetIndex = tooltipItem.datasetIndex;
            let value = tooltipItem.raw;      
            if (datasetIndex === 0) {
              value = formatNumber(value);
              return `Price: $${value}`;
            } else if (datasetIndex === 1) {
              value = formatNumber(value);
              return `Market Cap: $${value}`;
            } else if (datasetIndex === 2) {

              value = formatNumber(value);
              return `Volume: $${value}`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: timeframe === '1' ? 'Time (HH:MM)' : 'Date',
          color: isDarkMode ? '#fff' : '#000',
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Price (USD)',
          color: isDarkMode ? '#fff' : '#000',
        },
        ticks: {
          callback: function (value) {
            return `$${formatNumber(value)}`; 
          },
          color: isDarkMode ? '#fff' : '#000',
        },
        grid: {
          color: gridColor, 
        },
      },
      y1: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Market Cap & Volume (USD)',
          color: isDarkMode ? '#fff' : '#000',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value) {
            return `$${formatNumber(value)}`; 
          },
          color: isDarkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HistoricalChart;
