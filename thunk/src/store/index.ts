import { configureStore } from '@reduxjs/toolkit';

import { ITaskSlice, tasksReducer } from './slices/tasks-slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: {
        extraArgument: {},
      },
    }),
  preloadedState: {},
  reducer: {
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export interface IRootState {
  tasks: ITaskSlice;
}
