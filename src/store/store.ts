import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { coinCapApi } from './slices/apiSlice';

const rootReducer = combineReducers({
  [coinCapApi.reducerPath]: coinCapApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinCapApi.middleware),
});
