import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Loading,LiveChart,useNumberFormatter} from '../index'

const Dashboard = () => {
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { formatNumber } = useNumberFormatter();
  const [ws, setWs] = useState(null);


  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.coincap.io/v2/assets/${selectedCrypto}`);
      const data = await response.json();
      setCryptoData(data.data);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleWebSocketMessage = (message) => {
    const data = JSON.parse(message.data);
    if (data?.data?.priceUsd) {
      setCryptoData((prevData) => ({
        ...prevData,
        priceUsd: data.data.priceUsd,
        volumeUsd24Hr: data.data.volumeUsd24Hr,
        marketCapUsd: data.data.marketCapUsd,
        changePercent24Hr: data.data.changePercent24Hr,
      }));
    }
  };

  useEffect(() => {
    if (selectedCrypto) {
      fetchCryptoData();

      const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${selectedCrypto}`);
      setWs(socket);

      socket.onopen = () => console.log('WebSocket connected');
      socket.onmessage = handleWebSocketMessage;
      socket.onerror = (error) => console.error('WebSocket Error:', error);
      socket.onclose = () => console.log('WebSocket disconnected');
      return () => {
        socket.close();
        setWs(null);
      };
    }
  }, [selectedCrypto]);

  if (loading) return <Loading/>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl text-center font-bold">{cryptoData.name} </h2>

      <div className="flex flex-wrap justify-center mt-4">
        {/* Price Box */}
        <div className="bg-white shadow-lg dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_0px_#00bcd4] rounded-lg p-4 m-2 w-1/2 md:w-1/4">
          <h3 className="text-lg font-semibold">Price</h3>
          <p className="text-2xl font-bold">
            ${cryptoData.priceUsd && formatNumber(cryptoData.priceUsd)}
          </p>
        </div>

        {/* Profit/Loss Box */}
        <div className="bg-white shadow-lg dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_0px_#00bcd4] rounded-lg p-4 m-2 w-1/2 md:w-1/4">
          <h3 className="text-lg font-semibold">Profit/Loss</h3>
          {cryptoData.changePercent24Hr !== undefined && (
            <p
              className={`text-lg ${formatNumber(cryptoData.changePercent24Hr) < 0
                  ? 'text-red-500'
                  : 'text-green-500'
                }`}
            >
              {formatNumber(cryptoData.changePercent24Hr) > 0
                ? `▲${formatNumber(cryptoData.changePercent24Hr)}%`
                : `▼ ${formatNumber(cryptoData.changePercent24Hr)}%`}
            </p>
          )}
        </div>

        {/* Volume Box */}
        <div className="bg-white shadow-lg dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_0px_#00bcd4] rounded-lg p-4 m-2 w-1/2 md:w-1/4">
          <h3 className="text-lg font-semibold">Volume</h3>
          <p>{cryptoData.volumeUsd24Hr && formatNumber(cryptoData.volumeUsd24Hr)}</p>
        </div>

        {/* Market Cap Box */}
        <div className="bg-white shadow-lg dark:bg-gray-800 dark:text-white dark:shadow-[0_4px_6px_0px_#00bcd4] rounded-lg p-4 m-2 w-1/2 md:w-1/4">
          <h3 className="text-lg font-semibold">Market Cap</h3>
          <p>${cryptoData.marketCapUsd && formatNumber(cryptoData.marketCapUsd)}</p>
        </div>
      </div>

      <LiveChart />
    </div>
  );
};

export default Dashboard;
