import {
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
  updateBookingFail
} from '../slices/bookingSlice';
import * as api from '../../utils/api';

// Create booking
export const createBooking = (bookingData) => async (dispatch) => {
  try {
    dispatch(createBookingRequest());
    
    const data = await api.createBooking(bookingData);
    
    dispatch(createBookingSuccess(data.data));
  } catch (error) {
    dispatch(
      createBookingFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Get all bookings
export const getBookings = () => async (dispatch) => {
  try {
    dispatch(getBookingsRequest());
    
    const data = await api.getBookings();
    
    dispatch(getBookingsSuccess(data.data));
  } catch (error) {
    dispatch(
      getBookingsFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Get booking by ID
export const getBookingById = (id) => async (dispatch) => {
  try {
    dispatch(getBookingRequest());
    
    const data = await api.getBookingById(id);
    
    dispatch(getBookingSuccess(data.data));
  } catch (error) {
    dispatch(
      getBookingFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Update booking
export const updateBooking = (id, bookingData) => async (dispatch) => {
  try {
    dispatch(updateBookingRequest());
    
    const data = await api.updateBooking(id, bookingData);
    
    dispatch(updateBookingSuccess(data.data));
  } catch (error) {
    dispatch(
      updateBookingFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
