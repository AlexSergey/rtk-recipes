import { AxiosInstance } from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects';
import logger from 'redux-logger';
import imageReducer from './containers/Image/slice';
import watchFetchImage from './containers/Image/saga';

export default ({ initState = {}, rest }: { initState: Record<string, unknown>, rest: AxiosInstance} ) => {
  const sagaMiddleware = createSagaMiddleware();

  // @ts-ignore
  const store = configureStore<{ image: any }, void, any>({
    reducer: {
      image: imageReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: true,
        thunk: false,
      });

      return middleware.concat([
        logger,
        sagaMiddleware
      ]);
    },
    preloadedState: initState
  });

  function* sagas() {
    yield fork(watchFetchImage, rest);
  }

  const rootSaga = sagaMiddleware.run(sagas);

  return { store, rootSaga };
};
