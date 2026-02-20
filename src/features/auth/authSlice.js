import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from './authOperations';

const initialState = {
  user: { name: null, email: null }, // Boş obje yerine null yapısı da kullanabilirsin
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null, // Hata mesajlarını tutmak için eklendi
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // ---------------- REGISTER ----------------
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null; // Yeni istek başlarken eski hatayı temizle
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // authOperations'dan dönen hata buraya gelir
      })

      // ---------------- LOGIN ----------------
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ---------------- LOGOUT ----------------
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        // Çıkış yapıldığında her şeyi başlangıç durumuna döndür
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;