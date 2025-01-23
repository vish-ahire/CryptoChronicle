import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHistoricalData } from '../api/cryptoApi';
import { setHistoricalData } from '../redux/cryptoSlice';
import HistoricalChart from './HistoricalChart';
import Loading from './Loading';
import { DataGrid } from '@mui/x-data-grid';

const timeframes = [
  { label: '1 Day', value: '1' },
  { label: '7 Days', value: '7' },
  { label: '30 Days', value: '30' },
  { label: '90 Days', value: '90' },
];

const History = () => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);
  const historicalData = useSelector((state) => state.crypto.historicalData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7');
  const [tableData, setTableData] = useState([]);

  const fetchData = async (days) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchHistoricalData(selectedCrypto, days);
      dispatch(setHistoricalData(data));
    } catch (err) {
      setError('Failed to fetch historical data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCrypto) fetchData(selectedTimeframe);
  }, [selectedCrypto, selectedTimeframe]);

  useEffect(() => {
    if (historicalData.prices) {
      const processedData = historicalData.prices.map((entry, index) => ({
        id: index,
        date: new Date(entry[0]).toLocaleDateString(),
        time: new Date(entry[0]).toLocaleTimeString(),
        price: entry[1],
      }));
      setTableData(processedData);
    }
  }, [historicalData]);

  const handleRetry = () => {
    fetchData(selectedTimeframe);
  };

  const handleTimeframeChange = (event) => {
    setSelectedTimeframe(event.target.value);
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 150 },
    { field: 'price', headerName: 'Price (USD)', width: 150, type: 'number' },
  ];

  const tableStyles = {
    root: 'bg-white dark:bg-gray-800',
    columnHeader: 'bg-gray-200 dark:bg-gray-700 dark:text-white',
    cell: 'text-black dark:text-white',
  };

  if (loading) {
    return <Loading message="Loading..." />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-white dark:bg-gray-900 dark:text-red-400">
        <p>{error}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-700"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white text-black dark:bg-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4">
        {selectedCrypto} Historical Data
      </h2>
      <div className="mb-4">
        <label htmlFor="timeframe" className="mr-2">
          Timeframe:
        </label>
        <select
          id="timeframe"
          value={selectedTimeframe}
          onChange={handleTimeframeChange}
          className="border rounded px-2 py-1 bg-white text-black dark:bg-gray-700 dark:text-white"
        >
          {timeframes.map((timeframe) => (
            <option key={timeframe.value} value={timeframe.value}>
              {timeframe.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      <HistoricalChart historicalData={historicalData} timeframe={selectedTimeframe} />

      {/* Table Section */}
      <div
        style={{ height: 400, width: '100%', marginTop: '1.5rem' }}
        className="dark:bg-gray-800"
      >
        <h3 className="text-lg font-bold mb-2">Historical Data Table</h3>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          className={tableStyles.root}
          classes={{
            columnHeader: tableStyles.columnHeader,
            cell: tableStyles.cell,
          }}
        />
      </div>
    </div>
  );
};

export default History;
