import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../utils/rtk-axios';
import { ITask } from '../../types/task';

export const tasksAPI = createApi({
  reducerPath: 'tasksAPI',
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.API_URL}` }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    fetchTasks: builder.query<void, void>({
      query: () => ({
        method: 'GET',
        url: '/tasks',
      }),
      providesTags: ['Tasks'],
    }),
    createTask: builder.mutation({
      query: (task: Omit<ITask, 'id'>) => ({
        url: '/tasks',
        method: 'POST',
        data: task,
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTask: builder.mutation<void, ITask>({
      query: ({ id, completed, name }: ITask) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        data: {
          name,
          completed,
        },
      }),
      invalidatesTags: ['Tasks']
    }),
    removeTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks']
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = tasksAPI;
