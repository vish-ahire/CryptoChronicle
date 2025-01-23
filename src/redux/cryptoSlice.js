import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCrypto: 'bitcoin', 
  priceData: {}, 
  historicalData: [], 
  overviewData: {}, 
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setPriceData: (state, action) => {
      state.priceData = action.payload;
    },
    setHistoricalData: (state, action) => {
      state.historicalData = action.payload;
    },
    setOverviewData: (state, action) => {
      state.overviewData = action.payload;
    },
  },
});


export const { setSelectedCrypto, setPriceData, setHistoricalData, setOverviewData } = cryptoSlice.actions;
export default cryptoSlice.reducer;