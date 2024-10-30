import { ITask } from '../types/task';
import { httpClient, HttpPromise } from '../utils/http-request';

export interface ITasksService {
  fetchAllTasks: () => HttpPromise<ITask[]>;
  searchTasks: (query: string) => HttpPromise<ITask[]>;
}

export const tasksService: ITasksService = {
  fetchAllTasks: (): HttpPromise<ITask[]> => {
    return httpClient.get<ITask[]>('/tasks');
  },
  searchTasks: (query: string): HttpPromise<ITask[]> => {
    return httpClient.get<ITask[]>(`/tasks?name_like=${query}`);
  },
}
