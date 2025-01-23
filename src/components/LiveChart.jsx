import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LiveChart = () => {
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto); 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price (USD)',
        data: [],
        borderColor: 'rgba(0, 181, 26, 1)', 
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        tension: 0.4,
        fill: true,
      },
    ],
  });
  const chartRef = useRef();

  useEffect(() => {
    if (!selectedCrypto) return;

    const wsUrl = `wss://ws.coincap.io/prices?assets=${selectedCrypto}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected to CoinCap');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const price = parseFloat(data[selectedCrypto]); 
      const time = new Date().toLocaleTimeString(); 

      if (price) {
        setChartData((prevData) => {
          const updatedLabels = [...prevData.labels, time];
          const updatedPrices = [...prevData.datasets[0].data, price];

          if (updatedLabels.length > 50) {
            updatedLabels.shift();
            updatedPrices.shift();
          }

          return {
            labels: updatedLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: updatedPrices,
              },
            ],
          };
        });
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.warn('WebSocket closed:', event.reason);
    };

    return () => {
      ws.close();
    };
  }, [selectedCrypto]);


  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className={`p-4 ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl text-center font-bold">{selectedCrypto?.toUpperCase()} Live Chart</h2>
      <div className="w-full max-w-2xl mx-auto">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: isDarkMode ? 'white' : 'black', 
                },
                display: true,
              },
              tooltip: {
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)', 
                titleColor: isDarkMode ? 'white' : 'black',
                bodyColor: isDarkMode ? 'white' : 'black', 
              },
            },
            scales: {
              x: {
                ticks: {
                  color: isDarkMode ? 'white' : 'black', 
                },
                // grid: {
                //   color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', 
                // },
              },
              y: {
                ticks: {
                  color: isDarkMode ? 'white' : 'black', // Y-axis ticks color
                },
                // grid: {
                //   color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                // },
              },
            },
          }}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default LiveChart;
