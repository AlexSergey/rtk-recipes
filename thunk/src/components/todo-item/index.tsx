import { ReactElement } from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';

import './styles.less';
import { ITask } from '../../types/task';

interface ITodoItemProps {
  todo: ITask;
  onUpdateTask: (task: ITask) => void;
  onRemovalTask: (task: ITask) => void;
}

export const TodoItem = ({ todo, onRemovalTask, onUpdateTask }: ITodoItemProps): ReactElement => {
  return (
    <List.Item
      actions={[
        <Tooltip key="switch" title={todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={(completed): void => {
              onUpdateTask({
                id: todo.id,
                completed,
                name: todo.name
              });
            }}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete?"
          onConfirm={(): void => {
            onRemovalTask(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
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
