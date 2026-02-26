import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../features/auth/authSlice";
import globalReducer from "../features/global/globalSlice";
import transactionsReducer from "./transactions/slice";
import statisticsReducer from "../features/statistics/statisticsSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Sadece token'ı kaydetmek için
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    global: globalReducer,
    transactions: transactionsReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
