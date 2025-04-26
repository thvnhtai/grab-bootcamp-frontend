import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

interface FormFieldProps {
  name: string;
  rules?: Rule[];
  prefixIcon?: ReactNode;
  placeholder?: string;
  password?: boolean;
}

const { Password } = Input;
const { Item } = Form;

export const FormField = ({
  name,
  rules,
  prefixIcon,
  placeholder,
  password = false
}: FormFieldProps) => {
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
};

const inputStyles = {
  input: {
    marginLeft: 8,
    padding: 4
  }
};
