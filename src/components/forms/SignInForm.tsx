/** @jsxImportSource @emotion/react */
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form, FormInstance } from 'antd';
import { Rule } from 'antd/es/form';
import { Styles } from '../../types/common';
import { Button } from '../Button';
import { FormField } from '../FormField';

interface SignInFormProps {
  form: FormInstance;
  onFinish: () => void;
  isLoading: boolean;
  rules: Record<string, Rule[]>;
  styles: Styles;
}

const SignInForm = ({
  form,
  onFinish,
  isLoading,
  rules,
  styles
}: SignInFormProps) => {
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
};

export default SignInForm;
