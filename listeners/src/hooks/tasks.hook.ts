import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';
import {
  fetchAllTasks,
  ITaskSlice, searchUpdated,
  selectorAllTasks,
} from '../store/slices/tasks-slice';

interface ISearch {
  onSearch: (value: string) => void;
  search: string;
}

export const useTasks = (): Omit<ITaskSlice, 'search'> => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector(selectorAllTasks);

  const { isLoading, isError, data } = query;

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return { data, isLoading, isError };
};

export const useSearch = (): ISearch => {
  const query = useSelector(selectorAllTasks);

  const { search } = query;

  const dispatch = useDispatch<AppDispatch>();

  const onSearch = useCallback((value: string): void => {
    dispatch(
      searchUpdated(value)
    );
  }, [dispatch]);

  return { search, onSearch };
};
