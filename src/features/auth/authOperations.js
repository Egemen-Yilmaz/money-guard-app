import { instance, setToken, clearToken } from '../../api/axiosConfig';
import {
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  refreshStart,
  refreshSuccess,
  refreshError,
} from './authSlice';

// Yeni kullanıcı kaydı -> POST /api/auth/sign-up
export const register = (credentials) => async (dispatch) => {
  const { data } = await instance.post('/auth/sign-up', credentials);
  const { token, user } = data;
  if (token) setToken(token);
  dispatch(registerSuccess({ token, user }));
  return data;
};

// Kullanıcı girişi -> POST /api/auth/sign-in
export const login = (credentials) => async (dispatch) => {
  const { data } = await instance.post('/auth/sign-in', credentials);
  const { token, user } = data;
  if (token) setToken(token);
  dispatch(loginSuccess({ token, user }));
  return data;
};

// Çıkış yap -> DELETE /api/auth/sign-out
export const logout = () => async (dispatch) => {
  await instance.delete('/auth/sign-out').catch(() => { });
  clearToken();
  dispatch(logoutSuccess());
};

// Mevcut kullanıcı bilgilerini yenile -> GET /api/users/current
export const refreshCurrentUser = () => async (dispatch, getState) => {
  const state = getState();
  const token = state.auth?.token;
  // If there's no token we simply exit gracefully. This avoids an uncaught
  // promise rejection when PersistGate calls this on app bootstrap.
  if (!token) return null;

  try {
    dispatch(refreshStart());
    setToken(token);
    const { data } = await instance.get('/users/current');
    dispatch(refreshSuccess(data));
    return data;
  } catch (err) {
    dispatch(refreshError());
    clearToken();
    // Log at debug level to aid development without causing an uncaught error.
    // This also prevents linter complaints about unused catch variables.
  console.debug('refreshCurrentUser failed:', err);
    // Return null instead of rejecting to keep onBeforeLift stable.
    return null;
  }
};
