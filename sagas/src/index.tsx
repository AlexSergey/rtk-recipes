import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import createStore from './store';
import rest from './utils/rest';

const { store } = createStore({
  rest,
  initState: {}
});

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
// @ts-ignore
  <Provider store={store}>
    <App />
  </Provider>
);
