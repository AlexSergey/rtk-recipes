import { ReactElement } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';

import './styles.less';
import { ITask } from '../../types/task';

interface ITodoItemProps {
  todo: ITask;
}

export const TodoItem = ({ todo }: ITodoItemProps): ReactElement => {
  return (
    <List.Item
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {todo.name}
        </Tag>
      </div>
    </List.Item>
  );
};
