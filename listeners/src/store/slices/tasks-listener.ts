import {listenerMiddleware} from '../listener';
import {searchUpdated, setSearchResults} from './tasks-slice';
import {httpClient} from '../../utils/http-request';
import {ITask} from '../../types/task';
import {tasksService} from '../../api/tasks.service';

listenerMiddleware.startListening({
  actionCreator: searchUpdated,
  effect: async (action, {dispatch, getState, extra}) => {
    console.log(action.payload);

    const res = await tasksService.searchTasks(action.payload);
    dispatch(setSearchResults(res.data));
  },
});
