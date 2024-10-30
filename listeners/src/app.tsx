import { Row, Col, Card } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import { SearchForm } from './components/search-form';
import { TodoList } from './components/todo-list';

import {
  useTasks, useSearch,
} from './hooks/tasks.hook';

export const App = () => {
  const { data, isLoading, isError } = useTasks();
  const { search, onSearch } = useSearch();

  return (
    <Row justify="center" align="middle" gutter={[0, 20]} className="todos-container">
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
        <PageHeader title="Add Todo" subTitle="To search a todo, just fill the form below and click in add todo." />
      </Col>
      <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
        <Card title="Search todo">
          <SearchForm value={search} onFormSubmit={onSearch} />
        </Card>
      </Col>
      {isLoading ? <div>Loading...</div> : null}
      {isError ? <div>Error!</div> : null}
      {data ? (
        <Col xs={{ span: 23 }} sm={{ span: 23 }} md={{ span: 21 }} lg={{ span: 20 }} xl={{ span: 18 }}>
          <Card title="Todo List">
            <TodoList todos={data} />
          </Card>
        </Col>
      ) : null}
    </Row>
  );
}
