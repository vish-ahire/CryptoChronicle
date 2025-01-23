import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const HistoricalTable = ({ historicalData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the historical 
  const filteredData = historicalData.filter((entry) =>
    entry.date.includes(searchTerm)
  );

  
  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    {
      field: 'price',
      headerName: 'Price (USD)',
      flex: 1,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toLocaleString()}` : '-',
    },
    {
      field: 'volume',
      headerName: 'Volume (USD)',
      flex: 1,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toLocaleString()}` : '-',
    },
    {
      field: 'marketCap',
      headerName: 'Market Cap (USD)',
      flex: 1,
      valueFormatter: (params) =>
        params.value ? `$${params.value.toLocaleString()}` : '-',
    },
  ];

  // row data 
  const rows = filteredData.map((entry, index) => ({
    id: index,
    date: entry.date,
    price: entry.price,
    volume: entry.volume,
    marketCap: entry.marketCap,
  }));

  const isDarkMode = document.documentElement.classList.contains('dark');
  const containerStyles = isDarkMode
    ? 'p-4 dark:bg-gray-900 dark:text-white'
    : 'p-4 bg-white text-black';

  const inputStyles = isDarkMode
    ? 'border rounded px-2 py-1 dark:bg-gray-700 dark:text-white'
    : 'border rounded px-2 py-1';

  return (
    <div className={containerStyles}>
      <h3 className="text-xl font-bold mb-4">Historical Data Table</h3>
      <div className="mb-4">
        <label htmlFor="search" className="mr-2">
          Search by Date:
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="YYYY-MM-DD"
          className={inputStyles}
        />
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default HistoricalTable;
