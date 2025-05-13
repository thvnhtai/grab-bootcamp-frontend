import { ReactNode } from 'react';

import { Form, Input } from 'antd';

import { Rule } from 'antd/es/form';

const { Password } = Input;
const { Item } = Form;

const inputStyles = {
  input: {
    marginLeft: 8
  }
};

interface FormFieldProps {
  name: string;
  rules?: Rule[];
  prefixIcon?: ReactNode;
  placeholder?: string;
  password?: boolean;
}

export default function FormField(props: FormFieldProps) {
  const { name, rules, prefixIcon, placeholder, password = false } = props;
  return (
    <Item name={name} rules={rules}>
      {password ? (
        <Password
          prefix={prefixIcon}
          placeholder={placeholder}
          size='large'
          styles={inputStyles}
        />
      ) : (
        <Input
          prefix={prefixIcon}
          placeholder={placeholder}
          size='large'
          styles={inputStyles}
        />
      )}
    </Item>
  );
}
