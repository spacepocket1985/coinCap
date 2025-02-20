import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { coinCapApi } from './slices/apiSlice';
import portfolioReducer from './slices/portfolioSlice';
import localStorageMiddleware from './middlewares/localStorageMiddleware';

const rootReducer = combineReducers({
  [coinCapApi.reducerPath]: coinCapApi.reducer,
  portfolio: portfolioReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coinCapApi.middleware)
      .concat(localStorageMiddleware),
});

export type AppRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
