import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedCrypto } from '../redux/cryptoSlice';
import axios from 'axios';

const Header = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      setError(null);
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets');
        setCryptos(response.data.data);
      } catch (err) {
        setError('Failed to fetch cryptocurrencies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const handleChange = (e) => {
    dispatch(setSelectedCrypto(e.target.value));
  };

  if (loading) {
    return null; // Avoid rendering until data is loaded
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-900 dark:text-white fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">CryptoChronicle</h1>
        <h1 className="text-slate-400 text-xs italic">
          Tracking the historical and current narrative of cryptocurrencies
        </h1>
      </div>

      {/* Select Dropdown */}
      <div className="flex items-center space-x-4">
        <select
          value={selectedCrypto}
          onChange={handleChange}
          className="mr-4 p-2 rounded bg-gray-700 border border-gray-600 w-full max-w-[200px] sm:max-w-[150px] md:max-w-none"

        >
          {cryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol})
            </option>
          ))}
        </select>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/overview" className="hover:underline">
            Overview
          </Link>
          <Link to="/history" className="hover:underline">
            History
          </Link>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col space-y-4 p-4 shadow-lg">
          <Link
            to="/dashboard"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/overview"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Overview
          </Link>
          <Link
            to="/history"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            History
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
