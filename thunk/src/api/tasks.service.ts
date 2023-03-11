import { ITask } from '../types/task';
import { httpClient, HttpPromise } from '../utils/http-request';

export interface ITasksService {
  fetchAllTasks: () => HttpPromise<ITask[]>;
  createTask: (task: Omit<ITask, 'id'>) => HttpPromise<ITask>;
  updateTask: (task: ITask) => HttpPromise<ITask>;
  removeTask: (id: string) => HttpPromise<void>;
}

export const tasksService: ITasksService = {
  fetchAllTasks: (): HttpPromise<ITask[]> => {
    return httpClient.get<ITask[]>('/tasks');
  },
  createTask: (task: Omit<ITask, 'id'>): HttpPromise<ITask> => {
    return httpClient.post<ITask>('/tasks', { data: task });
  },
  updateTask: ({ id, completed, name }: ITask): HttpPromise<ITask> => {
    return httpClient.put<ITask>(`/tasks/${id}`, { data: { completed, name } });
  },
  removeTask: (id: string): HttpPromise<void> => {
    return httpClient.delete<void>(`/tasks/${id}`);
  },
}
