import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videographers: [],
  videographer: null,
  loading: false,
  error: null,
};

const videographerSlice = createSlice({
  name: 'videographer',
  initialState,
  reducers: {
    getVideographersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getVideographersSuccess: (state, action) => {
      state.loading = false;
      state.videographers = action.payload;
      state.error = null;
    },
    getVideographersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getVideographerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getVideographerSuccess: (state, action) => {
      state.loading = false;
      state.videographer = action.payload;
      state.error = null;
    },
    getVideographerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearVideographer: (state) => {
      state.videographer = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getVideographersRequest,
  getVideographersSuccess,
  getVideographersFail,
  getVideographerRequest,
  getVideographerSuccess,
  getVideographerFail,
  clearVideographer,
  clearError,
} = videographerSlice.actions;

export default videographerSlice.reducer;
