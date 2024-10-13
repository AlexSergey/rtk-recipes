import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { tasksService } from '../../api/tasks.service';
import { ITask } from '../../types/task';

const createSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  }
})

export interface ITaskSlice {
  data: ITask[] | null;
  isLoading: boolean;
  isError: boolean;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: null,
    isLoading: false,
    isError: false,
  } as ITaskSlice,
  selectors: {
    selectorAllTasks: (state) => state,
  },
  reducers: (create) => ({
    removeTask: create.asyncThunk(tasksService.removeTask, {
      fulfilled: (state, action) => {
        const id = action.meta.arg;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(task => task.id !== id);
        }
      }
    }),
    updateTask: create.asyncThunk(tasksService.updateTask, {
      fulfilled: (state, action) => {
        const id = action.meta.arg.id;

        if (Array.isArray(state.data)) {
          state.data = state.data.map(task => {
            if (task.id === id) {
              return action.payload.data;
            }
            return task;
          });
        }
      }
    }),
    createTask: create.asyncThunk(tasksService.createTask, {
      fulfilled: (state, action) => {
        if (Array.isArray(state.data)) {
          state.data = state.data.concat([action.payload.data]);
        }
      }
    }),
    fetchAllTasks: create.asyncThunk(tasksService.fetchAllTasks, {
      pending: (state, action) => {
        state.isLoading = true;
      },
      fulfilled: (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      },
      rejected: (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.isError = true;
      }
    })
  }),
});


export const tasksReducer = tasksSlice.reducer;

export const { fetchAllTasks, createTask, updateTask, removeTask } = tasksSlice.actions;
export const { selectorAllTasks } = tasksSlice.selectors;
