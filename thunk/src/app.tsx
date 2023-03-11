import { Row, Col, Card } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { AddTodoForm } from './components/add-todo-form';
import { TodoList } from './components/todo-list';
import { ITask } from './types/task';

import {
  useFetchTasks,
  useTaskMutation
} from './hooks/tasks.hook';

export const App = () => {
  const { data, isLoading, isError } = useFetchTasks();
  const { onAddTask, onUpdateTask, onRemovalTask } = useTaskMutation();



  return (
    <Row justify="center" align="middle" gutter={[0, 20]} className="todos-container">
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
        <PageHeader title="Add Todo" subTitle="To add a todo, just fill the form below and click in add todo." />
      </Col>
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
        <Card title="Create a new todo">
          <AddTodoForm onFormSubmit={onAddTask} />
        </Card>
      </Col>
      {isLoading ? <div>Loading...</div> : null}
      {isError ? <div>Error!</div> : null}
      {data ? (
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
          <Card title="Todo List">
            <TodoList todos={data} onRemovalTask={onRemovalTask} onUpdateTask={onUpdateTask} />
          </Card>
        </Col>
      ) : null}
    </Row>
  );
}
