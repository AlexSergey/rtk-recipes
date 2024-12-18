import { ReactElement } from 'react';
import { List } from 'antd';

import { ITask } from '../../types/task';
import { TodoItem } from '../todo-item';

interface ITodoListProps {
  todos: ITask[];
  onUpdateTask: (task: ITask) => void;
  onRemovalTask: (task: ITask) => void;
}

export const TodoList = ({ todos, onRemovalTask, onUpdateTask }: ITodoListProps): ReactElement => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={todos}
    renderItem={(todo): ReactElement => (
      <TodoItem todo={todo} onRemovalTask={onRemovalTask} onUpdateTask={onUpdateTask} />
    )}
    pagination={{
      pageSize: 50,
      position: 'bottom',
    }}
  />
);
