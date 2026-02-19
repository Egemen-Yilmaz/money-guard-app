import { instance, setToken, clearToken } from '../../api/axiosConfig';
import {
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  refreshStart,
  refreshSuccess,
  refreshError,
} from './authSlice';

// Register user -> POST /api/auth/sign-up
export const register = (credentials) => async (dispatch) => {
  const { data } = await instance.post('/auth/sign-up', credentials);
  const { token, user } = data;
  if (token) setToken(token);
  dispatch(registerSuccess({ token, user }));
  return data;
};

// Login user -> POST /api/auth/sign-in
export const login = (credentials) => async (dispatch) => {
  const { data } = await instance.post('/auth/sign-in', credentials);
  const { token, user } = data;
  if (token) setToken(token);
  dispatch(loginSuccess({ token, user }));
  return data;
};

// Logout -> DELETE /api/auth/sign-out
export const logout = () => async (dispatch) => {
  await instance.delete('/auth/sign-out').catch(() => {});
  clearToken();
  dispatch(logoutSuccess());
};

// Refresh current user -> GET /api/users/current
export const refreshCurrentUser = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth?.token;
  if (!token) return Promise.reject(new Error('No token'));

  try {
    dispatch(refreshStart());
    setToken(token);
    const { data } = await instance.get('/users/current');
    dispatch(refreshSuccess(data));
    return data;
  } catch (error) {
    dispatch(refreshError());
    clearToken();
    return Promise.reject(error);
  }
};
