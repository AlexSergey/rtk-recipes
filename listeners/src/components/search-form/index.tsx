import { ReactElement } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { Form, Row, Col, Button, Input } from 'antd';

import './styles.less';

interface IAddTodoFormProps {
  value: string;
  onFormSubmit: (value: string) => void;
}

export const SearchForm = ({value, onFormSubmit }: IAddTodoFormProps): ReactElement => {
  const [form] = Form.useForm();

  const onFinish = (): void => {
    onFormSubmit(form.getFieldValue('name'));
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal" className="todo-form">
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item name={'name'} rules={[{ message: 'This field is required' }]}>
            <Input placeholder="What needs to be done?" value={value} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Search todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
