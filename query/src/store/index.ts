import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { tasksAPI } from './slices/tasks-slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    })
      .concat(tasksAPI.middleware),
  preloadedState: {},
  reducer: {
    [tasksAPI.reducerPath]: tasksAPI.reducer,
  },
});
setupListeners(store.dispatch);
