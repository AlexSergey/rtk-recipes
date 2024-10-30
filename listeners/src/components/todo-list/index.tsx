import { ReactElement } from 'react';
import { List } from 'antd';

import { ITask } from '../../types/task';
import { TodoItem } from '../todo-item';

interface ITodoListProps {
  todos: ITask[];
}

export const TodoList = ({ todos }: ITodoListProps): ReactElement => (
  <List
    locale={{
      emptyText: "There's nothing to do :(",
    }}
    dataSource={todos}
    renderItem={(todo): ReactElement => (
      <TodoItem todo={todo} />
    )}
    pagination={{
      pageSize: 50,
      position: 'bottom',
    }}
  />
);
