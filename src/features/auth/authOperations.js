import { createAsyncThunk } from '@reduxjs/toolkit';

// Sahte bir bekleme süresi yaratan yardımcı fonksiyon (Sunucu gecikmesini simüle eder)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      await delay(1500); // 1.5 saniye bekle (Loading state'ini test etmek için)
      
      // Başarılı bir kayıt olmuş gibi sahte veri döndür
      return {
        user: { name: credentials.name, email: credentials.email },
        token: 'fake-jwt-token-for-testing',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue('Kayıt işlemi başarısız oldu.');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      await delay(1500); // 1.5 saniye bekle
      
      // Hata durumunu test etmek istersen email alanına "hata@test.com" yazabilirsin
      if (credentials.email === 'hata@test.com') {
        throw new Error('E-posta veya şifre hatalı!');
      }

      // Başarılı giriş simülasyonu
      return {
        user: { email: credentials.email },
        token: 'fake-jwt-token-for-testing',
      };
    } catch (error) {
      // thunkAPI ile hatayı Redux'a (rejected state'ine) gönderiyoruz
      return thunkAPI.rejectWithValue(error.message || 'Giriş işlemi başarısız.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await delay(800); // 0.8 saniye bekle
      return true; // Çıkış başarılı
    } catch (error) {
      return thunkAPI.rejectWithValue('Çıkış işlemi başarısız.');
    }
  }
);