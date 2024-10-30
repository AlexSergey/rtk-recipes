import { configureStore } from '@reduxjs/toolkit';

import { ITaskSlice, tasksReducer } from './slices/tasks-slice';
import { listenerMiddleware } from './listener';
import './slices/tasks-listener';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: {
        extraArgument: {},
      },
    }).prepend(listenerMiddleware.middleware),
  preloadedState: {},
  reducer: {
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export interface IRootState {
  tasks: ITaskSlice;
}
