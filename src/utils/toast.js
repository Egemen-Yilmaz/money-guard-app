import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const toastSuccess = (message = '', title = '') => {
  iziToast.success({
    title,
    message: String(message),
    position: 'topRight',
    timeout: 4000,
  });
};

export const toastError = (message = 'Bir hata oluştu', title = '') => {
  iziToast.error({
    title,
    message: String(message),
    position: 'topRight',
    timeout: 6000,
  });
};

export const toastInfo = (message = '', title = '') => {
  iziToast.info({
    title,
    message: String(message),
    position: 'topRight',
    timeout: 4000,
  });
};

export default { toastSuccess, toastError, toastInfo };
