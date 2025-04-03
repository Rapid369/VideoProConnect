import {
  getVideographersRequest,
  getVideographersSuccess,
  getVideographersFail,
  getVideographerRequest,
  getVideographerSuccess,
  getVideographerFail
} from '../slices/videographerSlice';
import * as api from '../../utils/api';

// Get all videographers
export const getVideographers = (params) => async (dispatch) => {
  try {
    dispatch(getVideographersRequest());
    
    const data = await api.getVideographers(params);
    
    dispatch(getVideographersSuccess(data.data));
  } catch (error) {
    dispatch(
      getVideographersFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Get videographer by ID
export const getVideographerById = (id) => async (dispatch) => {
  try {
    dispatch(getVideographerRequest());
    
    const data = await api.getVideographerById(id);
    
    dispatch(getVideographerSuccess(data.data));
  } catch (error) {
    dispatch(
      getVideographerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Create videographer profile
export const createVideographerProfile = (profileData) => async (dispatch) => {
  try {
    dispatch(getVideographerRequest());
    
    const data = await api.createVideographerProfile(profileData);
    
    dispatch(getVideographerSuccess(data.data));
  } catch (error) {
    dispatch(
      getVideographerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Update videographer profile
export const updateVideographerProfile = (id, profileData) => async (dispatch) => {
  try {
    dispatch(getVideographerRequest());
    
    const data = await api.updateVideographerProfile(id, profileData);
    
    dispatch(getVideographerSuccess(data.data));
  } catch (error) {
    dispatch(
      getVideographerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
