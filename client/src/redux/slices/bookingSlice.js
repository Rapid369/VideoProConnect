import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  booking: null,
  loading: false,
  error: null,
  success: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    createBookingRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createBookingSuccess: (state, action) => {
      state.loading = false;
      state.booking = action.payload;
      state.success = true;
      state.error = null;
    },
    createBookingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getBookingsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBookingsSuccess: (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
      state.error = null;
    },
    getBookingsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBookingRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBookingSuccess: (state, action) => {
      state.loading = false;
      state.booking = action.payload;
      state.error = null;
    },
    getBookingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookingRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    updateBookingSuccess: (state, action) => {
      state.loading = false;
      state.booking = action.payload;
      state.success = true;
      state.error = null;
    },
    updateBookingFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearBooking: (state) => {
      state.booking = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createBookingRequest,
  createBookingSuccess,
  createBookingFail,
  getBookingsRequest,
  getBookingsSuccess,
  getBookingsFail,
  getBookingRequest,
  getBookingSuccess,
  getBookingFail,
  updateBookingRequest,
  updateBookingSuccess,
  updateBookingFail,
  clearBooking,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
