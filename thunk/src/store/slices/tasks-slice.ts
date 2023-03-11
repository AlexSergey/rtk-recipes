import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tasksService } from '../../api/tasks.service';
import { ITask } from '../../types/task';

export interface ITaskSlice {
  data: ITask[] | null;
  isLoading: boolean;
  isError: boolean;
}

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  isError: false,
} as ITaskSlice;

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', tasksService.fetchAllTasks);
export const createTask = createAsyncThunk('tasks/createTask', tasksService.createTask);
export const updateTask = createAsyncThunk('tasks/updateTask', tasksService.updateTask);
export const removeTask = createAsyncThunk('tasks/removeTask', tasksService.removeTask);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.isError = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          state.data = state.data.concat([action.payload.data]);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const id = action.meta.arg.id;

        if (Array.isArray(state.data)) {
          state.data = state.data.map(task => {
            if (task.id === id) {
              return action.payload.data;
            }
            return task;
          });
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const id = action.meta.arg;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(task => task.id !== id);
        }
      });
  },
});


export const tasksReducer = tasksSlice.reducer;

