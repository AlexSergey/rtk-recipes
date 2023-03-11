import { PlusCircleFilled } from '@ant-design/icons';
import { Form, Row, Col, Button, Input } from 'antd';

import './styles.less';

interface IAddTodoFormProps {
  onFormSubmit: (value: string) => void;
}

export const AddTodoForm = ({ onFormSubmit }: IAddTodoFormProps): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish = (): void => {
    onFormSubmit(form.getFieldValue('name'));
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal" className="todo-form">
      <Row gutter={20}>
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Form.Item name={'name'} rules={[{ message: 'This field is required', required: true }]}>
            <Input placeholder="What needs to be done?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
