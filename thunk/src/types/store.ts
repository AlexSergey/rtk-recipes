import { ITask } from './task';

export interface IRootState {
  todo: { tasks: ITask[] };
}
