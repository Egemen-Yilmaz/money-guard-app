import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://wallet.b.goit.study/api',
});

// Token'ı başlığa eklemek için yardımcı fonksiyonlar
export const setToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

// Response örneklerini yakalamak ve 401 hatalarını kontrol etmek için interceptor ekleyebiliriz
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 kontrolü yaparak token süresinin dolup dolmadığını kontrol edebilir
    return Promise.reject(error);
  }
);