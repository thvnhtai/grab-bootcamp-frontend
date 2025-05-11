/** @jsxImportSource @emotion/react */
import dayjs from 'dayjs';
import { DatePicker, Form, FormInstance, Select } from 'antd';

import { Rule } from 'antd/es/form';
import {
  CalendarOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';

import { Styles } from '../../types/utility';
import { Button, FormField } from '../common';

interface SignUpFormProps {
  form: FormInstance;
  onFinish: () => void;
  isLoading: boolean;
  rules: Record<string, Rule[]>;
  styles: Styles;
}

export default function SignUpForm(props: SignUpFormProps) {
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
        name='username'
        rules={rules.name}
        prefixIcon={<UserOutlined />}
        placeholder='e.g. John Doe'
      />
      <FormField
        name='email'
        rules={rules.email}
        prefixIcon={<MailOutlined />}
        placeholder='e.g. your@email.com'
      />
      <FormField
        name='password'
        rules={rules.password}
        prefixIcon={<LockOutlined />}
        placeholder='At least 6 characters'
        password
      />
      <Form.Item name='gender' rules={rules.gender}>
        <Select
          placeholder='Select your gender'
          size='large'
          options={[
            { value: 'MALE', label: 'Male' },
            { value: 'FEMALE', label: 'Female' }
          ]}
        />
      </Form.Item>
      <Form.Item name='dateOfBirth' rules={rules.dob}>
        <DatePicker
          placeholder='Select your date of birth'
          size='large'
          css={styles.fullWidthInput}
          format='YYYY-MM-DD'
          picker='date'
          suffixIcon={<CalendarOutlined />}
          allowClear
          disabledDate={(current) => {
            const tooOld = current && current < dayjs().subtract(100, 'year');
            const inFuture = current && current > dayjs();
            return tooOld || inFuture;
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          variant='solid'
          css={styles.fullWidthButton}
          loading={isLoading}
        >
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
}
