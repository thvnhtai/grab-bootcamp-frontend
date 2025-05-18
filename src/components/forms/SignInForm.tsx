/** @jsxImportSource @emotion/react */
import { Form, FormInstance } from 'antd';

import { Rule } from 'antd/es/form';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

import { Styles } from '../../types';
import { Button, FormField } from '../common';

interface SignInFormProps {
  form: FormInstance;
  onFinish: () => void;
  isLoading: boolean;
  rules: Record<string, Rule[]>;
  styles: Styles;
}

export default function SignInForm(props: SignInFormProps) {
  const { form, onFinish, isLoading, rules, styles } = props;
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      requiredMark={false}
      disabled={isLoading}
    >
      <FormField
        name='email'
        rules={rules.email}
        prefixIcon={<MailOutlined />}
        placeholder='Enter your email'
      />
      <FormField
        name='password'
        rules={rules.password}
        prefixIcon={<LockOutlined />}
        placeholder='Enter your password'
        password
      />
      <Form.Item>
        <Button
          htmlType='submit'
          variant='solid'
          css={styles.fullWidthButton}
          loading={isLoading}
        >
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
}
