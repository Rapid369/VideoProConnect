import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import videographerReducer from './slices/videographerSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    videographer: videographerReducer,
    booking: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
