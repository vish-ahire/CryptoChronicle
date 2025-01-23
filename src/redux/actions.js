export const setSelectedCrypto = (crypto) => ({
    type: 'SET_SELECTED_CRYPTO',
    payload: crypto,
  });
  
  export const setPriceData = (data) => ({
    type: 'SET_PRICE_DATA',
    payload: data,
  });
  
  export const setHistoricalData = (data) => ({
    type: 'SET_HISTORICAL_DATA',
    payload: data,
  });
  
  export const setOverviewData = (data) => ({
    type: 'SET_OVERVIEW_DATA',
    payload: data,
  });