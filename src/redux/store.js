import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice'; 

const store = configureStore({
  reducer: {
    crypto: cryptoReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;