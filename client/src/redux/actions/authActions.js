import { 
  loginRequest, 
  loginSuccess, 
  loginFail, 
  logout as logoutAction,
  registerRequest,
  registerSuccess,
  registerFail
} from '../slices/authSlice';
import * as api from '../../utils/api';

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    
    const data = await api.login(email, password);
    
    dispatch(loginSuccess(data.user));
    
    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    
    const data = await api.register(userData);
    
    dispatch(registerSuccess(data.user));
    
    localStorage.setItem('userInfo', JSON.stringify(data.user));
  } catch (error) {
    dispatch(
      registerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

// Logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(logoutAction());
};
