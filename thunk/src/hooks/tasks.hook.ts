import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, IRootState } from '../store';
import { createTask, fetchAllTasks, ITaskSlice, removeTask, updateTask } from '../store/slices/tasks-slice';
import { ITask } from '../types/task';

interface IUseTaskMutation {
  onAddTask: (value: string) => void;
  onUpdateTask: (task: ITask) => void;
  onRemovalTask: ({ id }: ITask) => void;
}

export const useFetchTasks = (): ITaskSlice => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: IRootState) => state.tasks);

  const { isLoading, isError, data } = query;

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return { data, isLoading, isError };
};

export const useTaskMutation = (): IUseTaskMutation => {
  const dispatch = useDispatch<AppDispatch>();

  const onAddTask = useCallback((value: string): void => {
    dispatch(
      createTask({
        name: value,
        completed: false
      })
    );
  }, [dispatch]);

  const onUpdateTask = useCallback((task: ITask): void => {
    dispatch(updateTask(task));
  }, [dispatch]);

  const onRemovalTask = useCallback(({ id }: ITask): void => {
    dispatch(removeTask(id));
  }, [dispatch]);

  return { onAddTask, onUpdateTask, onRemovalTask };
};
