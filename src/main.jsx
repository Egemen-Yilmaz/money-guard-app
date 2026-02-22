import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Bunu ekliyoruz
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import "./styles/globalStyles.css";
import "modern-normalize/modern-normalize.css";
import { instance } from "./api/axiosConfig";
import {
  setLoading,
  clearLoading,
  setError,
} from "./features/global/globalSlice";
import { refreshCurrentUser, logout } from "./features/auth/authOperations";
import { toastError } from "./utils/toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => store.dispatch(refreshCurrentUser())}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// Axios interceptors to toggle global loading state
// Use store.dispatch to update global.isLoading
instance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading());
    return config;
  },
  (error) => {
    store.dispatch(clearLoading());
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    store.dispatch(clearLoading());
    return response;
  },
  (error) => {
    store.dispatch(clearLoading());
    // set global error for UI
    const message =
      error?.response?.data?.message || error.message || "Network error";
    store.dispatch(setError(message));
    toastError(message);

    // if unauthorized, attempt logout and redirect
    const status = error?.response?.status;
    if (status === 401) {
      // dispatch logout to clear store/persist
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);
