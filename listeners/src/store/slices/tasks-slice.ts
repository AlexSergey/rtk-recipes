import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { tasksService } from '../../api/tasks.service';
import { ITask } from '../../types/task';

const createSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  }
})

export interface ITaskSlice {
  search: string;
  data: ITask[] | null;
  isLoading: boolean;
  isError: boolean;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    search: '',
    data: null,
    isLoading: false,
    isError: false,
  } as ITaskSlice,
  selectors: {
    selectorAllTasks: (state) => state,
  },
  reducers: (create) => ({
    searchUpdated: create.reducer<string>((state, action) => {
      state.search = action.payload;
    }),
    setSearchResults: create.reducer<ITask[]>((state, action) => {
      state.data = action.payload;
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

export const { fetchAllTasks, searchUpdated, setSearchResults } = tasksSlice.actions;
export const { selectorAllTasks } = tasksSlice.selectors;
